import { getInstanceById, getInstances } from '@goranton/vue-composable-observer-core'
import { type Node } from '../types'

function buildNode(id: string, instances: ReturnType<typeof getInstances>): Node | null {
  const instance = getInstanceById(id)

  if (!instance) {
    return null
  }

  const childrenIds = instances
    .filter((child) => child.parentId && child.parentId === id)
    .map((child) => child.id)
    .filter(Boolean)

  return {
    id: instance.id,
    label: `${instance.name} (${instance.file})`,
    children: childrenIds
      .map(
        childId => buildNode(childId, instances),
      )
      .filter(
        (node) => node !== null,
      ),
  } as const
}

export function buildRuntimeTree() {
  const instances = getInstances()

  return instances
    .filter(
      instance => !instance.parentId,
    )
    .map(
      instance => buildNode(instance.id, instances),
    )
    .filter(
      instance => instance !== null,
    )
}
