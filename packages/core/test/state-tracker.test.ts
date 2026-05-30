import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { trackStateChanges } from '../src'

describe('state tracker', () => {
  it('tracks ref changes', async () => {
    const count = ref(0)

    const callback = vi.fn()

    const stop = trackStateChanges(
      count,
      callback,
    )

    expect(callback).not.toHaveBeenCalled()

    count.value++

    await nextTick()

    expect(callback).toHaveBeenCalled()

    stop()
  })

  it('tracks changes inside object state', async () => {
    const count = ref(0)

    const callback = vi.fn()

    const stop = trackStateChanges(
      {
        count,
      },
      callback,
    )

    count.value++

    await nextTick()

    expect(callback).toHaveBeenCalledTimes(1)

    stop()
  })

  it('stops tracking after dispose', async () => {
    const count = ref(0)

    const callback = vi.fn()

    const stop = trackStateChanges(
      { count },
      callback,
    )

    stop()

    count.value++

    await nextTick()

    expect(callback).not.toHaveBeenCalled()
  })
})
