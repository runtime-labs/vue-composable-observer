import { notifySubscribers } from './subscribers'
import { type ComposableInstance } from './types'

const composables = new Map<string, ComposableInstance>()

export function registerInstance(record: ComposableInstance) {
  composables.set(record.id, record)
  notifySubscribers({
    type: 'instance:registered',
    instanceId: record.id,
  })
}

export function unregisterInstance(id: string) {
  composables.delete(id)
  notifySubscribers({
    type: 'instance:unregistered',
    instanceId: id,
  })
}

export function getInstances() {
  return [...composables.values()]
}

export function clearInstances() {
  composables.clear()
  notifySubscribers({
    type: 'instance:cleared',
  })
}

export function updateInstanceState(id: string, state: unknown) {
  const instance = composables.get(id)
  if (instance) {
    instance.state = state
    notifySubscribers({
      type: 'instance:stateUpdated',
      instanceId: id,
      state,
    })
  }
}

export function registerDependency(instanceId: string, dependencyId: string) {
  const instance = composables.get(instanceId)
  if (!instance) return

  if (!instance.dependencyIds) {
    instance.dependencyIds = new Set()
  }

  instance.dependencyIds.add(dependencyId)
  notifySubscribers({
    type: 'instance:dependencyRegistered',
    instanceId,
    dependencyId,
  })
}
