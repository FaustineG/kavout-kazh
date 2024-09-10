<template>
  <h1>History</h1>

  <table v-if="!isLoading && historyActions">
    <thead>
      <td>Nom</td>
      <td>From</td>
      <td>To</td>
      <td>When</td>
      <td>By</td>
      <td>Comment</td>
    </thead>
    <tbody>
      <tr v-for="historyAction in historyActions" :key="historyAction.id">
        <td>{{ historyAction.action.cat }}</td>
        <td>{{ historyAction.action.from }}</td>
        <td>{{ historyAction.action.to }}</td>
        <td>{{ formatDate(historyAction.timestamp) }}</td>
        <td>{{ historyAction.action.by }}</td>
        <td>{{ historyAction.action.comment }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { HistoryAction } from '@/models/cat'
import { getHistoryActions } from '@/services/api'
import { formatDate } from '@/services/date'
import { onMounted, ref } from 'vue'

const isLoading = ref(false)
const historyActions = ref<HistoryAction[]>([])

onMounted(async () => {
  isLoading.value = true
  try {
    historyActions.value = await getHistoryActions()
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
