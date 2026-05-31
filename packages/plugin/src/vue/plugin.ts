import { type Plugin } from 'vue'
import { initComposableObserver } from '@runtime-labs/observer-core'
import { setupComposableObserverDevtools } from './devtools'

export const ComposableObserverVuePlugin: Plugin = {
  install(app) {
    initComposableObserver()

    setupComposableObserverDevtools(
      app,
    )
  },
}
