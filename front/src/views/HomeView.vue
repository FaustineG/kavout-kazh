<template>
  <UiLoader v-if="isLoading" />
  <div class="cats" v-else>
    <CatState v-for="cat in cats" :key="cat.cat_id" :cat="cat" @move="onMoveCat" />
  </div>
  <SwitchButton v-if="cats.length === 2" @click="onSwitchCats" />
</template>

<script setup lang="ts">
import CatState from '@/components/CatState.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import UiLoader from '@/components/UiLoader.vue'
import type { MoveCatPayload } from '@/models/action'
import type { Cat } from '@/models/cat'
import { getCats, moveCat, switchCats } from '@/services/api'
import { useUser } from '@/services/user'
import { onMounted, ref } from 'vue'

const cats = ref<Cat[]>([])
const isLoading = ref(false)
const { currentUser, loadUserLocal } = useUser()

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
      by_user: payload.by_user,
      timestamp: payload.timestamp
    })
    await loadCats()
  } catch (e) {
    console.error(e)
  }
}

const onSwitchCats = async () => {
  if (currentUser.value === '') {
    await loadUserLocal()
  }
  try {
    await switchCats({
      cats: cats.value,
      by_user: currentUser.value
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
  gap: 2em;
  height: 100%;
  justify-content: center;
}
</style>
