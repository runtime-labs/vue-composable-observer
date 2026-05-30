type Listener = () => void

const listeners = new Set<Listener>()

export function subscribe(listener: Listener) {
  listeners.add(listener)

  return () => {
    unsubscribe(listener)
  }
}

export function unsubscribe(listener: Listener) {
  listeners.delete(listener)
}

export function notifySubscribers() {
  listeners.forEach((listener) => listener())
}