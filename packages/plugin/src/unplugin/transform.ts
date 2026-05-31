import { parse } from '@babel/parser'
import { type FoundComposable } from './types'
import MagicString from 'magic-string'

export function findComposables(
  code: string,
): FoundComposable[] {
  const foundComposables: FoundComposable[] = []

  const ast = parse(code, {
    sourceType: 'module',
    plugins: [
      'typescript',
    ],
  })

  for (const node of ast.program.body) {
    if (node.type !== 'ExportNamedDeclaration') {
      continue
    }

    const declaration = node.declaration

    if (declaration?.type === 'FunctionDeclaration' && declaration.id?.name.startsWith('use')) {
      foundComposables.push({
        name: declaration.id.name,
        exportStart: node.start || 0,
        exportEnd: node.end || 0,
        functionStart: declaration.start || 0,
        functionEnd: declaration.end || 0,
      })
    }

    if (declaration?.type === 'VariableDeclaration') {
      for (const declarator of declaration.declarations) {
        if (declarator.id.type === 'Identifier' && declarator.id.name.startsWith('use')) {
          foundComposables.push({
            name: declarator.id.name,
            exportStart: node.start || 0,
            exportEnd: node.end || 0,
            functionStart: declarator.start || 0,
            functionEnd: declarator.end || 0,
          })
        }
      }
    }
  }

  return foundComposables
}

export function transformComposable(
  code: string,
  options: { importPrefix: string } | undefined = undefined,
): string {
  const composables = findComposables(code)

  if (!composables.length) {
    return code
  }

  const s = new MagicString(code)

  composables.sort((a, b) => a.functionStart - b.functionStart)

  const importPrefix = options?.importPrefix || '__ob_'
  const importName = `${importPrefix}trackComposable`

  for (const composable of composables) {
    const original = code.slice(composable.functionStart, composable.functionEnd)

    s.overwrite(
      composable.exportStart,
      composable.exportEnd,
      `
export const ${composable.name} = ${importName}('${composable.name}',
    ${original.replace(
      `export function ${composable.name}`,
      `function ${composable.name}`,
    )}
)
    `,
    )
  }

  if (!code.includes('@goranton/vue-composable-observer-core')) {
    s.prepend(
      `import { trackComposable as ${importName} } from '@goranton/vue-composable-observer-core'`,
    )
  }

  return s.toString()
}
