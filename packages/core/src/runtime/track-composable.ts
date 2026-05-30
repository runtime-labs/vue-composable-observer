import { isDev } from "../utils"
import { createInstance } from "./create-instance"
import { getCurrentOwner } from "./owner"
import { registerInstance } from "./registry"

export function trackComposable<T>(
    name: string,
    fn: () => T,
) {
    return () => {
        const state = fn()

        const instance = createInstance(
            name, state,
            getCurrentOwner() || null,
        )
        
        registerInstance(instance)

        if (isDev()) {
            console.log(`Registered composable instance: ${instance.name} (ID: ${instance.id})`)
        }

        return {
            state,
            instance,
        }
    }
}