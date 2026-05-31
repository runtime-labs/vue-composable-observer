import { getInstanceById, getInstances } from '@goranton/vue-composable-observer-core'

function buildNode(id: string) {
    const instance = getInstanceById(id)

    if (!instance) {
        return null
    }

    return {
        id: instance.id,
        label: instance.name,

        children: [
            ...(instance.dependencyIds ?? []),
        ]
        .map(buildNode)
        .filter(Boolean)
    }
}

export function buildInspectorTree() {
  return getInstances().map(instance => ({
    id: instance.id,
    label: instance.name,
  }))
}
