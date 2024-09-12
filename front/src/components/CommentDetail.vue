<template>
  <TooltipDetail :tooltip-text="comment">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      :class="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-message-circle"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  </TooltipDetail>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TooltipDetail from './TooltipDetail.vue'

const props = defineProps<{ comment: string }>()

const color = computed(() => (props.comment ? 'visible' : 'disabled'))
</script>

<style lang="scss" scoped>
.visible {
  stroke: var(--bulma-text-strong);
}

.disabled {
  stroke: var(--bulma-text-disabled);
}
</style>
