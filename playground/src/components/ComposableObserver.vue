<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const instances = ref<unknown[]>([])

let unsubscribe: (() => void) | undefined

onMounted(() => {
  const observer = window.__COMPOSABLE_OBSERVER__

  if (!observer) {
    return
  }

  instances.value = observer.getInstances()

  unsubscribe = observer.subscribe(() => {
    instances.value = observer.getInstances()
  })
})

onUnmounted(() => {
  unsubscribe?.()
})
</script>

<template>
  <div>
    <h2>Composable Observer</h2>

    <pre>{{ instances }}</pre>
  </div>
</template>
