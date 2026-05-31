import { registerInstance, unregisterInstance, updateInstanceState } from '../registry'
import { createInstance, createInstanceId } from './create-instance'

export function createComposableRuntime(
  name: string,
  file: string,
  parentId: string | null,
) {
  const id = createInstanceId()

  const instance = createInstance(
    id,
    name,
    file,
    parentId,
  )

  registerInstance(instance)

  return {
    id,
    instance,

    updateState(state: unknown) {
      return updateInstanceState(id, state)
    },

    dispose() {
      unregisterInstance(id)
    },
  }
}
