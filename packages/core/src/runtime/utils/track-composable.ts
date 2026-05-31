import { isDev } from '../../utils'
import { registerDependency } from '../registry'
import { getCurrentComposable, runWithComposable } from '../scope'
import { getCurrentScope, onScopeDispose } from 'vue'
import { createComposableRuntime } from './create-composable-runtime'
import { trackStateChanges } from './track-state-changes'
import { notifySubscribers } from '../subscribers'

export function trackComposable<TArgs extends unknown[], TResult>(
  name: string,
  file: string,
  fn: (...args: TArgs) => TResult,
) {
  return (...args: TArgs) => {
    const parentComposableId = getCurrentComposable()

    const runtime = createComposableRuntime(
      name,
      file,
      parentComposableId,
    )

    if (parentComposableId && parentComposableId !== runtime.id) {
      registerDependency(
        parentComposableId,
        runtime.id,
      )
    }

    const state = runWithComposable(
      runtime.id,
      () => fn(...args),
    )

    runtime.updateState(state)

    const stopTracking = trackStateChanges(
      state,
      () => {
        notifySubscribers({
          type: 'instance:stateUpdated',
          instanceId: runtime.id,
          state,
        })
      },
    )

    if (isDev()) {
      console.log(`Registered composable instance: ${runtime.instance.name} (ID: ${runtime.instance.id})`)
    }

    if (getCurrentScope()) {
      onScopeDispose(() => {
        if (isDev()) {
          console.log(`Unregistering composable instance: ${runtime.instance.name} (ID: ${runtime.instance.id})`)
        }

        stopTracking()
        runtime.dispose()
      })
    } else {
      if (isDev()) {
        console.warn(
          `Composable instance "${runtime.instance.name}" (ID: ${runtime.instance.id}) is not registered to any scope. It will not be automatically unregistered and may lead to memory leaks.`,
        )
      }
    }

    return state
  }
}
