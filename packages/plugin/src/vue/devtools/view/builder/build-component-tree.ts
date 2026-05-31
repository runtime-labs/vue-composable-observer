import { getInstances } from '@runtime-labs/observer-core'

import { buildNode } from '../utils/build-node'
import { formatLabel } from '../utils/format-label'

export function buildComponentTree() {
  const instances = getInstances()

  const components = new Map<
    number,
    {
      uid: number
      name: string
      file?: string
    }
  >()

  for (const instance of instances) {
    if (!instance.component) {
      continue
    }

    components.set(
      instance.component.uid,
      instance.component,
    )
  }

  return [...components.values()].map((component) => ({
    id: `component:${component.uid}`,

    label: formatLabel(component.name, component.file),

    children: instances
      .filter(
        instance =>
          !instance.parentId
          && instance.component?.uid === component.uid,
      )
      .map(
        instance => buildNode(
          instance.id,
          instances,
        ),
      )
      .filter(
        instance => instance !== null,
      ),
  }))
}
