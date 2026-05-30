let currentOwnerId: string | null = null

export function setCurrentOwner(id: string | null) {
    currentOwnerId = id
}

export function getCurrentOwner() {
    return currentOwnerId
}
