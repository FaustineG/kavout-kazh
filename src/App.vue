<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <footer>Copryight FofoCorp© 2024</footer>
</template>

<style scoped>
menu {
  display: flex;
  gap: 1em;
}

footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  border-top: 1px solid grey;
  padding: 10px 0;
}
</style>
