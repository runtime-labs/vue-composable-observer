import { describe, expect, it } from 'vitest'

import {
  clearInstances,
  trackComposable,
} from '@goranton/vue-composable-observer-core'

import { buildInspectorTree } from '../../src/vue/devtools/build-inspector-tree'

describe('buildInspectorTree', () => {
  it('builds dependency tree', () => {
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

    const tree = buildInspectorTree()

    expect(tree).toHaveLength(1)

    expect(tree[0]?.label).toBe(
      'useProducts',
    )

    expect(
      tree[0]?.children[0]?.label,
    ).toBe('useAuth')

    expect(
      tree[0]?.children[0]?.children[0]?.label,
    ).toBe('useStorage')
  })

  it('returns empty array when no composables exist', () => {
    clearInstances()

    expect(
      buildInspectorTree(),
    ).toEqual([])
  })

  it('supports case insensitive search', () => {
    clearInstances()

    const useStorage = trackComposable(
      'useStorage',
      () => ({}),
    )

    useStorage()

    const tree = buildInspectorTree(
      'STORAGE',
    )

    expect(tree).toHaveLength(1)

    expect(
      tree[0]?.label,
    ).toBe('useStorage')
  })

  it('returns empty array when filter does not match', () => {
    clearInstances()

    const useStorage = trackComposable(
      'useStorage',
      () => ({}),
    )

    useStorage()

    expect(
      buildInspectorTree('foobar'),
    ).toEqual([])
  })
})