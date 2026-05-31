import { type ComposableInstance } from '../types'

export function createInstanceId() {
  return crypto.randomUUID()
}

export function createInstance(
  id: string,
  name: string,
  parentId: string | null = null,
): ComposableInstance {
  return {
    id: id || createInstanceId(),
    name,
    createdAt: Date.now(),
    state: null,
    dependencyIds: null,
    parentId,
  }
}
