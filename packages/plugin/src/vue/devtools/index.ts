import { type App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'

import { DEVTOOLS_META } from './meta'
import { buildInspectorState } from './build-inspector-state'

import { subscribe } from '@runtime-labs/observer-core'

import {
  buildComponentTree,
  buildFlatTree,
  buildRuntimeTree,
} from './view'

import { debounce } from './../../utils/debounce'

export function setupComposableObserverDevtools(
  app: App,
) {
  const RUNTIME_INSPECTOR_ID =
    '@runtime-labs/composable-runtime'

  const COMPONENT_INSPECTOR_ID =
    '@runtime-labs/composable-component'

  const FLAT_INSPECTOR_ID =
    '@runtime-labs/composable-flat'

  const INSPECTORS = [
    RUNTIME_INSPECTOR_ID,
    COMPONENT_INSPECTOR_ID,
    FLAT_INSPECTOR_ID,
  ] as const

  type InspectorId =
    typeof INSPECTORS[number]

  let activeInspectorId:
    | InspectorId
    | null = null

  function isInspector(
    inspectorId: string,
  ): inspectorId is InspectorId {
    return INSPECTORS.includes(
      inspectorId as InspectorId,
    )
  }

  function buildTree(
    inspectorId: InspectorId,
  ) {
    switch (inspectorId) {
      case RUNTIME_INSPECTOR_ID:
        return buildRuntimeTree()

      case COMPONENT_INSPECTOR_ID:
        return buildComponentTree()

      case FLAT_INSPECTOR_ID:
        return buildFlatTree()
    }
  }

  setupDevtoolsPlugin(
    {
      ...DEVTOOLS_META,
      app,
    },
    (api) => {
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

      const refreshTree = debounce(() => {
        if (!activeInspectorId) {
          return
        }

        api.sendInspectorTree(
          activeInspectorId,
        )
      }, 50)

      const refreshState = debounce(() => {
        if (!activeInspectorId) {
          return
        }

        api.sendInspectorState(
          activeInspectorId,
        )
      }, 50)

      subscribe((event) => {
        switch (event.type) {
          case 'instance:registered':
          case 'instance:unregistered':
          case 'instance:cleared':
            refreshTree()
            break

          case 'instance:stateUpdated':
            refreshState()
            break
        }
      })

      api.on.getInspectorTree(
        (payload) => {
          if (!isInspector(payload.inspectorId)) {
            return
          }

          activeInspectorId =
            payload.inspectorId

          payload.rootNodes = buildTree(
            payload.inspectorId,
          )
        },
      )

      api.on.getInspectorState(
        (payload) => {
          if (!isInspector(payload.inspectorId)) {
            return
          }

          activeInspectorId =
            payload.inspectorId

          payload.state = buildInspectorState(
            payload.nodeId,
          )
        },
      )
    },
  )
}
