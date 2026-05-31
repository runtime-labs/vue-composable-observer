import MagicString from 'magic-string'
import { findComposables } from './find-composables'

export function transformComposable(
  code: string,
  file: string,
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
export const ${composable.name} = ${importName}('${composable.name}', '${file}',
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
      `import { trackComposable as ${importName} } from '@goranton/vue-composable-observer-core'\n`,
    )
  }

  return s.toString()
}
