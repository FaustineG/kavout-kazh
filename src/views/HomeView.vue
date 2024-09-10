<template>
  <h1>Home</h1>

  <table v-if="!isLoading && currentState">
    <thead>
      <td>Nom</td>
      <td>Where</td>
      <td>From</td>
      <td>Comment</td>
    </thead>
    <tbody>
      <tr v-for="state in currentState" :key="state.cat">
        <td>{{ state.cat }}</td>
        <td>{{ state.where }}</td>
        <td>{{ formatDate(state.from) }}</td>
        <td>{{ state.comment }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { State } from '@/models/state'
import { getCurrentState } from '@/services/api'
import { formatDate } from '@/services/date'
import { onMounted, ref } from 'vue'

const currentState = ref<State[]>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    currentState.value = await getCurrentState()
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
thead {
  font-weight: bold;
}
</style>
