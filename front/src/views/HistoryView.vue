<template>
  <h1 class="title">Historique</h1>
  <section>
    <HistoryTable v-if="!isLoading && historyActions" :actions="historyActions" />
    <button v-if="limit !== null" @click="onViewMore" class="view-more">Charger plus</button>
  </section>
</template>

<script setup lang="ts">
import HistoryTable from '@/components/HistoryTable.vue'
import type { HistoryAction } from '@/models/action'
import { getHistoryActions } from '@/services/api'
import { onMounted, ref } from 'vue'

const isLoading = ref(false)
const historyActions = ref<HistoryAction[]>([])

const limit = ref<number | null>(20)

const loadHistory = async () => {
  isLoading.value = true
  try {
    historyActions.value = await getHistoryActions({ limit: limit.value })
  } finally {
    isLoading.value = false
  }
}

onMounted(loadHistory)
const onViewMore = () => {
  if (limit.value === 20) {
    limit.value = 50
  } else {
    limit.value = null
  }
  loadHistory()
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.view-more {
  margin-bottom: 100px;
}
</style>
