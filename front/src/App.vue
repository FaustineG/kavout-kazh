<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
menu {
  display: flex;
  gap: 1em;
}

main {
  height: 100%;
  padding-top: calc(var(--header-height) + 10px);
  padding-bottom: calc(var(--footer-height) + 10px);
}
</style>
