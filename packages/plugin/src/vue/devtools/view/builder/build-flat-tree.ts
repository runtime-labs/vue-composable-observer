import { getInstances } from '@runtime-labs/observer-core'
import { type Node } from '../types'
import { countTag } from '../utils/build-tags'

export function buildFlatTree(): Node[] {
  const instances = getInstances()

  const groups = new Map<string, typeof instances>()

  for (const instance of instances) {
    const group = groups.get(instance.name)

    if (group) {
      group.push(instance)
    } else {
      groups.set(instance.name, [instance])
    }
  }

  return [...groups.entries()].map(([name, instances]) => ({
    id: name,
    label: name,
    tags: countTag(instances.length),
    children: instances.map(instance => ({
      id: instance.id,
      label: instance.file,
      children: [],
    })),
  }))
}
