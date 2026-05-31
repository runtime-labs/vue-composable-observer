import { nextTick, type App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { DEVTOOLS_META } from './meta'
import { buildInspectorState } from './build-inspector-state'
import { buildInspectorTree } from './build-inspector-tree'
import { subscribe } from '@goranton/vue-composable-observer-core'

type ObserverEvent = Parameters<Parameters<typeof subscribe>[0]>[0]['type']

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
      const stateUpdatedEvents: ObserverEvent[] = [
        'instance:stateUpdated',
        'instance:dependencyRegistered'
      ] 

      const treeUpdatedEvents: ObserverEvent[] = [
        'instance:cleared',
        'instance:registered',
        'instance:unregistered'
      ]

      api.addInspector({
        id: INSPECTOR_ID,
        label: INSPECTOR_LABEL,
        icon: 'storage',
      })

      subscribe(async (event) => {
        await nextTick()

        if (stateUpdatedEvents.includes(event.type)) {
          api.sendInspectorState(INSPECTOR_ID)
        
          return
        }

        if (treeUpdatedEvents.includes(event.type)) {
          api.sendInspectorTree(INSPECTOR_ID)
          
          return
        }
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
            payload.rootNodes = buildInspectorTree(
              payload.filter
            )
          }
        },
      )
    },
  )
}
