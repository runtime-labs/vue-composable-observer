export type SnapshotValueDiff = Record<string, { from: unknown, to: unknown }>

export function diffSnapshotValues(
  previous: Record<string, unknown>,
  current: Record<string, unknown>,
): SnapshotValueDiff {
  const keys = new Set([...Object.keys(previous), ...Object.keys(current)])
  const diff: SnapshotValueDiff = {}

  for (const key of keys) {
    if (JSON.stringify(previous[key]) !== JSON.stringify(current[key])) {
      diff[key] = { from: previous[key], to: current[key] }
    }
  }

  return diff
}
