import { ComposableInstance } from "./types";
import { createInstanceId } from "./utils";

export function createInstance(name: string, state: unknown): ComposableInstance {
    return {
        id: createInstanceId(),
        name,
        createdAt: Date.now(),
        state
    }
}