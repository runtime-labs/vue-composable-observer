import { describe, expect, it, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import {
  clearInstances,
  getInstances,
  trackComposable,
  getHistory,
} from '../src'
import { effectScope } from 'vue'

describe('state history', () => {
  beforeEach(() => {
    clearInstances()
  })

  it('records a snapshot on each state update', async () => {
    const count = ref(0)

    const useCounter = trackComposable('useCounter', 'test.ts', () => ({ count }))
    useCounter()

    count.value = 1
    await nextTick()

    count.value = 2
    await nextTick()

    const [instance] = getInstances()
    const history = getHistory(instance.id)

    expect(history.length).toBeGreaterThanOrEqual(2)
  })

  it('stores serialized values at the time of the snapshot', async () => {
    const count = ref(0)

    const useCounter = trackComposable('useCounter', 'test.ts', () => ({ count }))
    useCounter()

    count.value = 42
    await nextTick()

    const [instance] = getInstances()
    const history = getHistory(instance.id)

    expect(history[0].values.count).toBe(42)
  })

  it('limits history to 10 entries', async () => {
    const count = ref(0)

    const useCounter = trackComposable('useCounter', 'test.ts', () => ({ count }))
    useCounter()

    for (let i = 1; i <= 15; i++) {
      count.value = i
      await nextTick()
    }

    const [instance] = getInstances()
    const history = getHistory(instance.id)

    expect(history.length).toBeLessThanOrEqual(10)
  })

  it('orders history newest-first', async () => {
    const count = ref(0)

    const useCounter = trackComposable('useCounter', 'test.ts', () => ({ count }))
    useCounter()

    count.value = 1
    await nextTick()
    count.value = 2
    await nextTick()

    const [instance] = getInstances()
    const history = getHistory(instance.id)

    expect(history[0].values.count).toBe(2)
    expect(history[1].values.count).toBe(1)
  })

  it('clears history when instance is unregistered', async () => {
    const count = ref(0)

    const useCounter = trackComposable('useCounter', 'test.ts', () => ({ count }))

    const scope = effectScope()

    scope.run(() => {
      useCounter()
    })

    const [instance] = getInstances()
    const instanceId = instance.id

    count.value = 1
    await nextTick()

    expect(getHistory(instanceId).length).toBeGreaterThan(0)

    scope.stop()

    expect(getHistory(instanceId)).toHaveLength(0)
  })

  it('clears all history on clearInstances', async () => {
    const count = ref(0)
    const useCounter = trackComposable('useCounter', 'test.ts', () => ({ count }))
    useCounter()

    count.value = 5
    await nextTick()

    const [instance] = getInstances()
    const id = instance.id

    clearInstances()

    expect(getHistory(id)).toHaveLength(0)
  })

  it('records timestamps in ascending order', async () => {
    const count = ref(0)
    const useCounter = trackComposable('useCounter', 'test.ts', () => ({ count }))
    useCounter()

    count.value = 1
    await nextTick()
    count.value = 2
    await nextTick()

    const [instance] = getInstances()
    const history = getHistory(instance.id)

    if (history.length >= 2) {
      expect(history[0].timestamp).toBeGreaterThanOrEqual(history[1].timestamp)
    }
  })
})
