import { version, initComposableObserver, createInstance, registerComposable } from '@goranton/vue-composable-observer-core'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

initComposableObserver()
createApp(App).mount('#app')

console.log(
    'Creating a test instance:',
    createInstance('test', {
        state: {
            count: 0,
        }
    })
)

console.log(
    'Registering a test instance:',
    registerComposable('test2', {
        state: {
            count: 0,
        }
    })
)

console.log('Vue Composable Observer version:', version)