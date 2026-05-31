import { computed } from 'vue'
import { useStorage } from './useStorage'

export function useAuth() {
  const { count } = useStorage()

  const isLoggedIn = computed(
    () => count.value > 0,
  )

  return {
    count,
    isLoggedIn,
  }
}
