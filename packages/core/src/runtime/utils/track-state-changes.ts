import { isRef, watch } from 'vue'

export function trackStateChanges(
  state: unknown,
  callback: () => void,
) {
  const stops: (() => void)[] = []

  function storeStop(stop: () => void) {
    stops.push(stop)
  }

  if (isRef(state)) {
    storeStop(
      watch(
        state,
        () => callback(),
        { deep: true }
      ),
    )
  }

  if (typeof state === 'object' && state !== null) {
    for (const value of Object.values(state)) {
      if (isRef(value)) {
        storeStop(
          watch(
            value,
            () => callback(),
          ),
        )
      }
    }
  }

  return () => {
    stops.forEach((stop) => stop())
  }
}
