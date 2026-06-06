<script setup lang="ts">
import { ref } from 'vue'
import { useProducts } from './composables/useProducts'
import { useAuth } from './composables/useAuth'
import DemoWidget from './components/DemoWidget.vue'

const { products } = useProducts()
const { count, isLoggedIn } = useAuth()
const showWidget = ref(true)
</script>

<template>
  <div class="app">
    <h1>Vue Composable Observer Playground</h1>
    <p class="hint">Open Vue DevTools → Composable Observer to inspect the tree</p>

    <section class="card">
      <h2>Storage</h2>
      <p>Count: <strong>{{ count }}</strong></p>
      <button @click="count++">+1</button>
      <button @click="count--">-1</button>
    </section>

    <section class="card">
      <h2>Authentication</h2>
      <p>Logged in: <strong>{{ isLoggedIn }}</strong></p>
    </section>

    <section class="card">
      <h2>Products</h2>
      <ul>
        <li v-for="product in products" :key="product">{{ product }}</li>
      </ul>
    </section>

    <section class="card">
      <h2>Dynamic Component</h2>
      <p>Toggle to see composable instances appear and disappear in DevTools.</p>
      <button @click="showWidget = !showWidget">
        {{ showWidget ? 'Unmount' : 'Mount' }} DemoWidget
      </button>
      <DemoWidget v-if="showWidget" />
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  font-family: sans-serif;
}
.hint {
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
}
.card {
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
button {
  margin-right: 8px;
}
</style>
