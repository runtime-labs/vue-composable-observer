import { toValue } from 'vue'

export interface StateSnapshot {
  timestamp: number
  values: Record<string, unknown>
}

const HISTORY_LIMIT = 10

const histories = new Map<string, StateSnapshot[]>()

function captureValues(state: unknown): Record<string, unknown> {
  if (!state || typeof state !== 'object') return {}
  const snapshot: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(state as object)) {
    const raw = toValue(value)
    try {
      snapshot[key] = JSON.parse(JSON.stringify(raw))
    } catch {
      snapshot[key] = String(raw)
    }
  }
  return snapshot
}

export function recordSnapshot(id: string, state: unknown) {
  const history = histories.get(id) ?? []
  history.unshift({ timestamp: Date.now(), values: captureValues(state) })
  if (history.length > HISTORY_LIMIT) history.length = HISTORY_LIMIT
  histories.set(id, history)
}

export function getHistory(id: string): StateSnapshot[] {
  return histories.get(id) ?? []
}

export function clearHistory(id: string) {
  histories.delete(id)
}

export function clearAllHistory() {
  histories.clear()
}
