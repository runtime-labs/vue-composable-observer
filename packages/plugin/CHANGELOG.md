# @runtime-labs/composable-plugin

## 1.1.2

### Patch Changes

- Fix devtools inspector IDs format and add debug logging for event tracking.

## 1.1.1

### Patch Changes

- Update package READMEs with demo gif, correct API docs and full setup instructions. Expand npm keywords for better discoverability.
- Updated dependencies
  - @runtime-labs/observer-core@1.1.1

## 1.1.0

### Minor Changes

- Add state history tracking. Each composable now keeps a rolling snapshot of its last 10 state values. Use `getHistory(instanceId)` from `@runtime-labs/observer-core` to read the snapshots. State history is also visible in the Vue DevTools inspector under "State History".

### Patch Changes

- Updated dependencies
  - @runtime-labs/observer-core@1.1.0
