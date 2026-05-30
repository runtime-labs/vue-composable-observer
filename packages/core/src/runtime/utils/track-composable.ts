import { isDev } from "../../utils"
import { createInstance } from "./create-instance"
import { registerInstance } from "../registry"
import { getCurrentOwner } from "../scope"

export function trackComposable<T>(
    name: string,
    fn: () => T,
) {
    return () => {
        const state = fn()

        const instance = createInstance(
            name, 
            state,
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