<script setup lang="ts">
import ComposableObserver from './components/ComposableObserver.vue'
import { useDeepCounter } from './useCounter'

const { nested: { count } } = useDeepCounter()
</script>

<template>
  <ComposableObserver />

  <h1>Counter:  {{ count }}</h1>
  <button @click="count++">Increment</button>

</template>
