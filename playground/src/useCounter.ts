import { ref } from "vue"

export function useCounter() {
    const count = ref(0)

    return {
        count,
    }
}