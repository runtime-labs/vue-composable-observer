# Vue Composable Observer

<p align="center">

[![CI](https://github.com/runtime-labs/vue-composable-observer/actions/workflows/test.yml/badge.svg)](https://github.com/runtime-labs/vue-composable-observer/actions/workflows/test.yml)
[![Composable Plugin](https://img.shields.io/npm/v/@runtime-labs/composable-plugin)](https://www.npmjs.com/package/@runtime-labs/composable-plugin)
[![Observer Core](https://img.shields.io/npm/v/@runtime-labs/observer-core)](https://www.npmjs.com/package/@runtime-labs/observer-core)
[![Downloads](https://img.shields.io/npm/dm/@runtime-labs/composable-plugin)](https://www.npmjs.com/package/@runtime-labs/composable-plugin)
[![License](https://img.shields.io/npm/l/@runtime-labs/composable-plugin)](./LICENSE)

**[📖 Documentation](https://runtime-labs.github.io/vue-composable-observer)**

</p>

Observe, inspect and debug Vue composables at runtime.

Vue Composable Observer reveals the hidden architecture of your Vue application by visualizing composable relationships, component ownership, runtime state and dependency chains directly inside Vue DevTools.

<p align="center">
  <img src="./docs/public/demo.gif" alt="Vue Composable Observer Demo" />
</p>

## Why?

As Vue applications grow, composables become an invisible architectural layer.

Over time it becomes difficult to answer questions like:

* Which composable created this state?
* Which composables depend on each other?
* Why did this ref change?
* Why was this composable instantiated?
* Which component is using this composable?
* What caused this reactive update?

Vue Composable Observer makes those relationships visible.

## Features

* 🔍 Runtime composable inspection
* 🌳 Composable dependency graph
* 📦 Component → composable relationships
* ⚡ Reactive state change tracking
* 🛠 Vue DevTools integration
* 🚀 Vite support
* 💚 Vue 3 support
* 🧹 Zero production overhead
* 📚 TypeScript support

## Installation

```bash
pnpm add -D @runtime-labs/composable-plugin
```

## Setup

### Vite

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import {
  VueComposableObserver,
} from '@runtime-labs/composable-plugin/unplugin'

export default defineConfig({
  plugins: [
    vue(),
    VueComposableObserver.vite(),
  ],
})
```

### Vue

```ts
import { createApp } from 'vue'

import {
  ComposableObserverVuePlugin,
} from '@runtime-labs/composable-plugin/vue'

import App from './App.vue'

createApp(App)
  .use(ComposableObserverVuePlugin)
  .mount('#app')
```

## Usage

Start your application and open Vue DevTools.

A new **Composable Observer** inspector will appear.

### Runtime View

Visualizes composable hierarchy and runtime relationships.

```txt
useProducts
 ├─ useApi
 └─ useAuth
     └─ useStorage
```

### Component View

Shows which components are using specific composables.

```txt
ProductPage
 ├─ useProducts
 └─ useAuth
```

### Flat View

Provides a searchable list of all tracked composables.

## Example

Given the following composable:

```ts
export function useProducts() {
  const { user } = useAuth()
  const { get } = useApi()

  const products = ref([])

  return {
    products,
  }
}
```

Composable Observer automatically tracks:

* composable creation
* composable nesting
* component ownership
* runtime relationships
* state changes

No code changes are required.

## Packages

| Package                                                                                            | Description                                       |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [`@runtime-labs/observer-core`](https://www.npmjs.com/package/@runtime-labs/observer-core)         | Runtime tracking engine                           |
| [`@runtime-labs/composable-plugin`](https://www.npmjs.com/package/@runtime-labs/composable-plugin) | Build-time transform and Vue DevTools integration |

## Roadmap

### Runtime Inspection

* [ ] Timeline view
* [ ] State history
* [ ] Runtime graph export
* [ ] Advanced filtering
* [ ] Dependency visualization
* [ ] State diff viewer

### Static Analysis

* [ ] Circular dependency detection
* [ ] Composable audit CLI
* [ ] Architecture insights
* [ ] Performance analysis
* [ ] Shared state detection
* [ ] Side effect detection

## Contributing

Issues, feature requests and pull requests are welcome.

If you discover a bug or have an idea for a new feature, please open an issue.

## Development

```bash
pnpm install
pnpm test
pnpm build
```

Start playground:

```bash
pnpm play
```

## License

MIT
