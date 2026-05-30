import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)

  return {
    count,
  }
}

export function useDeepCounter() {
  const { count } = useCounter()

  return {
    nested: {
      count,
    },
  }
}
