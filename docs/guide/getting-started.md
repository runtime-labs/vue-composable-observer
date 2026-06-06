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

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VueComposableObserver } from '@runtime-labs/composable-plugin/unplugin'

export default defineConfig({
  plugins: [
    vue(),
    VueComposableObserver.vite(),
  ],
})
```

### 2. Register the Vue plugin

```ts
// main.ts
import { createApp } from 'vue'
import { ComposableObserverVuePlugin } from '@runtime-labs/composable-plugin/vue'
import App from './App.vue'

createApp(App)
  .use(ComposableObserverVuePlugin)
  .mount('#app')
```

That's it. No changes to your composables are needed.

## Usage

Start your application in development mode and open **Vue DevTools**.

A new **Composable Observer** section will appear with three views:

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
