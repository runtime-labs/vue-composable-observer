import { ref } from 'vue'

export function useStorage() {
  const count = ref(0)

  return {
    count,
  }
}
