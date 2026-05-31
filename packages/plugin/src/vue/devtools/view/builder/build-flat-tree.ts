import { getInstances } from '@goranton/vue-composable-observer-core'
import { Node } from '../types'
import { formatLabel } from '../utils/format-label'

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
    label: formatLabel(name, String(instances.length)),
    children: instances.map(instance => ({
      id: instance.id,
      label: instance.file,
      children: [],
    })),
  }))
}