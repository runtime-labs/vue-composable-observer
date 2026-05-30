import {Plugin} from "vue"
import { initComposableObserver } from '@goranton/vue-composable-observer-core'

export const ComposableObserverVuePlugin: Plugin = {
    install(app) {
        initComposableObserver()

        // todo
    }
}