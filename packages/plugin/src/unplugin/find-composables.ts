import { parse } from '@babel/parser'
import { type FoundComposable } from './types'

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

    if (
      declaration?.type === 'FunctionDeclaration'
      && declaration.id?.name.startsWith('use')
    ) {
      foundComposables.push({
        name: declaration.id.name,
        exportStart: node.start || 0,
        exportEnd: node.end || 0,
        functionStart: declaration.start || 0,
        functionEnd: declaration.end || 0,
      })

      continue
    }

    if (declaration?.type !== 'VariableDeclaration') {
      continue
    }

    for (const declarator of declaration.declarations) {
      if (
        declarator.id.type !== 'Identifier'
        || !declarator.id.name.startsWith('use')
      ) {
        continue
      }

      const init = declarator.init

      if (
        !init
        || (
          init.type !== 'ArrowFunctionExpression'
          && init.type !== 'FunctionExpression'
        )
      ) {
        continue
      }

      foundComposables.push({
        name: declarator.id.name,
        exportStart: node.start || 0,
        exportEnd: node.end || 0,
        functionStart: declarator.start || 0,
        functionEnd: declarator.end || 0,
      })
    }
  }

  return foundComposables
}
