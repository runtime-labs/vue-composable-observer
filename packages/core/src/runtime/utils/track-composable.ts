import { isDev } from "../../utils"
import { createInstance } from "./create-instance"
import { registerDependency, registerInstance, updateInstanceState } from "../registry"
import { getCurrentComposable, getCurrentOwner, runWithComposable } from "../scope"
import { createInstanceId } from "./create-instance-id"

export function trackComposable<T>(
    name: string,
    fn: () => T,
) {
    return () => {
        const id = createInstanceId()
        
        const parentComposableId = getCurrentComposable()

        if (parentComposableId && parentComposableId !== id) {
            registerDependency(
                parentComposableId,
                id,
            )
        }

        const instance = createInstance(
            id,
            name,
            getCurrentOwner() || null,
        )

        registerInstance(instance)

        const state = runWithComposable(
            id,
            fn
        )

        updateInstanceState(id, state)

        if (isDev()) {
            console.log(`Registered composable instance: ${instance.name} (ID: ${instance.id})`)
        }

        return {
            state,
            instance,
        }
    }
}