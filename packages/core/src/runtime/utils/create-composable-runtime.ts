import { registerInstance, unregisterInstance, updateInstanceState } from '../registry'
import { createInstance, createInstanceId } from './create-instance'

export function createComposableRuntime(
  name: string,
) {
  const id = createInstanceId()

  const instance = createInstance(
    id,
    name,
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
