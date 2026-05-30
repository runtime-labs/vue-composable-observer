import { describe, expect, it } from 'vitest'

import {
  createInstance,
  registerInstance,
  clearInstances,
  subscribe,
  unsubscribe,
} from '../src'

describe('observer', () => {
  it('notifies subscribers on instance registration', () => {
    clearInstances()

    let called = false

    const unsubscribe = subscribe(() => {
      called = true
    })

    registerInstance(
      createInstance(
        'test-id',
        'useCounter',
      ),
    )

    expect(called).toBe(true)

    unsubscribe()
  })
})