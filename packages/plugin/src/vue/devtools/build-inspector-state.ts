import { getInstanceById, getHistory } from '@runtime-labs/observer-core'
import { diffSnapshotValues } from './diff-snapshot-values'

export function buildInspectorState(id: string) {
  const instance = getInstanceById(id)

  const deps = Array.from(instance?.dependencyIds ?? new Set())
    .filter((depId) => typeof depId === 'string')
    .map((depId) => getInstanceById(depId))
    .filter((dep) => dep !== null)

  const history = getHistory(id)

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
      key: dep.name,
      value: dep.id,
    })),
    'State History': history.map((snapshot, index) => ({
      key: `#${index + 1}  ${new Date(snapshot.timestamp).toLocaleTimeString()}`,
      value: diffSnapshotValues(history[index + 1]?.values ?? {}, snapshot.values),
    })),
  }
}
