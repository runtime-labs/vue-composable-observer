import { version, initComposableObserver, trackComposable, runWithOwner } from '@goranton/vue-composable-observer-core'
import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'

initComposableObserver()
createApp(App).mount('#app')

const useCounter = trackComposable('useCounter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment,
  }
})

runWithOwner(
  'ComponentA',
  () => {
    useCounter()
  },
)


console.log('Vue Composable Observer version:', version)