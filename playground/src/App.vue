<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { getCurrentScope } from 'vue'

console.log('Current scope:', getCurrentScope())
</script>

<template>
  <HelloWorld />
</template>
