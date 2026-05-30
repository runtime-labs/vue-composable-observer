import { ComposableInstance } from "./types"

const composables = new Map<string, ComposableInstance>()

export function registerInstance(record: ComposableInstance) {
  composables.set(record.id, record)
}

export function unregisterInstance(id: string) {
  composables.delete(id)
}

export function getInstances() {
  return [...composables.values()]
}

export function clearInstances() {
  composables.clear()
}
