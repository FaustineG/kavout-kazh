<template>
  <div @mouseenter="onHover" @mouseleave="onHoverLeave">
    <div class="tooltip" v-show="tooltipVisible">{{ tooltipText }}</div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ tooltipText: string }>()

const tooltipVisible = ref(false)

const onHover = () => {
  if (props.tooltipText) tooltipVisible.value = true
}

const onHoverLeave = () => {
  tooltipVisible.value = false
}
</script>

<style>
.tooltip {
  position: fixed;
  background: var(--bulma-background);
  padding: 10px;
  border: 1px solid var(--bulma-border);
  border-radius: var(--bulma-border-radius);
}
</style>
