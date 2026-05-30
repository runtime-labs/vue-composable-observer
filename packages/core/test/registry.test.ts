import { describe, expect, it } from 'vitest'

import {
  clearInstances,
  getInstances,
  registerInstance,
  unregisterInstance,
  updateInstanceState,
  createInstance,
} from '../src'

describe('registry', () => {
    it.beforeEach(() => {
        clearInstances()
    })

  it('updates instance state', () => {

    const instance = createInstance(
      'test-id',
      'useCounter',
    )

    registerInstance(instance)

    updateInstanceState(
      instance.id,
      {
        count: 42,
      },
    )

    const updated = getInstances()[0]

    expect(updated.state).toEqual({
      count: 42,
    })
  })

  it('unregisters instance', () => {

    const instance = createInstance(
      'test-id',
      'useCounter',
    )

    registerInstance(instance)

    expect(getInstances()).toHaveLength(1)

    unregisterInstance(instance.id)

    expect(getInstances()).toHaveLength(0)
  })

  it('clears all instances', () => {

    registerInstance(
      createInstance(
        '1',
        'useAuth',
      ),
    )

    registerInstance(
      createInstance(
        '2',
        'useUser',
      ),
    )

    expect(getInstances()).toHaveLength(2)

    clearInstances()

    expect(getInstances()).toHaveLength(0)
  })
})
