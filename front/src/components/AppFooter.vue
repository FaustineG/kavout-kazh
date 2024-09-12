<template>
  <footer>
    Copryight <span @click="onRickRoll" class="rickroll">FofoCorp©</span> 2024 v.{{ version }}
  </footer>
</template>

<script setup lang="ts">
import { version } from '../../package.json'

const onRickRoll = () => {
  window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=xiJxBnXJ5CTRkBhU'
}
</script>

<style scoped lang="scss">
footer {
  min-height: var(--footer-height);
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--bulma-border);
  background: var(--bulma-background);

  padding: 10px 0;
}

.rickroll {
  color: var(--bulma-font-color);
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
