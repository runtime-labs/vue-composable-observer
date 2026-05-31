import { getInstanceById, type getInstances } from '@runtime-labs/observer-core'
import { type Node } from '../types'
import { formatLabel } from './format-label'

export function buildNode(id: string, instances: ReturnType<typeof getInstances>): Node | null {
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
    label: formatLabel(instance.name, instance.file),
    children: childrenIds
      .map(
        childId => buildNode(childId, instances),
      )
      .filter(
        (node) => node !== null,
      ),
  } as const
}
