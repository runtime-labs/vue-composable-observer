# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
pnpm install

# Run all tests
pnpm test

# Run a single test file
pnpm vitest run packages/core/test/registry.test.ts

# Build all packages
pnpm build

# Build individual packages
pnpm core:build
pnpm plugin:build

# Lint
pnpm lint
pnpm lint:fix

# Start playground (builds first, then starts Vite dev server)
pnpm play

# Docs (VitePress)
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

## Architecture

This is a pnpm monorepo with two published packages and a playground app:

- **`packages/core`** (`@runtime-labs/observer-core`) — framework-agnostic runtime tracking engine. No Vue dependency at runtime; Vue is a peer dep used only in `trackComposable` and `trackStateChanges`.
- **`packages/plugin`** (`@runtime-labs/composable-plugin`) — build-time AST transform + Vue DevTools integration. Depends on `observer-core` via `workspace:*`.
- **`playground`** — Vite + Vue 3 app for manual testing.

### How it works end-to-end

1. **Build-time (unplugin transform):** The Vite/unplugin plugin (`packages/plugin/src/unplugin/`) parses every `.ts`/`.js` file with `@babel/parser`, finds exported functions whose names start with `use` (`find-composables.ts`), and rewraps them with `trackComposable(name, file, fn)` using `magic-string`. This rewrite is invisible to users — no manual instrumentation needed.

2. **Runtime (observer-core):** `trackComposable` (`packages/core/src/runtime/utils/track-composable.ts`) wraps each composable call. It:
   - Creates a `ComposableInstance` record (id, name, file, parentId, component info)
   - Uses a thread-local-style scope (`composable-scope.ts`) to detect nesting and register parent→child dependency edges
   - Watches the returned state for reactive changes (`trackStateChanges.ts`) using Vue's `watch`
   - Registers/unregisters from the global `Map<string, ComposableInstance>` (`registry.ts`) on Vue scope disposal

3. **DevTools (Vue plugin):** `ComposableObserverVuePlugin` initializes the global observer on `window.__COMPOSABLE_OBSERVER__` and wires up three Vue DevTools inspectors (Runtime, Component, Flat) via `@vue/devtools-api`. They subscribe to observer events and debounce tree/state refreshes.

### Key files

| File | Role |
|---|---|
| `packages/core/src/runtime/utils/track-composable.ts` | Core wrapping logic — entry point for composable instrumentation |
| `packages/core/src/runtime/registry.ts` | In-memory `Map` of all live `ComposableInstance` records |
| `packages/core/src/runtime/subscribers.ts` | Pub/sub event bus for registry changes |
| `packages/core/src/runtime/scope/composable-scope.ts` | Thread-local-style current composable ID for nesting detection |
| `packages/plugin/src/unplugin/find-composables.ts` | AST visitor that detects exported `use*` functions |
| `packages/plugin/src/unplugin/transform.ts` | Code transform using `magic-string` |
| `packages/plugin/src/vue/devtools/index.ts` | DevTools inspector setup and event wiring |

### Composable detection rules

`findComposables` only wraps:
- `export function useFoo(...)` (FunctionDeclaration)
- `export const useFoo = () => ...` / `export const useFoo = function ...` (VariableDeclaration with arrow or function expression)

It does **not** wrap non-exported functions or functions not starting with `use`.

### Releases

Uses [Changesets](https://github.com/changesets/changesets). To cut a release: `pnpm changeset`, then `pnpm version-packages`, then `pnpm release`.
