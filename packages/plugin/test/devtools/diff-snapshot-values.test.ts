import { describe, expect, it } from 'vitest'
import { diffSnapshotValues } from '../../src/vue/devtools/diff-snapshot-values'

describe('diffSnapshotValues', () => {
  it('reports only keys whose values changed', () => {
    expect(
      diffSnapshotValues({ count: 1, name: 'a' }, { count: 2, name: 'a' }),
    ).toEqual({
      count: '1 → 2',
    })
  })

  it('reports added and removed keys', () => {
    expect(
      diffSnapshotValues({ count: 1 }, { name: 'a' }),
    ).toEqual({
      count: '1 → undefined',
      name: 'undefined → a',
    })
  })

  it('drills into nested objects and reports only the changed leaf path', () => {
    expect(
      diffSnapshotValues(
        { user: { profile: { name: 'a', age: 30 } } },
        { user: { profile: { name: 'b', age: 30 } } },
      ),
    ).toEqual({
      'user.profile.name': 'a → b',
    })
  })

  it('treats arrays as leaf values rather than recursing by index', () => {
    expect(
      diffSnapshotValues({ list: [1, 2] }, { list: [1, 2, 3] }),
    ).toEqual({
      list: '[1,2] → [1,2,3]',
    })
  })

  it('treats deeply equal values as unchanged', () => {
    expect(
      diffSnapshotValues({ list: [1, 2], user: { name: 'a' } }, { list: [1, 2], user: { name: 'a' } }),
    ).toEqual({})
  })

  it('returns an empty diff for identical snapshots', () => {
    expect(
      diffSnapshotValues({ count: 1 }, { count: 1 }),
    ).toEqual({})
  })
})
