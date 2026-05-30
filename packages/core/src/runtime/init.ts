import { createObserver } from './utils/create-observer'

declare global {
  interface Window {
    __COMPOSABLE_OBSERVER__?: ReturnType<typeof createObserver>
  }
}

export function initComposableObserver() {
  if (typeof window === 'undefined') {
    return
  }

  if (window.__COMPOSABLE_OBSERVER__) {
    return
  }

  window.__COMPOSABLE_OBSERVER__ = createObserver()
}
