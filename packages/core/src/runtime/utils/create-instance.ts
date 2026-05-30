import { ComposableInstance } from "../types";
import { createInstanceId } from ".";

export function createInstance(
    id: string,
    name: string,
    ownerId?: string | null,
    dependencyIds?: Set<string> | null,
): ComposableInstance {
    return {
        id: id || createInstanceId(),
        name,
        createdAt: Date.now(),
        state:null,
        ownerId,
        dependencyIds,
    }
}