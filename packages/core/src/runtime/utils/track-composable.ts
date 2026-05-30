import { isDev } from '../../utils'
import { createInstance } from './create-instance'
import { registerDependency, registerInstance, unregisterInstance, updateInstanceState } from '../registry'
import { getCurrentComposable, runWithComposable } from '../scope'
import { createInstanceId } from './create-instance-id'
import { getCurrentScope, onScopeDispose } from 'vue'

export function trackComposable<TArgs extends unknown[], TResult>(
  name: string,
  fn: (...args: TArgs) => TResult,
) {
  return (...args: TArgs) => {
    const id = createInstanceId()

    const parentComposableId = getCurrentComposable()

    if (parentComposableId && parentComposableId !== id) {
      registerDependency(
        parentComposableId,
        id,
      )
    }

    const instance = createInstance(
      id,
      name,
    )

    registerInstance(instance)

    const state = runWithComposable(
      id,
      () => fn(...args),
    )

    updateInstanceState(id, state)

    if (isDev()) {
      console.log(`Registered composable instance: ${instance.name} (ID: ${instance.id})`)
    }

    if (getCurrentScope()) {
      onScopeDispose(() => {
        if (isDev()) {
          console.log(`Unregistering composable instance: ${instance.name} (ID: ${instance.id})`)
        }

        unregisterInstance(id)
      })
    } else {
      if (isDev()) {
        console.warn(
          `Composable instance "${instance.name}" (ID: ${instance.id}) is not registered to any scope. It will not be automatically unregistered and may lead to memory leaks.`,
        )
      }
    }

    return {
      state,
      instance,
    }
  }
}
