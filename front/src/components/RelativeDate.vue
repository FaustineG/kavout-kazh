<template>
  <TooltipDetail :tooltip-text="formatDate(timestamp)">
    il y a {{ formatRelativeDate(timestamp) }}
  </TooltipDetail>
</template>

<script setup lang="ts">
import { formatDate, formatRelativeDate } from '@/services/date'
import TooltipDetail from './TooltipDetail.vue'

defineProps<{ timestamp: string }>()
</script>
