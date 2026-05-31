import { getInstanceById } from '@goranton/vue-composable-observer-core'

export function buildInspectorState(id: string) {
  const instance = getInstanceById(id)

  const deps = Array.from(instance?.dependencyIds ?? new Set())
    .filter((depId) => typeof depId === 'string')
    .map((depId) => getInstanceById(depId))
    .filter((dep) => dep !== null)

  return {
    General: [
      {
        key: 'name',
        value: instance?.name,
      },
      {
        key: 'id',
        value: instance?.id,
      },
    ],
    State: Object.entries(
      instance?.state ?? {},
    ).map(([key, value]) => ({
      key, value,
    })),
    Dependencies: deps.map((dep) => ({
      key: dep.id,
      value: dep.name,
    })),
  }
}
