import { getInstances } from '../registry'
import { subscribe } from '../subscribers'

export function createObserver() {
  return {
    getInstances,
    subscribe,
  }
}
