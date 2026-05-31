import { getInstances } from '@runtime-labs/observer-core'
import { buildNode } from '../utils/build-node'

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
