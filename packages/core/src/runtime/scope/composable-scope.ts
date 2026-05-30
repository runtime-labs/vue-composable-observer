let currentComposableId: string | null = null

function setCurrentComposable(id: string | null) {
  currentComposableId = id
}

export function getCurrentComposable() {
  return currentComposableId
}

export function runWithComposable<T>(composableId: string | null, fn: () => T): T {
  const previousComposable = getCurrentComposable()

  setCurrentComposable(composableId)

  try {
    return fn()
  } finally {
    setCurrentComposable(previousComposable)
  }
}
