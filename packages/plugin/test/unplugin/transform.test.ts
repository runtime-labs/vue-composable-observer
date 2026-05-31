import { describe, expect, it } from 'vitest'

import { transformComposable } from '../../src/unplugin/transform.ts'

describe('findComposable', () => {
  it('wraps composable with trackComposable', () => {
    const code = `
    export function useCounter() {
      return {}
    }
  `

    const transformed =
      transformComposable(code, 'test.js')

    expect(transformed).toContain(
      '__ob_trackComposable(\'useCounter\'',
    )
  })

  it('preserves function body', () => {
    const code = `
export function useCounter() {
  const count = ref(0)

  return { count }
}
`

    const transformed = transformComposable(code, 'test.js')

    expect(transformed).toContain(
      'const count = ref(0)',
    )

    expect(transformed).toContain(
      'return { count }',
    )
  })

  it('injects trackComposable import', () => {
    const code = `
export function useCounter() {
  return {}
}
`

    const transformed = transformComposable(code, 'test.js')

    expect(transformed).toContain(
      'import { trackComposable as __ob_trackComposable }',
    )
  })

  it('transforms multiple composables', () => {
    const code = `
    export function useAuth() {
      return {}
    }

    export function useProducts() {
      return {}
    }
  `

    const transformed =
      transformComposable(code, 'test.js')

    expect(transformed).toContain(
      '__ob_trackComposable(\'useAuth\'',
    )

    expect(transformed).toContain(
      '__ob_trackComposable(\'useProducts\'',
    )
  })

  it('transforms async composables', () => {
    const code = `
export async function useCounter() {
  return {}
}
`

    const transformed = transformComposable(code, 'test.js')

    expect(transformed).toContain(
      'async function useCounter',
    )

    expect(transformed).toContain(
      'trackComposable(\'useCounter\'',
    )
  })

  it('transforms generic composables', () => {
    const code = `
export function useCounter<T>() {
  return {}
}
`

    const transformed = transformComposable(code, 'test.js')

    expect(transformed).toContain(
      'function useCounter<T>()',
    )
  })

  it('transforms exported arrow composables', () => {
    const code = `
export const useCounter = () => {
  return {}
}
`

    const transformed = transformComposable(code, 'test.js')

    expect(transformed).toContain(
      'trackComposable(\'useCounter\'',
    )
  })
})
