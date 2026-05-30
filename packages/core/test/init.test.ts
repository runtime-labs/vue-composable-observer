import { describe, expect, it } from 'vitest'

import { createObserver } from '../src'

describe('observer', () => {
  it('creates observer api', () => {
    const observer = createObserver()

    expect(observer).toBeDefined()

    expect(observer.getInstances).toBeTypeOf(
      'function',
    )

    expect(observer.subscribe).toBeTypeOf(
      'function',
    )
  })
})
