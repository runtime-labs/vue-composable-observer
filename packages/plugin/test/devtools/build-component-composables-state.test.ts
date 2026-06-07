import { afterEach, describe, expect, it } from 'vitest'
import { clearInstances, registerInstance } from '@runtime-labs/observer-core'
import { buildComponentComposablesState } from '../../src/vue/devtools/build-component-composables-state'

afterEach(() => {
  clearInstances()
})

describe('buildComponentComposablesState', () => {
  it('returns null when the node id has no parsable uid', () => {
    expect(buildComponentComposablesState('1:foo')).toBeNull()
  })

  it('treats the app root node id as uid 0', () => {
    registerInstance({
      id: 'a',
      name: 'useAuth',
      file: '/src/composables/useAuth.ts',
      createdAt: 0,
      state: { count: 1 },
      component: { uid: 0, name: 'App' },
    })

    expect(buildComponentComposablesState('1:root')).toEqual([
      { key: 'useAuth', value: { count: 1 }, type: 'Composables', editable: false },
    ])
  })

  it('returns null when no composables belong to the matched component', () => {
    registerInstance({
      id: 'a',
      name: 'useAuth',
      file: '/src/composables/useAuth.ts',
      createdAt: 0,
      state: { count: 1 },
      component: { uid: 1, name: 'App' },
    })

    expect(buildComponentComposablesState('1:2')).toBeNull()
  })

  it('lists top-level composables of the matched component by uid', () => {
    registerInstance({
      id: 'a',
      name: 'useAuth',
      file: '/src/composables/useAuth.ts',
      createdAt: 0,
      state: { count: 1 },
      component: { uid: 42, name: 'App' },
    })

    registerInstance({
      id: 'b',
      name: 'useStorage',
      file: '/src/composables/useStorage.ts',
      createdAt: 0,
      state: { value: 'x' },
      parentId: 'a',
      component: { uid: 42, name: 'App' },
    })

    registerInstance({
      id: 'c',
      name: 'useProducts',
      file: '/src/composables/useProducts.ts',
      createdAt: 0,
      state: { items: [] },
      component: { uid: 7, name: 'Other' },
    })

    expect(buildComponentComposablesState('1:42')).toEqual([
      { key: 'useAuth', value: { count: 1 }, type: 'Composables', editable: false },
    ])
  })
})
