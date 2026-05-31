import { getInstanceById } from '@goranton/vue-composable-observer-core'

export function buildInspectorState(id: string) {
  const instance = getInstanceById(id)

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
  }
}
