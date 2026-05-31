export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 50,
) {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
