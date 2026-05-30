<script setup lang="ts">
import ComposableObserver from './components/ComposableObserver.vue'
import { useCounter } from './useCounter'

const { count } = useCounter()
</script>

<template>
  <ComposableObserver />

  <h1>Counter:  {{ count }}</h1>
  <button @click="count++">Increment</button>

</template>
