import { effectScope } from 'vue'
import { describe, expect, it } from 'vitest'

import { clearInstances, getInstances, trackComposable } from '../src'

describe('dependencies', () => {
  it('tracks nested composable dependencies', () => {
    clearInstances()

    const useAuth = trackComposable('useAuth', () => ({}))

    const useProducts = trackComposable('useProducts', () => {
      const auth = useAuth()

      return { auth }
    })

    useProducts()

    const products = getInstances().find(item => item.name === 'useProducts')
    const auth = getInstances().find(item => item.name === 'useAuth')

    expect(products).toBeDefined()
    expect(auth).toBeDefined()
    expect(products?.dependencyIds?.has(auth!.id)).toBe(true)
  })

  it('tracks deep dependency chains', () => {
    clearInstances()

    const useStorage = trackComposable('useStorage', () => ({}))

    const useAuth = trackComposable('useAuth', () => {
      useStorage()

      return {}
    })

    const useProducts = trackComposable('useProducts', () => {
      useAuth()

      return {}
    })

    useProducts()

    const products = getInstances().find(item => item.name === 'useProducts')
    const auth = getInstances().find(item => item.name === 'useAuth')
    const storage = getInstances().find(item => item.name === 'useStorage')

    expect(products).toBeDefined()
    expect(auth).toBeDefined()
    expect(storage).toBeDefined()

    expect(products?.dependencyIds?.has(auth!.id)).toBe(true)
    expect(auth?.dependencyIds?.has(storage!.id)).toBe(true)
  })

  it('removes dependency graph when scope is disposed', () => {
    clearInstances()

    const useAuth = trackComposable('useAuth', () => ({}))

    const useProducts = trackComposable('useProducts', () => {
      useAuth()

      return {}
    })

    const scope = effectScope()

    scope.run(() => {
      useProducts()
    })

    expect(getInstances()).toHaveLength(2)

    scope.stop()

    expect(getInstances()).toHaveLength(0)
  })

  it('tracks multiple instances of the same dependency', () => {
    clearInstances()

    const useAuth = trackComposable('useAuth', () => ({}))

    const useProducts = trackComposable('useProducts', () => {
      useAuth()
      useAuth()

      return {}
    })

    useProducts()

    const products = getInstances().find(item => item.name === 'useProducts')

    expect(products).toBeDefined()
    expect(products?.dependencyIds?.size).toBe(2)
  })
})
