import { getCurrentOwner, setCurrentOwner } from "../owner"

export function runWithOwner<T>(ownerId: string | null, fn: () => T): T {
    const previousOwner = getCurrentOwner()
 
    setCurrentOwner(ownerId)
    
    try {
        return fn()
    } finally {
        setCurrentOwner(previousOwner)
    }
}
