<script setup lang="ts">
import ComposableObserver from './components/ComposableObserver.vue'
import { trackComposable } from '@goranton/vue-composable-observer-core'
import { ref, onMounted } from 'vue'

const useCounter = trackComposable(
  'useCounter',
  () => {
    const count = ref(0)

    return {
      count,
    }
  },
)

const {count} = useCounter()

</script>

<template>
  <ComposableObserver />

  <h1>Counter:  {{ count }}</h1>
  <button @click="count++">Increment</button>

</template>
