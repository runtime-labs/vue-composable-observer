export type InspectorView = 
  | 'tree'
  | 'component'
  | 'flat'

export type Node = {
  id: string
  label: string
  children: Node[]
}

export interface TreeBuilder {
    id: string
    label: string

    build(): Node[]
}
