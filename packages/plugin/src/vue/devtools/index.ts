import { nextTick, type App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { DEVTOOLS_META } from './meta'
import { buildInspectorState } from './build-inspector-state'
import { subscribe } from '@goranton/vue-composable-observer-core'
import { buildComponentTree, buildFlatTree, buildRuntimeTree } from './view'

type ObserverEvent = Parameters<Parameters<typeof subscribe>[0]>[0]['type']

export function setupComposableObserverDevtools(
  app: App,
) {
  const RUNTIME_INSPECTOR_ID =
  'vue-composable-observer-runtime'

  const COMPONENT_INSPECTOR_ID =
    'vue-composable-observer-component'

  const FLAT_INSPECTOR_ID =
    'vue-composable-observer-flat'

  const INSPECTORS = [
      RUNTIME_INSPECTOR_ID,
      COMPONENT_INSPECTOR_ID,
      FLAT_INSPECTOR_ID,
  ]

  function validInspector(inspectorId: string) {
    return INSPECTORS.includes(inspectorId)
  }


  function buildTree(inspectorId: string) {
    switch (inspectorId) {
      case RUNTIME_INSPECTOR_ID:
        return buildRuntimeTree()

      case COMPONENT_INSPECTOR_ID:
        return buildComponentTree()

      case FLAT_INSPECTOR_ID:
        return buildFlatTree()

      default:
        return []
    }
  }

  setupDevtoolsPlugin(
    {
      ...DEVTOOLS_META,
      app,
    },
    (api) => {
      const stateUpdatedEvents: ObserverEvent[] = [
        'instance:stateUpdated',
        'instance:dependencyRegistered',
      ]

      const treeUpdatedEvents: ObserverEvent[] = [
        'instance:cleared',
        'instance:registered',
        'instance:unregistered',
      ]

      api.addInspector({
        id: RUNTIME_INSPECTOR_ID,
        label: 'Composables',
        icon: 'storage',
      })

      api.addInspector({
        id: COMPONENT_INSPECTOR_ID,
        label: 'Composables by Component',
        icon: 'account_tree',
      })

      api.addInspector({
        id: FLAT_INSPECTOR_ID,
        label: 'Composables Flat',
        icon: 'list',
      })

      subscribe(async (event) => {
        await nextTick()

        if (stateUpdatedEvents.includes(event.type)) {
          for (const inspector of INSPECTORS) {
            api.sendInspectorState(inspector)
          }

          return
        }

        if (treeUpdatedEvents.includes(event.type)) {
          for (const inspector of INSPECTORS) {
            api.sendInspectorState(inspector)
          }

          return
        }
      })

      api.on.getInspectorState(
        (payload) => {
          if (validInspector(payload.inspectorId)) {
            payload.state = buildInspectorState(payload.nodeId)
          }
        },
      )

      api.on.getInspectorTree((payload) => {
        payload.rootNodes = buildTree(
          payload.inspectorId,
        )
      })
    },
  )
}
