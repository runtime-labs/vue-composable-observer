import { type App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { DEVTOOLS_META } from './meta'
import { buildInspectorState } from './build-inspector-state'
import { buildInspectorTree } from './build-inspector-tree'

export function setupComposableObserverDevtools(
  app: App,
) {
  const INSPECTOR_ID =
    'vue-composable-observer'

  const INSPECTOR_LABEL =
    'Composable Observer'

  setupDevtoolsPlugin(
    {
      ...DEVTOOLS_META,
      app,
    },
    (api) => {
      api.addInspector({
        id: INSPECTOR_ID,
        label: INSPECTOR_LABEL,
        icon: 'storage',
      })

      api.on.getInspectorState(
        (payload) => {
          if (payload.inspectorId === INSPECTOR_ID) {
            payload.state = buildInspectorState(payload.nodeId)
          }
        },
      )

      api.on.getInspectorTree(
        (payload) => {
          if (payload.inspectorId === INSPECTOR_ID) {
            payload.rootNodes = buildInspectorTree()
          }
        },
      )
    },
  )



}
