import { createInstance } from "./create-instance"
import { registerInstance } from "./registry"

export function registerComposable(name: string, state: unknown) {
    const instance = createInstance(name, state)
    registerInstance(instance)
    return instance
}