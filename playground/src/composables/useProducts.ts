import { ref } from 'vue'
import { useAuth } from './useAuth'

export function useProducts() {
  const auth = useAuth()

  const products = ref([
    'Apple',
    'Banana',
    'Orange',
  ])

  return {
    auth,
    products,
  }
}
