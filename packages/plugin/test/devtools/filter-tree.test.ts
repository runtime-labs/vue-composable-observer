import { describe, expect, it } from 'vitest'
import { filterTree } from '../../src/vue/devtools/view/utils/filter-tree'
import { type Node } from '../../src/vue/devtools/view/types'

function node(id: string, label: string, children: Node[] = []): Node {
  return { id, label, children }
}

describe('filterTree', () => {
  const tree = [
    node('1', 'useAuth', [
      node('1.1', 'useStorage'),
    ]),
    node('2', 'useProducts', [
      node('2.1', 'useFetch'),
    ]),
  ]

  it('returns the tree unchanged for an empty filter', () => {
    expect(filterTree(tree, '')).toEqual(tree)
    expect(filterTree(tree, '   ')).toEqual(tree)
  })

  it('keeps a node and all its children when the node itself matches', () => {
    expect(filterTree(tree, 'useAuth')).toEqual([
      node('1', 'useAuth', [
        node('1.1', 'useStorage'),
      ]),
    ])
  })

  it('keeps a parent (without its other children) when only a descendant matches', () => {
    expect(filterTree(tree, 'useFetch')).toEqual([
      node('2', 'useProducts', [
        node('2.1', 'useFetch'),
      ]),
    ])
  })

  it('matches case-insensitively', () => {
    expect(filterTree(tree, 'USEPRODUCTS')).toEqual([
      node('2', 'useProducts', [
        node('2.1', 'useFetch'),
      ]),
    ])
  })

  it('drops branches with no matches at all', () => {
    expect(filterTree(tree, 'nothing-matches-this')).toEqual([])
  })
})
