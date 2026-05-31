import { type Plugin } from 'vue'
import { initComposableObserver } from '@goranton/vue-composable-observer-core'
import { setupComposableObserverDevtools } from './devtools'

export const ComposableObserverVuePlugin: Plugin = {
  install(app) {
    initComposableObserver()

    setupComposableObserverDevtools(
      app,
    )
  },
}
