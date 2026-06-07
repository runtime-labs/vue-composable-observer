import { describe, expect, it } from 'vitest'
import { diffSnapshotValues } from '../../src/vue/devtools/diff-snapshot-values'

describe('diffSnapshotValues', () => {
  it('reports only keys whose values changed', () => {
    expect(
      diffSnapshotValues({ count: 1, name: 'a' }, { count: 2, name: 'a' }),
    ).toEqual({
      count: { from: 1, to: 2 },
    })
  })

  it('reports added and removed keys', () => {
    expect(
      diffSnapshotValues({ count: 1 }, { name: 'a' }),
    ).toEqual({
      count: { from: 1, to: undefined },
      name: { from: undefined, to: 'a' },
    })
  })

  it('treats deeply equal objects as unchanged', () => {
    expect(
      diffSnapshotValues({ list: [1, 2] }, { list: [1, 2] }),
    ).toEqual({})
  })

  it('returns an empty diff for identical snapshots', () => {
    expect(
      diffSnapshotValues({ count: 1 }, { count: 1 }),
    ).toEqual({})
  })
})
