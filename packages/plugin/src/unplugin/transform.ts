import MagicString from 'magic-string'
import { findComposables } from './find-composables'

export function transformComposable(
  code: string,
  file: string,
  options: { importPrefix: string } | undefined = undefined,
): { code: string; map: ReturnType<InstanceType<typeof MagicString>['generateMap']> } | null {
  const composables = findComposables(code)

  if (!composables.length) {
    return null
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
export const ${composable.name} = ${importName}('${composable.name}', '${file}',
    ${original.replace(
      `export function ${composable.name}`,
      `function ${composable.name}`,
    )}
)
    `,
    )
  }

  if (!code.includes('@runtime-labs/observer-core')) {
    s.prepend(
      `import { trackComposable as ${importName} } from '@runtime-labs/observer-core'\n`,
    )
  }

  return {
    code: s.toString(),
    map: s.generateMap({ hires: true, source: file, includeContent: true }),
  }
}
