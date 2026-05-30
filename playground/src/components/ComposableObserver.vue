<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

const instances = ref<unknown[]>([])

let unsubscribe: (() => void) | undefined

const instanceMap = computed(() => {
    return new Map(
        instances.value.map((instance: any) => [instance.id, instance])
    )
})

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

    <div>
        Instances ids

        <ul>
            <li
                v-for="instance in instances"
                :key="instance.id"
            >
                {{ instance.id }} - {{ instance.name }}
            </li>
        </ul>
    </div>

    <div
  v-for="instance in instances"
  :key="instance.id"
>
  <h3>{{ instance.name }}</h3>

  <div
    v-if="instance.dependencyIds?.size"
  >
    Dependencies:

    <ul>
      <li
        v-for="dependencyId in instance.dependencyIds"
        :key="dependencyId"
      >
        {{ dependencyId }} -
        {{ instanceMap.get(dependencyId)?.name }}
      </li>
    </ul>
  </div>

  <pre>{{ instance.state }}</pre>
</div>
  </div>
</template>
