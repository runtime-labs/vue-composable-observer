# Vue Composable Observer

Track Vue composables at runtime and inspect their state, dependencies and ownership directly in Vue DevTools.

## Features

* 🔍 Automatic composable discovery
* 📦 Runtime composable tracking
* 🌳 Dependency tree visualization
* 🧩 Component ownership tracking
* 📄 Source file mapping
* ⚡ Live state updates
* 🛠 Vue DevTools integration
* 🔎 Search support

## Why?

Vue DevTools shows components, Pinia stores and application state, but composables often remain invisible.

When an application grows, it becomes difficult to answer questions like:

* Which composables are currently active?
* Which composable created this state?
* Which composables depend on each other?
* Which component owns a composable instance?
* Where is a composable defined?

Vue Composable Observer makes composables observable at runtime.

## Installation

```bash
pnpm add -D @goranton/vue-composable-observer
```

## Vite

```ts
import { defineConfig } from 'vite'
import VueComposableObserver from '@goranton/vue-composable-observer/vite'

export default defineConfig({
  plugins: [
    VueComposableObserver(),
  ],
})
```

## Vue

```ts
import { createApp } from 'vue'
import App from './App.vue'

import { VueComposableObserverPlugin } from '@goranton/vue-composable-observer/vue'

createApp(App)
  .use(VueComposableObserverPlugin)
  .mount('#app')
```

## Example

```ts
export function useStorage() {
  const count = ref(0)

  return {
    count,
  }
}

export function useAuth() {
  const storage = useStorage()

  return {
    storage,
  }
}

export function useProducts() {
  const auth = useAuth()

  return {
    auth,
  }
}
```

Runtime tree:

```text
useProducts
└─ useAuth
   └─ useStorage
```

Component tree:

```text
App.vue
└─ useProducts
   └─ useAuth
      └─ useStorage
```

## DevTools Views

### Runtime

Shows runtime composable hierarchy.

```text
useProducts
└─ useAuth
   └─ useStorage
```

### Components

Shows composables grouped by owning component.

```text
ProductsPage.vue
└─ useProducts
   └─ useAuth
```

### Flat

Shows all active composable instances.

```text
useProducts
useAuth
useStorage
```

## What is tracked?

The plugin currently tracks:

* Exported composable functions
* Runtime instances
* Parent-child composable relationships
* Reactive state updates
* Component ownership
* Source file information

## Current Limitations

* Vue only
* Vite only
* Development mode only
* Experimental API
* DevTools integration may evolve between releases

## Roadmap

* Timeline view
* Dependency graph view
* Better search and filtering
* Nuxt-specific integrations
* Performance insights

## Contributing

Issues and pull requests are welcome.

## License

MIT
