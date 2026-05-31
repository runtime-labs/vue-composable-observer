import { describe, expect, it, vi } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'

import {
  clearInstances,
  getInstances,
  subscribe,
  trackComposable,
} from '../src'

describe('composable lifecycle', () => {
  it('registers instance', () => {
    clearInstances()

    const useCounter = trackComposable(
      'useCounter',
      'test.js',
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
      'test.js',
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

  it('emits state update events', async () => {
    clearInstances()

    const count = ref(0)

    const useCounter = trackComposable(
      'useCounter',
      'test.js',
      () => ({
        count,
      }),
    )

    const listener = vi.fn()

    const unsubscribe = subscribe(listener)

    useCounter()

    count.value++

    await nextTick()

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'instance:stateUpdated',
      }),
    )

    unsubscribe()
  })

  it('stops tracking state changes after scope dispose', async () => {
    clearInstances()

    const count = ref(0)

    const useCounter = trackComposable(
      'useCounter',
      'test.js',
      () => ({
        count,
      }),
    )

    const listener = vi.fn()

    const unsubscribe = subscribe(listener)

    const scope = effectScope()

    scope.run(() => {
      useCounter()
    })

    scope.stop()

    listener.mockClear()

    count.value++

    await nextTick()

    expect(listener).not.toHaveBeenCalled()

    unsubscribe()
  })
})
