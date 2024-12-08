<template>
  <h1 class="title">Historique</h1>
  <section>
    <HistoryTable v-if="!isLoading && historyActions" :actions="historyActions" />
  </section>
</template>

<script setup lang="ts">
import HistoryTable from '@/components/HistoryTable.vue'
import type { HistoryAction } from '@/models/action'
import { getHistoryActions } from '@/services/api'
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
section {
  display: flex;
  justify-content: center;
}
</style>
