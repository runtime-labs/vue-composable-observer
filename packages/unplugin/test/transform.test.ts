import { describe, expect, it } from 'vitest'

import { findComposables, transformComposable } from '../src'

describe('findComposable', () => {
  it('finds composable declaration range', () => {
    const code = `
    export function useCounter() {
      return {}
    }
  `

    const result = findComposables(code)

    expect(result[0]?.name).toBe('useCounter')
    expect(result[0]?.start).toBeTypeOf('number')
    expect(result[0]?.end).toBeTypeOf('number')
  })

  it('wraps composable with trackComposable', () => {
    const code = `
    export function useCounter() {
      return {}
    }
  `

    const transformed =
      transformComposable(code)

    expect(transformed).toContain(
      'trackComposable(\'useCounter\'',
    )
  })

  it('preserves function body', () => {
    const code = `
export function useCounter() {
  const count = ref(0)

  return { count }
}
`

    const transformed = transformComposable(code)

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

    const transformed = transformComposable(code)

    expect(transformed).toContain(
      'import { trackComposable }',
    )
  })

  it('finds multiple composables', () => {
    const code = `
    export function useAuth() {}
    export function useProducts() {}
  `

    const composables = findComposables(code)

    expect(composables).toHaveLength(2)

    expect(
      composables.map(item => item.name),
    ).toEqual([
      'useAuth',
      'useProducts',
    ])
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
      transformComposable(code)

    expect(transformed).toContain(
      'trackComposable(\'useAuth\'',
    )

    expect(transformed).toContain(
      'trackComposable(\'useProducts\'',
    )
  })
})
