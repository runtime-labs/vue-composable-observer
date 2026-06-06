export function isDev() {
  if (typeof import.meta !== 'undefined' && import.meta.env != null) {
    return import.meta.env.DEV === true
  }
  return typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production'
}
