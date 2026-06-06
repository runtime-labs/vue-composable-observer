# How it works

Vue Composable Observer has two layers: a **build-time transform** that instruments your code, and a **runtime engine** that tracks composable instances.

## Build-time transform

The Vite plugin parses every `.ts` and `.js` file using `@babel/parser`. It finds all exported functions whose names start with `use` and rewraps them with a call to `trackComposable`.

```ts
// Your source
export function useCounter() {
  const count = ref(0)
  return { count }
}

// What the plugin emits (simplified)
export const useCounter = trackComposable('useCounter', 'src/composables/useCounter.ts', function () {
  const count = ref(0)
  return { count }
})
```

The rewrite happens at build time and is completely invisible to you. No manual instrumentation is needed.

### Which functions get tracked

The transform only instruments:

- `export function useFoo(...)` — named function declarations
- `export const useFoo = () => ...` — arrow functions
- `export const useFoo = function(...) ...` — function expressions

Non-exported functions and functions that don't start with `use` are left untouched.

## Runtime engine

When an instrumented composable is called, `trackComposable` wraps its execution:

1. **Reads the current scope** — using a thread-local-style context, it checks whether another composable is already running. If so, that composable becomes the parent.

2. **Creates a `ComposableInstance` record** — with a unique `id`, `name`, `file`, `createdAt` timestamp, and `parentId`.

3. **Registers it** — the instance goes into the global in-memory `Map` of all live composables.

4. **Runs the original function** — inside a scope that marks this composable as the current one, so any nested composable calls can detect their parent.

5. **Tracks reactive state** — the return value is passed to `trackStateChanges`, which uses Vue's `watch` to detect changes to any `ref` or `reactive` object inside it.

6. **Registers cleanup** — on Vue scope disposal, the instance is unregistered and state tracking is stopped.

## Instance lifecycle

```
composable called
      │
      ▼
ComposableInstance created
      │
      ├─── parent detected? ──► dependency edge registered
      │
      ├─── component context? ──► component info attached
      │
      ▼
state tracked with watch()
      │
      ▼
scope disposed (component unmounted)
      │
      ▼
instance unregistered, watchers stopped
```

## Event bus

All state changes flow through a lightweight pub/sub bus. DevTools inspectors subscribe to it and debounce tree refreshes for performance.

```ts
import { subscribe } from '@runtime-labs/observer-core'

const unsubscribe = subscribe((event) => {
  if (event.type === 'instance:stateUpdated') {
    console.log(event.instanceId, event.state)
  }
})
```

Events emitted:

| Event | When |
|---|---|
| `instance:registered` | A composable instance is created |
| `instance:unregistered` | A composable instance is disposed |
| `instance:stateUpdated` | Reactive state inside an instance changed |
| `instance:dependencyRegistered` | A parent→child dependency edge is created |
| `instance:cleared` | All instances are cleared (e.g. HMR) |

## Development vs production

The plugin has no built-in production guard. It is your responsibility to register it only in development — the same pattern used by Vue DevTools, Pinia DevTools, and other ecosystem tools. See [Getting Started](/guide/getting-started) for the recommended setup.
