import { getInstances } from './registry'
import { subscribe } from './subscribers'

declare global {
  interface Window {
    __COMPOSABLE_OBSERVER__?: {
      getInstances: typeof getInstances
      subscribe: typeof subscribe
    }
  }
}

export function initComposableObserver() {
  if (typeof window === 'undefined') {
    return
  }

  if (window.__COMPOSABLE_OBSERVER__) {
    return
  }

  window.__COMPOSABLE_OBSERVER__ = {
    getInstances,
    subscribe,
  }
}
