# @runtime-labs/composable-plugin

> Build-time transform + Vue DevTools integration for [Vue Composable Observer](https://runtime-labs.github.io/vue-composable-observer)

Observe, inspect and debug Vue composables at runtime — without touching your source code.

<p align="center">
  <img src="https://raw.githubusercontent.com/runtime-labs/vue-composable-observer/main/docs/public/demo.gif" alt="Vue Composable Observer Demo" width="700" />
</p>

[![CI](https://github.com/runtime-labs/vue-composable-observer/actions/workflows/test.yml/badge.svg)](https://github.com/runtime-labs/vue-composable-observer/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/@runtime-labs/composable-plugin)](https://www.npmjs.com/package/@runtime-labs/composable-plugin)
[![downloads](https://img.shields.io/npm/dm/@runtime-labs/composable-plugin)](https://www.npmjs.com/package/@runtime-labs/composable-plugin)
[![license](https://img.shields.io/npm/l/@runtime-labs/composable-plugin)](./LICENSE)

## What it does

- **Instruments your composables at build time** — no manual `trackComposable()` calls needed
- **Shows composable hierarchy** in Vue DevTools — who calls whom, which component owns what
- **Surfaces composables in the standard Components panel** — select a component and see the composables it uses right alongside its `props` and `setup` state
- **Tracks reactive state in real time** — every `ref` and `reactive` object is watched automatically
- **Keeps a state history** — see how state changed over time, directly in DevTools

## Installation

```bash
pnpm add -D @runtime-labs/composable-plugin
```

## Setup

### 1. Vite plugin

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

### 2. Vue plugin

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

## Documentation

Full docs at **[runtime-labs.github.io/vue-composable-observer](https://runtime-labs.github.io/vue-composable-observer)**

## License

MIT
