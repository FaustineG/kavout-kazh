<template>
  <UiLoader v-if="isLoading" />
  <div class="cats" v-else>
    <CatState v-for="cat in cats" :key="cat.cat_id" :cat="cat" @move="onMoveCat" />
  </div>
</template>

<script setup lang="ts">
import CatState from '@/components/CatState.vue'
import UiLoader from '@/components/UiLoader.vue'
import type { MoveCatPayload } from '@/models/action'
import type { Cat } from '@/models/cat'
import { getCats, moveCat } from '@/services/api'
import { onMounted, ref } from 'vue'

const cats = ref<Cat[]>([])
const isLoading = ref(false)

const loadCats = async () => {
  console.log('LOAD CATS')
  isLoading.value = true
  try {
    cats.value = await getCats()
  } finally {
    isLoading.value = false
  }
}

onMounted(loadCats)

const onMoveCat = async (cat_id: string, payload: MoveCatPayload) => {
  console.log('MOVE CAT', payload)
  try {
    await moveCat(cat_id, {
      where_to: payload.where_to,
      comment: payload.comment,
      by_user: payload.by_user
    })
    await loadCats()
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss" scoped>
.cats {
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 100%;
  justify-content: center;
}
</style>
