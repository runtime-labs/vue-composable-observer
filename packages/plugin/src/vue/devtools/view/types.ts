export type InspectorView =
  | 'tree'
  | 'component'
  | 'flat'

export type Tag = {
  label: string
  textColor: number
  backgroundColor: number
  tooltip?: string
}

export type Node = {
  id: string
  label: string
  tags?: Tag[]
  children: Node[]
}

export interface TreeBuilder {
  id: string
  label: string

  build(): Node[]
}
