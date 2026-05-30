import { getInstances } from './registry'

declare global {
  interface Window {
    __COMPOSABLE_OBSERVER__?: {
      getInstances: typeof getInstances
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
  }
}
