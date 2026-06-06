# FAQ

## Does this work in production?

No — and that's by design. The build-time transform only runs when `import.meta.env.DEV === true`. In production builds, composables are not wrapped and the runtime engine is never initialized. There is zero runtime cost in production.

## Does this work with SSR / Nuxt?

Partial support. The build-time transform works fine. The runtime engine calls `initComposableObserver()` which guards against non-browser environments (`typeof window === 'undefined'`), so it safely skips initialization on the server.

DevTools integration requires a browser, so server-rendered composable calls are not tracked. Full SSR + Nuxt support is planned in a future release.

## Which Vue version is supported?

Vue 3. Vue 2 is not supported.

## Which bundlers are supported?

Currently **Vite** is the primary target. The plugin is built on [unplugin](https://github.com/unjs/unplugin), which means Webpack, Rollup and esbuild support is possible in the future.

## Does it track composables inside `.vue` files?

Not yet. The current transform only processes `.ts` and `.js` files. Support for `.vue` single-file components is planned.

## Will it slow down my dev server?

The AST transform adds a small amount of parsing work per file. In practice the overhead is not noticeable on typical codebases. Only files that export `use*` functions are processed.

## Can I use it without Vue DevTools?

Yes. You can subscribe to events programmatically using the `subscribe` API from `@runtime-labs/observer-core`. This is useful for building custom tooling or logging composable state to the console.

```ts
import { subscribe } from '@runtime-labs/observer-core'

subscribe((event) => {
  console.log(event)
})
```

## How do I disable tracking for a specific composable?

There is no per-composable opt-out today. If you need to exclude a file, you can configure the transform's `include`/`exclude` options (coming soon). For now, the simplest workaround is to not export the function with a `use` prefix.

## Does circular dependency detection work?

Not yet — circular dependency detection is on the roadmap. The current data model stores `dependencyIds` as a flat set, so a circular graph would be detected by walking the tree and checking for cycles.
