import { createFilter } from '@rollup/pluginutils'
import { describe, expect, it } from 'vitest'

describe('filter options', () => {
  it('includes composables directory', () => {
    const filter = createFilter(
      [/composables/],
    )

    expect(
      filter('/src/composables/useAuth.ts'),
    ).toBe(true)

    expect(
      filter('/src/utils/auth.ts'),
    ).toBe(false)
  })
})
