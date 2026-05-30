import { describe, expect, it, vi } from 'vitest'

import {
  notifySubscribers,
  subscribe,
  unsubscribe,
} from '../src/runtime/subscribers'

describe('observer', () => {
  it('notifies subscribers', () => {
    const listener = vi.fn()

    subscribe(listener)

    notifySubscribers({
      type: 'instance:registered',
      instanceId: 'test-id',
    })

    expect(listener).toHaveBeenCalledTimes(1)

    expect(listener).toHaveBeenCalledWith({
      type: 'instance:registered',
      instanceId: 'test-id',
    })

    unsubscribe(listener)
  })

  it('stops notifying after unsubscribe', () => {
    const listener = vi.fn()

    subscribe(listener)
    unsubscribe(listener)

    notifySubscribers({
      type: 'instance:registered',
      instanceId: 'test-id',
    })

    expect(listener).not.toHaveBeenCalled()
  })

  it('supports unsubscribe function returned by subscribe', () => {
    const listener = vi.fn()

    const stop = subscribe(listener)

    stop()

    notifySubscribers({
      type: 'instance:registered',
      instanceId: 'test-id',
    })

    expect(listener).not.toHaveBeenCalled()
  })

  it('notifies multiple subscribers', () => {
    const listener1 = vi.fn()
    const listener2 = vi.fn()

    subscribe(listener1)
    subscribe(listener2)

    notifySubscribers({
      type: 'instance:cleared',
    })

    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)

    unsubscribe(listener1)
    unsubscribe(listener2)
  })
})
