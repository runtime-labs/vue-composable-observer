export interface ComposableInstance {
  id: string
  name: string

  createdAt: number

  state: unknown
  dependencyIds?: Set<string> | null
}
