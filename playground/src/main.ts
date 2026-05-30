import { version, initComposableObserver, createInstance } from '@goranton/vue-composable-observer-core'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

initComposableObserver()
createApp(App).mount('#app')

console.log(
    createInstance('test', {
        state: {
            count: 0,
        }
    })
)

console.log('Vue Composable Observer version:', version)