import { registerInstance, unregisterInstance, updateInstanceState } from '../registry'
import { createInstance } from './create-instance'
import { createInstanceId } from './create-instance-id'

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
