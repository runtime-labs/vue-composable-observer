import { effectScope } from 'vue'
import { describe, expect, it } from 'vitest'

import { clearInstances, getInstances, trackComposable } from '../src'

describe('dependencies', () => {
  it('tracks nested composable dependencies', () => {
    clearInstances()

    const useAuth = trackComposable('useAuth', 'test.js', () => ({}))

    const useProducts = trackComposable('useProducts','test.js', () => {
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

    const useStorage = trackComposable('useStorage', 'test.js', () => ({}))

    const useAuth = trackComposable('useAuth', 'test.js', () => {
      useStorage()

      return {}
    })

    const useProducts = trackComposable('useProducts', 'test.js', () => {
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

    const useAuth = trackComposable('useAuth',  'test.js', () => ({}))

    const useProducts = trackComposable('useProducts',  'test.js', () => {
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

    const useAuth = trackComposable('useAuth', 'test.js', () => ({}))

    const useProducts = trackComposable('useProducts', 'test.js', () => {
      useAuth()
      useAuth()

      return {}
    })

    useProducts()

    const products = getInstances().find(item => item.name === 'useProducts')

    expect(products).toBeDefined()
    expect(products?.dependencyIds?.size).toBe(2)
  })

  it('assigns parent id for nested composables', () => {
    clearInstances()

    const useAuth = trackComposable(
      'useAuth',
      'test.js',
      () => ({}),
    )

    const useProducts = trackComposable(
      'useProducts',
      'test.js',
      () => {
        useAuth()

        return {}
      },
    )

    useProducts()

    const products = getInstances().find(
      item => item.name === 'useProducts',
    )

    const auth = getInstances().find(
      item => item.name === 'useAuth',
    )

    expect(products).toBeDefined()
    expect(auth).toBeDefined()

    expect(auth?.parentId).toBe(products?.id)
  })

  it('does not assign parent id for root composables', () => {
    clearInstances()

    const useProducts = trackComposable(
      'useProducts',
      'test.js',
      () => ({}),
    )

    useProducts()

    const products = getInstances().find(
      item => item.name === 'useProducts',
    )

    expect(products?.parentId).toBeNull()
  })

  it('tracks parent chain for deep dependencies', () => {
    clearInstances()

    const useStorage = trackComposable(
      'useStorage',
      'test.js',
      () => ({}),
    )

    const useAuth = trackComposable(
      'useAuth',
      'test.js',
      () => {
        useStorage()

        return {}
      },
    )

    const useProducts = trackComposable(
      'useProducts',
      'test.js',
      () => {
        useAuth()

        return {}
      },
    )

    useProducts()

    const products = getInstances().find(
      item => item.name === 'useProducts',
    )

    const auth = getInstances().find(
      item => item.name === 'useAuth',
    )

    const storage = getInstances().find(
      item => item.name === 'useStorage',
    )

    expect(auth?.parentId).toBe(products?.id)

    expect(storage?.parentId).toBe(auth?.id)
  })

  it('assigns correct parent for multiple dependency instances', () => {
    clearInstances()

    const useAuth = trackComposable(
      'useAuth',
      'test.js',
      () => ({}),
    )

    const useProducts = trackComposable(
      'useProducts',
      'test.js',
      () => {
        useAuth()
        useAuth()

        return {}
      },
    )

    useProducts()

    const products = getInstances().find(
      item => item.name === 'useProducts',
    )

    const authInstances = getInstances().filter(
      item => item.name === 'useAuth',
    )

    expect(authInstances).toHaveLength(2)

    authInstances.forEach((auth) => {
      expect(auth.parentId).toBe(products?.id)
    })
  })
})
