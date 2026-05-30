import { type ComposableInstance } from '../types'
import { createInstanceId } from '.'

export function createInstance(
  id: string,
  name: string,
  dependencyIds?: Set<string> | null,
): ComposableInstance {
  return {
    id: id || createInstanceId(),
    name,
    createdAt: Date.now(),
    state: null,
    dependencyIds,
  }
}
