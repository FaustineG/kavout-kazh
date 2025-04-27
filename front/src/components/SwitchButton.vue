<template>
  <button class="switch-button" @click="emits('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  </button>
</template>

<script setup lang="ts">
const emits = defineEmits<{ click: [] }>()
</script>

<style scoped lang="scss">
.switch-button {
  position: absolute;
  right: 20%;
  top: 45%;
  padding: 20px;
  svg {
    height: 50px;
    width: 50px;
  }
}
@media screen and (max-width: 600px) {
  .switch-button {
    right: 0;
  }
}
</style>
