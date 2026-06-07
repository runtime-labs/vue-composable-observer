function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function formatValue(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value)
}

function collectDiff(
  previous: unknown,
  current: unknown,
  path: string,
  diff: Record<string, string>,
) {
  if (JSON.stringify(previous) === JSON.stringify(current)) {
    return
  }

  if (isPlainObject(previous) && isPlainObject(current)) {
    const keys = new Set([...Object.keys(previous), ...Object.keys(current)])

    for (const key of keys) {
      collectDiff(previous[key], current[key], path ? `${path}.${key}` : key, diff)
    }

    return
  }

  diff[path] = `${formatValue(previous)} → ${formatValue(current)}`
}

export function diffSnapshotValues(
  previous: Record<string, unknown>,
  current: Record<string, unknown>,
): Record<string, string> {
  const diff: Record<string, string> = {}

  collectDiff(previous, current, '', diff)

  return diff
}
