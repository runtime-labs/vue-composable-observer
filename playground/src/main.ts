import { version, initComposableObserver, trackComposable } from '@goranton/vue-composable-observer-core'
import { createApp, ref, effectScope } from 'vue'
import './style.css'
import App from './App.vue'

initComposableObserver()
createApp(App).mount('#app')

const useAuth = trackComposable('useAuth', () => {
  const user = ref<{ name: string } | null>(null)

  function login(username: string) {
    user.value = { name: username }
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    login,
    logout,
  }
})

const useCounter = trackComposable('useCounter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  useAuth()

  return {
    count,
    increment,
  }
})

const scope = effectScope()
scope.run(() => {
  useCounter()
})

setTimeout(() => {
  scope.stop()
}, 5000)

console.log('Vue Composable Observer version:', version)