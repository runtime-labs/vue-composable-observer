import { isDev } from "../utils"
import { registerComposable } from "./register-composable"

export function trackComposable<T>(
    name: string,
    fn: () => T,
) {
    return () => {
        const state = fn()

        const instance = registerComposable(name, state)
        
        if (isDev()) {
            console.log(`Registered composable instance: ${instance.name} (ID: ${instance.id})`)
        }

        return state
    }
}