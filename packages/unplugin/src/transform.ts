import { parse } from '@babel/parser'
import { FoundComposable } from './types';
import MagicString from 'magic-string'

export function findComposable(
  code: string,
): FoundComposable | undefined {
    const ast = parse(code, {
        sourceType: 'module',
        plugins: [
            'typescript',
        ],
    });

    for (const node of ast.program.body) {
        if (node.type !== 'ExportNamedDeclaration') {
            continue
        }

        const declaration = node.declaration

        if (declaration?.type === 'FunctionDeclaration' && declaration.id?.name.startsWith('use')) {
            return {
                name: declaration.id.name,
                start: node.start || 0,
                end: node.end || 0,
            }
        }
    }
}

export function transformComposable(
  code: string,
): string {
    const composable = findComposable(code)

    if (!composable) {
        return code
    }

    const s = new MagicString(code)

    const original = code.slice(composable.start, composable.end)

    s.overwrite(
        composable.start,
        composable.end,
`
export const ${composable.name} = trackComposable('${composable.name}',
    ${original.replace(
        `export function ${composable.name}`,
        `function ${composable.name}`,
    )}
)
`
    )

    s.prepend(
        `import { trackComposable } from '@goranton/vue-composable-observer-core'\n`,
    )

    return s.toString()
}
