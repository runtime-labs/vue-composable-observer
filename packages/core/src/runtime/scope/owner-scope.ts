let currentOwnerId: string | null = null

function setCurrentOwner(id: string | null) {
    currentOwnerId = id
}

export function getCurrentOwner() {
    return currentOwnerId
}


export function runWithOwner<T>(ownerId: string | null, fn: () => T): T {
    const previousOwner = getCurrentOwner()
 
    setCurrentOwner(ownerId)
    
    try {
        return fn()
    } finally {
        setCurrentOwner(previousOwner)
    }
}
