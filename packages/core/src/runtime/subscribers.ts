type ObserverEvent =
    | {
      type: 'instance:registered',
      instanceId: string,
    }
    | {
      type: 'instance:unregistered',
      instanceId: string,
    }
    | {
      type: 'instance:stateUpdated',
      instanceId: string,
      state: unknown,
    }
    | {
      type: 'instance:dependencyRegistered',
      instanceId: string,
      dependencyId: string,
    }
    | {
      type: 'instance:cleared',
    }

type Listener = (event: ObserverEvent) => void

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

export function notifySubscribers(event: ObserverEvent) {
  listeners.forEach((listener) => listener(event))
}
