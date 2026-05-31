import { App } from "vue";
import { addCustomTab, setupDevtoolsPlugin } from '@vue/devtools-api'
import { DEVTOOLS_ROUTE } from "@goranton/vue-composable-observer-unplugin";

export function setupComposableObserverDevtools(
    app: App
) {
    setupDevtoolsPlugin(
        {
            id: 'composable-observer',
            label: 'Composable Observer',
            packageName: '@goranton/vue-composable-observer-vue',
            homepage: 'https://github.com/goranton/vue-composable-observer',
            app,
        },
        () => {}
    )

    addCustomTab({
        name: 'composable-observer',
        title: 'Composables',

        view: {
            type: 'iframe',
            src: DEVTOOLS_ROUTE,
        },
    })
}