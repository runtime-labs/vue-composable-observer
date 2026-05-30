import { describe, expect, it } from 'vitest'

import {
  clearInstances,
  getInstances,
  trackComposable,
} from '../src'

describe('dependencies', () => {
  it('tracks nested composable dependencies', () => {
    clearInstances()

    const useAuth = trackComposable(
      'useAuth',
      () => ({}),
    )

    const useProducts = trackComposable(
      'useProducts',
      () => {
        const auth = useAuth()

        return { auth }
      },
    )

    const { instance: products } = useProducts()

    const auth = getInstances().find(
      item => item.name === 'useAuth',
    )

    const updatedProducts = getInstances().find(
      item => item.id === products.id,
    )

    expect(auth).toBeDefined()

    expect(
      updatedProducts?.dependencyIds?.has(auth!.id),
    ).toBe(true)
  })

  it('tracks deep dependency chains', () => {
    clearInstances()

    const useStorage = trackComposable(
      'useStorage',
      () => ({}),
    )

    const useAuth = trackComposable(
      'useAuth',
      () => {
        useStorage()

        return {}
      },
    )

    const useProducts = trackComposable(
      'useProducts',
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

    expect(products).toBeDefined()
    expect(auth).toBeDefined()
    expect(storage).toBeDefined()

    expect(
      products?.dependencyIds?.has(auth!.id),
    ).toBe(true)

    expect(
      auth?.dependencyIds?.has(storage!.id),
    ).toBe(true)
  })
})
