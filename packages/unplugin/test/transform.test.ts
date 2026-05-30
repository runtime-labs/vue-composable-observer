import { describe, expect, it } from 'vitest'

import { findComposable, transformComposable } from '../src'

describe('findComposable', () => {
  it('finds composable declaration range', () => {
  const code = `
    export function useCounter() {
      return {}
    }
  `

  const result = findComposable(code)

  expect(result?.name).toBe('useCounter')
  expect(result?.start).toBeTypeOf('number')
  expect(result?.end).toBeTypeOf('number')
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
    "trackComposable('useCounter'"
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
})