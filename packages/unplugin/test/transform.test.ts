import { describe, expect, it } from 'vitest'

import { transformComposable } from '../src/transform'

describe('transformComposable', () => {
  it('wraps composables with trackComposable', () => {
    const code = `
      export function useCounter() {
        return {}
      }
    `

    const transformed =
      transformComposable(code)

    expect(transformed).toContain(
      'trackComposable',
    )
  })
})