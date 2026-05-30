import { version, initComposableObserver } from '@goranton/vue-composable-observer-core'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

initComposableObserver()
createApp(App).mount('#app')

console.log('Vue Composable Observer version:', version)
