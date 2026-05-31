export interface ComposableInstance {
  id: string
  name: string
  file: string

  createdAt: number

  state: unknown
  dependencyIds?: Set<string> | null
  parentId?: string | null
}
