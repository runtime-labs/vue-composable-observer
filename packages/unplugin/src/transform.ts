import { parse } from '@babel/parser'

export function transformComposable(
  code: string,
) {
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
            return declaration.id.name
        }
    }
}