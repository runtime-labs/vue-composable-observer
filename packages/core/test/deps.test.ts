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
            () => ({})
        )

        const useProducts = trackComposable(
            'useProducts',
            () => {
                const auth = useAuth()

                return { auth }
            }
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
            updatedProducts?.dependencyIds?.has(auth!.id)
        ).toBe(true)
    })
})