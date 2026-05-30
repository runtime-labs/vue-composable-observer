import { version } from '@goranton/vue-composable-observer-core'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ComposableObserverVuePlugin } from '@goranton/vue-composable-observer-vue'

createApp(App).use(ComposableObserverVuePlugin).mount('#app')

console.log('Vue Composable Observer version:', version)
