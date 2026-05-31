import { type App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { getInstances } from '@goranton/vue-composable-observer-core'

export function setupComposableObserverDevtools(
  app: App,
) {
  setupDevtoolsPlugin(
    {
      id: 'composable-observer',
      label: 'Composable Observer',
      packageName: '@goranton/vue-composable-observer-vue',
      homepage: 'https://github.com/goranton/vue-composable-observer',
      app,
    },
    (api) => {
      api.addInspector({
        id: INSPECTOR_ID,
        label: INSPECTOR_LABEL,
        icon: 'storage',
      })

      api.on.getInspectorTree(
        (payload) => {
          if (
            payload.inspectorId !== INSPECTOR_ID
          ) {
            return
          }

          payload.rootNodes = getInstances()
            .map(instance => ({
              id: instance.id,
              label: instance.name,
            }))
        },
      )
    },
  )


  const INSPECTOR_ID =
    'vue-composable-observer'

  const INSPECTOR_LABEL =
    'Composable Observer'
}
