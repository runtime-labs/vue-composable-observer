import { describe, expect, it } from 'vitest'

import { findComposables } from '../../src/unplugin/find-composables'

describe('findComposables', () => {
  it('finds exported function declarations', () => {
    const result = findComposables(`
      export function useAuth() {
        return {}
      }
    `)

    expect(result).toHaveLength(1)

    expect(result[0]?.name).toBe(
      'useAuth',
    )
  })

  it('finds exported arrow functions', () => {
    const result = findComposables(`
      export const useAuth = () => {
        return {}
      }
    `)

    expect(result).toHaveLength(1)

    expect(result[0]?.name).toBe(
      'useAuth',
    )
  })

  it('finds exported function expressions', () => {
    const result = findComposables(`
      export const useAuth = function () {
        return {}
      }
    `)

    expect(result).toHaveLength(1)

    expect(result[0]?.name).toBe(
      'useAuth',
    )
  })

  it('ignores defineStore exports', () => {
    const result = findComposables(`
      export const useAuth = defineStore(
        'auth',
        () => ({})
      )
    `)

    expect(result).toHaveLength(0)
  })

  it('ignores non function exports', () => {
    const result = findComposables(`
      export const useAuth = {}
    `)

    expect(result).toHaveLength(0)
  })

  it('ignores functions without use prefix', () => {
    const result = findComposables(`
      export function auth() {
        return {}
      }

      export const storage = () => {
        return {}
      }
    `)

    expect(result).toHaveLength(0)
  })

  it('finds multiple composables', () => {
    const result = findComposables(`
      export function useAuth() {
        return {}
      }

      export const useProducts = () => {
        return {}
      }
    `)

    expect(result).toHaveLength(2)

    expect(
      result.map(item => item.name),
    ).toEqual([
      'useAuth',
      'useProducts',
    ])
  })
})
