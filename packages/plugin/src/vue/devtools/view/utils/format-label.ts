export function formatLabel(
  name: string,
  file?: string,
) {
  return file
    ? `${name} (${file})`
    : name
}
