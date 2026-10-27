<template>
  <TooltipDetail :tooltip-text="formatDateForDisplay(timestamp)">
    il y a {{ formatRelativeDate(timestamp) }}
  </TooltipDetail>
</template>

<script setup lang="ts">
import { formatDateForDisplay, formatRelativeDate } from '@/services/date'
import TooltipDetail from './TooltipDetail.vue'

defineProps<{ timestamp: string }>()
</script>
