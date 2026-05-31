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
      'tests.ts',
      () => ({}),
    )

    const useAuth = trackComposable(
      'useAuth',
      'tests.ts',
      () => {
        useStorage()

        return {}
      },
    )

    const useProducts = trackComposable(
      'useProducts',
      'tests.ts',
      () => {
        useAuth()

        return {}
      },
    )

    useProducts()

    const tree = buildInspectorTree()

    expect(tree).toHaveLength(1)

    expect(tree[0]?.label).toBe(
      'useProducts (tests.ts)',
    )

    expect(
      tree[0]?.children[0]?.label,
    ).toBe('useAuth (tests.ts)')

    expect(
      tree[0]?.children[0]?.children[0]?.label,
    ).toBe('useStorage (tests.ts)')
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
      'tests.ts',
      () => ({}),
    )

    useStorage()

    const tree = buildInspectorTree(
      'STORAGE',
    )

    expect(tree).toHaveLength(1)

    expect(
      tree[0]?.label,
    ).toBe('useStorage (tests.ts)')
  })

  it('returns empty array when filter does not match', () => {
    clearInstances()

    const useStorage = trackComposable(
      'useStorage',
      'tests.ts',
      () => ({}),
    )

    useStorage()

    expect(
      buildInspectorTree('foobar'),
    ).toEqual([])
  })
})
