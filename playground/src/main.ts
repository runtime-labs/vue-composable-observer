import { version } from '@runtime-labs/observer-core'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ComposableObserverVuePlugin } from '@runtime-labs/composable-plugin/vue'

createApp(App)
  .use(ComposableObserverVuePlugin)
  .mount('#app')

console.log('Vue Composable Observer version:', version)
