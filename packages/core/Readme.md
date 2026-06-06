# @runtime-labs/observer-core

> Framework-agnostic runtime engine for [Vue Composable Observer](https://runtime-labs.github.io/vue-composable-observer)

<p align="center">
  <img src="https://raw.githubusercontent.com/runtime-labs/vue-composable-observer/main/docs/public/demo.gif" alt="Vue Composable Observer Demo" width="700" />
</p>

## What it is

This is the low-level runtime that powers Vue Composable Observer. It tracks composable instances, their dependency relationships, reactive state and state history.

Most users should install [`@runtime-labs/composable-plugin`](https://www.npmjs.com/package/@runtime-labs/composable-plugin) instead — it includes this package and adds the Vite plugin and Vue DevTools integration.

## Installation

```bash
pnpm add @runtime-labs/observer-core
```

## API

```ts
import {
  initComposableObserver,
  subscribe,
  getInstances,
  getInstanceById,
  getHistory,
  trackComposable,
} from '@runtime-labs/observer-core'
```

### `subscribe(listener)`

Subscribe to all observer events. Returns an unsubscribe function.

```ts
const unsubscribe = subscribe((event) => {
  switch (event.type) {
    case 'instance:registered':       // composable created
    case 'instance:unregistered':     // composable disposed
    case 'instance:stateUpdated':     // reactive state changed
    case 'instance:dependencyRegistered': // parent→child edge added
    case 'instance:cleared':          // all instances cleared (e.g. HMR)
  }
})
```

### `getInstances()`

Returns all live composable instances as `ComposableInstance[]`.

### `getInstanceById(id)`

Returns a single instance by ID, or `null`.

### `getHistory(id)`

Returns the rolling snapshot history for a composable (last 10 states).

```ts
const snapshots = getHistory('abc-123')
// [{ timestamp: number, values: Record<string, unknown> }, ...]
```

### `trackComposable(name, file, fn)`

Wraps a composable function with tracking logic. Used by the build-time transform — you typically don't need this directly.

## Documentation

Full docs at **[runtime-labs.github.io/vue-composable-observer](https://runtime-labs.github.io/vue-composable-observer)**

## License

MIT
