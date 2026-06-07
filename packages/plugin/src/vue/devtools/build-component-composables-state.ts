import { getInstances } from '@runtime-labs/observer-core'

export const COMPONENTS_INSPECTOR_ID = 'components'

/**
 * Vue Devtools formats component node ids as `${appId}:${uid}` (or
 * `${appId}:root` for the app root), matching `instance.uid` — the same
 * uid stored in `ComposableInstance.component.uid`. This isn't part of the
 * typed `@vue/devtools-api` surface, but it's the same convention Pinia and
 * Vue Router rely on to inject their own state into the Components panel.
 */
function getComponentUid(nodeId: string): number | null {
  const id = nodeId.split(':').pop()

  // Vue Devtools encodes the app root node as `${appId}:root` rather than
  // its numeric uid. The root is always the first component instance Vue
  // creates on the page, so its `instance.uid` — and the `component.uid`
  // recorded by trackComposable — is always 0.
  if (id === 'root') {
    return 0
  }

  const uid = Number(id)

  return Number.isNaN(uid) ? null : uid
}

/**
 * The Components panel renders its State view as a flat list of entries
 * (each carrying its own `type`, e.g. `setup`, `props`, `data`) and groups
 * them visually by that `type`. There's no separate place to render extra
 * named groups — Pinia and Vue Router inject their own state the same way:
 * by appending entries with a custom `type` to that flat list.
 */
export function buildComponentComposablesState(nodeId: string) {
  const uid = getComponentUid(nodeId)

  if (uid === null) {
    return null
  }

  const composables = getInstances().filter(
    instance => !instance.parentId && instance.component?.uid === uid,
  )

  if (composables.length === 0) {
    return null
  }

  return composables.map(instance => ({
    key: instance.name,
    value: instance.state,
    type: 'Composables',
    editable: false,
  }))
}
