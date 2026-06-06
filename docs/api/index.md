# API Reference

## `@runtime-labs/composable-plugin/unplugin`

### `VueComposableObserver`

The build-time Vite/unplugin plugin that instruments your composables.

```ts
import { VueComposableObserver } from '@runtime-labs/composable-plugin/unplugin'
```

#### `.vite(options?)`

Returns a Vite plugin. Pass it to `vite.config.ts`.

```ts
VueComposableObserver.vite()
```

The plugin has no built-in production guard — register it conditionally. See [Getting Started](/guide/getting-started) for the recommended setup.

---

## `@runtime-labs/composable-plugin/vue`

### `ComposableObserverVuePlugin`

The Vue plugin that initializes the runtime observer and wires up the Vue DevTools inspectors.

```ts
import { ComposableObserverVuePlugin } from '@runtime-labs/composable-plugin/vue'

createApp(App)
  .use(ComposableObserverVuePlugin)
  .mount('#app')
```

---

## `@runtime-labs/observer-core`

The framework-agnostic runtime engine. You typically don't need to import this directly — it is used internally by the Vue plugin.

### `initComposableObserver()`

Initializes the global observer instance on `window.__COMPOSABLE_OBSERVER__`. Safe to call multiple times.

```ts
import { initComposableObserver } from '@runtime-labs/observer-core'

initComposableObserver()
```

### `subscribe(listener)`

Subscribes to all observer events. Returns an unsubscribe function.

```ts
import { subscribe } from '@runtime-labs/observer-core'

const unsubscribe = subscribe((event) => {
  switch (event.type) {
    case 'instance:registered':
      console.log('new instance', event.instanceId)
      break
    case 'instance:stateUpdated':
      console.log('state changed', event.instanceId, event.state)
      break
  }
})

// later
unsubscribe()
```

**Event types:**

```ts
type ObserverEvent =
  | { type: 'instance:registered';           instanceId: string }
  | { type: 'instance:unregistered';         instanceId: string }
  | { type: 'instance:stateUpdated';         instanceId: string; state: unknown }
  | { type: 'instance:dependencyRegistered'; instanceId: string; dependencyId: string }
  | { type: 'instance:cleared' }
```

### `getInstances()`

Returns all currently registered composable instances as an array.

```ts
import { getInstances } from '@runtime-labs/observer-core'

const instances = getInstances() // ComposableInstance[]
```

### `getInstanceById(id)`

Returns a single composable instance by its ID, or `null` if not found.

```ts
import { getInstanceById } from '@runtime-labs/observer-core'

const instance = getInstanceById('abc-123') // ComposableInstance | null
```

### `getHistory(instanceId)`

Returns the state snapshot history for a composable instance.

```ts
import { getHistory } from '@runtime-labs/observer-core'

const snapshots = getHistory('abc-123') // StateSnapshot[]
```

### `trackComposable(name, file, fn)`

Low-level function used by the build-time transform. Wraps a composable function with tracking logic.

```ts
import { trackComposable } from '@runtime-labs/observer-core'

export const useCounter = trackComposable(
  'useCounter',
  'src/composables/useCounter.ts',
  function () {
    const count = ref(0)
    return { count }
  },
)
```

You should not need this in normal usage — the Vite plugin handles it automatically.

---

## Types

### `ComposableInstance`

```ts
interface ComposableInstance {
  id: string
  name: string
  file: string
  createdAt: number
  state: unknown
  dependencyIds?: Set<string> | null
  parentId?: string | null
  component?: {
    uid: number
    name: string
    file?: string
  }
}
```

### `StateSnapshot`

```ts
interface StateSnapshot {
  timestamp: number
  values: Record<string, unknown>
}
```
