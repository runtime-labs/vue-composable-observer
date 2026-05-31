import {
  isReactive,
  isRef,
  toValue,
  watch,
} from 'vue'

export function trackStateChanges(
  state: unknown,
  callback: () => void,
) {
  const stops: (() => void)[] = []

  function storeStop(
    stop: () => void,
  ) {
    stops.push(stop)
  }

  function track(
    value: unknown,
  ) {
    if (
      isRef(value)
      || isReactive(value)
    ) {
      storeStop(
        watch(
          () => toValue(value),
          () => callback(),
          {
            deep: true,
            flush: 'post',
          },
        ),
      )

      return
    }

    if (
      typeof value === 'object'
      && value !== null
    ) {
      for (const nested of Object.values(value)) {
        track(nested)
      }
    }
  }

  track(state)

  return () => {
    for (const stop of stops) {
      stop()
    }
  }
}
