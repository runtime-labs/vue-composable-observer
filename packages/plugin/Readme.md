# @runtime-labs/composable-plugin

Build-time transform and Vue DevTools integration for Vue Composable Observer.

## Installation

```bash
pnpm add -D @runtime-labs/composable-plugin
```

## Vite

```ts
import { VueComposableObserver }
  from '@runtime-labs/composable-plugin/unplugin'

plugins: [
  VueComposableObserver.vite(),
]
```

## Vue

```ts
import { ComposableObserverVuePlugin }
  from '@runtime-labs/composable-plugin/vue'

app.use(ComposableObserverVuePlugin)
```

## Documentation

See the main repository documentation.

## License

MIT
