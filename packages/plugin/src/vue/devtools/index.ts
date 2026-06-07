import { type App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'

import { DEVTOOLS_META } from './meta'
import { buildInspectorState } from './build-inspector-state'
import { COMPONENTS_INSPECTOR_ID, buildComponentComposablesState } from './build-component-composables-state'

import { subscribe } from '@runtime-labs/observer-core'

import {
  buildComponentTree,
  buildFlatTree,
  buildRuntimeTree,
  filterTree,
} from './view'

import { debounce } from './../../utils/debounce'

export function setupComposableObserverDevtools(
  app: App,
) {
  const RUNTIME_INSPECTOR_ID =
    'runtime-labs-composable-runtime'

  const COMPONENT_INSPECTOR_ID =
    'runtime-labs-composable-component'

  const FLAT_INSPECTOR_ID =
    'runtime-labs-composable-flat'

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
        treeFilterPlaceholder: 'Search composables',
      })

      api.addInspector({
        id: COMPONENT_INSPECTOR_ID,
        label: 'Composables by Component',
        icon: 'account_tree',
        treeFilterPlaceholder: 'Search components or composables',
      })

      api.addInspector({
        id: FLAT_INSPECTOR_ID,
        label: 'Composables Flat',
        icon: 'list',
        treeFilterPlaceholder: 'Search composables',
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

      const refreshComponentsState = debounce(() => {
        api.sendInspectorState(
          COMPONENTS_INSPECTOR_ID,
        )
      }, 50)

      subscribe((event) => {
        switch (event.type) {
          case 'instance:registered':
          case 'instance:unregistered':
          case 'instance:cleared':
            refreshTree()
            refreshComponentsState()
            break

          case 'instance:stateUpdated':
            refreshState()
            refreshComponentsState()
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

          const tree = buildTree(
            payload.inspectorId,
          )

          payload.rootNodes = payload.filter
            ? filterTree(tree, payload.filter)
            : tree
        },
      )

      api.on.getInspectorState(
        async (payload) => {
          if (payload.inspectorId === COMPONENTS_INSPECTOR_ID) {
            // The core "components" plugin's own getInspectorState handler
            // overwrites `payload.state` wholesale (`payload.state = result`)
            // rather than merging. Yielding a microtask here lets that
            // synchronous handler finish first, so our merge lands on top of
            // its result instead of being clobbered by it.
            await Promise.resolve()

            const composablesEntries = buildComponentComposablesState(
              payload.nodeId,
            )

            if (composablesEntries && payload.state) {
              payload.state.state = [
                ...payload.state.state,
                ...composablesEntries,
              ]
            }

            return
          }

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
