<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { useProducts } from '../composables/useProducts'

const { isLoggedIn } = useAuth()
const { products } = useProducts()
</script>

<template>
  <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-radius: 6px;">
    <strong>DemoWidget</strong> — mounted with its own composable instances
    <p>Auth: {{ isLoggedIn }} | Products: {{ products.length }}</p>
  </div>
</template>
