import { getInstances } from '@goranton/vue-composable-observer-core'

export function buildInspectorTree() {
  return getInstances().map(instance => ({
    id: instance.id,
    label: instance.name,
  }))
}
