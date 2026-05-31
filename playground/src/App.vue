<script setup lang="ts">
import { useProducts } from './composables/useProducts'
import { useAuth } from './composables/useAuth'

const { products } = useProducts()
const { count, isLoggedIn } = useAuth()
</script>

<template>
  <div class="app">
    <h1>Vue Composable Observer Playground</h1>

    <section class="card">
      <h2>Storage</h2>

      <p>
        Count:
        <strong>
          {{ count }}
        </strong>
      </p>

      <button @click="count++">
        Increment
      </button>

      <button @click="count--">
        Decrement
      </button>
    </section>

    <section class="card">
      <h2>Authentication</h2>

      <p>
        Logged in:
        <strong>
          {{ isLoggedIn }}
        </strong>
      </p>
    </section>

    <section class="card">
      <h2>Products</h2>

      <ul>
        <li
          v-for="product in products"
        >
          {{ product }}
        </li>
      </ul>
    </section>

    <section class="card">
      <h2>DevTools Demo</h2>

      <p>
        Open Vue DevTools and inspect:
      </p>

      <ul>
        <li>Composable Runtime</li>
        <li>Composable Components</li>
        <li>Composable Flat</li>
      </ul>
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