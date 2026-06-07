# Getting Started

## Installation

```bash
pnpm add -D @runtime-labs/composable-plugin
```

```bash
npm install -D @runtime-labs/composable-plugin
```

```bash
yarn add -D @runtime-labs/composable-plugin
```

## Setup

### 1. Register the Vite plugin

Use the function form of `defineConfig` to access `command` — it equals `'serve'` during dev and `'build'` during production.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VueComposableObserver } from '@runtime-labs/composable-plugin/unplugin'

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    command === 'serve' && VueComposableObserver.vite(),
  ],
}))
```

### 2. Register the Vue plugin

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

if (import.meta.env.DEV) {
  const { ComposableObserverVuePlugin } = await import('@runtime-labs/composable-plugin/vue')
  app.use(ComposableObserverVuePlugin)
}

app.mount('#app')
```

That's it. No changes to your composables are needed.

## Usage

Start your application in development mode and open **Vue DevTools**.

A new **Composable Observer** section will appear with three views, and composables also surface directly inside the standard **Components** panel:

### Runtime View

Shows the full composable hierarchy with nesting and dependency relationships.

```
useProducts
 ├─ useApi
 └─ useAuth
     └─ useStorage
```

### Component View

Shows which components are using specific composables.

```
ProductPage
 ├─ useProducts
 └─ useAuth
```

### Flat View

A searchable flat list of all tracked composable instances with their current state.

### Components panel integration

You don't even need to switch tabs to see what a component is using: select any
component in the standard **Components** inspector, and a **Composables** group
appears in its State view — right alongside `props`, `setup`, and `data` —
listing each composable the component calls directly and its current state.

## Example

Given this composable:

```ts
// composables/useProducts.ts
export function useProducts() {
  const { user } = useAuth()
  const { get } = useApi()

  const products = ref<Product[]>([])

  async function fetchProducts() {
    products.value = await get('/products')
  }

  return { products, fetchProducts }
}
```

Composable Observer automatically tracks:

- Creation of the `useProducts` instance
- Its nested calls to `useAuth` and `useApi`
- The component that owns this instance
- The current value of `products` as it changes

No `trackComposable()` calls, no decorators, no manual instrumentation.
