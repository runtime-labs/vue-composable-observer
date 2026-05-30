import { version, initComposableObserver, registerInstance } from '@goranton/vue-composable-observer-core'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

initComposableObserver()
createApp(App).mount('#app')

registerInstance({
  id: 'test',
  name: 'Test Composable',
  createdAt: Date.now(),
  state: null
})

console.log('Vue Composable Observer version:', version)