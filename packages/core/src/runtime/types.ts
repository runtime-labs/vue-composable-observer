export interface ComposableInstance {
    id: string
    name: string

    createdAt: number

    state: unknown
    ownerId?: string | null
}