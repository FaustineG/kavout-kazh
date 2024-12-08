<template>
  <div class="cat">
    <h2 class="title">{{ cat.name }}</h2>
    <img :src="`./img/${cat.name}.jpg`" class="cat-photo" alt="cat" />
    <template v-if="state">
      <div>
        est
        <span class="info">{{ state.where_to }}</span>
      </div>

      <div>
        depuis <span class="info">{{ formatRelativeDate(state.timestamp) }}</span>
      </div>
    </template>

    <button class="button is-primary" @click="openModal">MOVE THE CAT</button>
    <MoveCatModal v-if="isModalOpen" @close="closeModal" @move="onMoveCat" />
  </div>
</template>

<script setup lang="ts">
import MoveCatModal from './MoveCatModal.vue'
import type { MoveCatPayload } from '@/models/action'
import type { Cat } from '@/models/cat'
import type { CatState } from '@/models/state'
import { getCatState } from '@/services/api'
import { formatRelativeDate } from '@/services/date'
import { onMounted, ref } from 'vue'

const { cat } = defineProps<{ cat: Cat }>()
const emits = defineEmits<{
  move: [cat_id: string, payload: MoveCatPayload]
}>()
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const onMoveCat = (payload: { whereTo: string; comment: string; user: string }) => {
  console.log('MOVE CAT', payload, cat)
  emits('move', cat.cat_id, {
    where_to: payload.whereTo,
    comment: payload.comment,
    by_user: payload.user
  })
  closeModal()
}
const state = ref<CatState | null>()
onMounted(async () => {
  state.value = await getCatState(cat.cat_id)
})
</script>

<style lang="scss" scoped>
.cat {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 10px;
  }

  .cat-photo {
    width: 100px;
    border-radius: 50%;
  }

  .info {
    font-weight: bold;
  }
}
</style>
