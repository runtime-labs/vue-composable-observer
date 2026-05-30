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
        start: node.start || 0,
        end: node.end || 0,
      })
    }
  }

  return foundComposables
}

export function transformComposable(
  code: string,
): string {
  const composables = findComposables(code)

  if (!composables.length) {
    return code
  }

  const s = new MagicString(code)

  const updates: { start: number; end: number; content: string }[] = []

  function storeUpdate(start: number, end: number, content: string) {
    updates.push({ start, end, content })
  }

  for (const composable of composables) {
    const original = code.slice(composable.start, composable.end)

    storeUpdate(
      composable.start,
      composable.end,
      `
export const ${composable.name} = trackComposable('${composable.name}',
    ${original.replace(
      `export function ${composable.name}`,
      `function ${composable.name}`,
    )}
)
    `,
    )
  }

  for (const update of updates) {
    s.overwrite(update.start, update.end, update.content)
  }

  s.prepend(
    'import { trackComposable } from \'@goranton/vue-composable-observer-core\'\n',
  )

  return s.toString()
}
