---
"@runtime-labs/composable-plugin": minor
---

Improve the Vue Devtools experience for inspecting composables:

- Surface a "Composables" group directly in the standard Components inspector panel, so a component's composables and their state show up next to its own setup/props/data
- Show file paths as hoverable tags with tooltips instead of cluttering node labels
- Replace full State History snapshots with a recursive diff showing only what changed, as `from → to`
- Add search/filtering across the composable tree inspectors
- Fix Dependencies entries showing the dependency id as the key instead of its name
