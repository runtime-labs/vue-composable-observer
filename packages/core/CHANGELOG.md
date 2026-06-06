# @runtime-labs/observer-core

## 1.1.0

### Minor Changes

- Add state history tracking. Each composable now keeps a rolling snapshot of its last 10 state values. Use `getHistory(instanceId)` from `@runtime-labs/observer-core` to read the snapshots. State history is also visible in the Vue DevTools inspector under "State History".
