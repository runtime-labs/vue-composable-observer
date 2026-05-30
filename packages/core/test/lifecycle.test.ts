import { describe, expect, it } from 'vitest'
import { effectScope } from 'vue'

import {
  clearInstances,
  getInstances,
  trackComposable,
} from '../src'

describe('composable lifecycle', () => {
  it('registers instance', () => {
    clearInstances()

    const useCounter = trackComposable(
      'useCounter',
      () => ({
        count: 0,
      }),
    )

    useCounter()

    expect(getInstances()).toHaveLength(1)
  })

  it('unregisters instance on scope dispose', () => {
    clearInstances()

    const useCounter = trackComposable(
      'useCounter',
      () => ({
        count: 0,
      }),
    )

    const scope = effectScope()

    scope.run(() => {
      useCounter()
    })

    expect(getInstances()).toHaveLength(1)

    scope.stop()

    expect(getInstances()).toHaveLength(0)
  })
})
