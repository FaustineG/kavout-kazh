<template>
  <EditActionModal :user="currentUser" :title="`MOVE THAT CAT (${(cat.name)})`" @submit="onMoveCat"
    @close="emits('close')" />
</template>

<script setup lang="ts">
import { useUser } from '@/services/user'
import { onMounted, } from 'vue'
import EditActionModal from './EditActionModal.vue';
import type { MoveCatPayload } from '@/models/action.js';
import { formatToAPITimestamp } from '@/services/date.js';
import type { Cat } from '@/models/cat.js';

const emits = defineEmits<{
  move: [payload: MoveCatPayload]
  close: []
}>()

const props = defineProps<{ cat: Cat }>()

const { currentUser, loadUserLocal } = useUser()

onMounted(loadUserLocal)

const onMoveCat = (payload: { date: string, time: string, whereTo: string, user: string }) => {
  const timestamp = formatToAPITimestamp(payload.date, payload.time)
  emits('move', { where_to: payload.whereTo, by_user: payload.user, timestamp })
}
</script>

<style lang="scss" scoped>
.datetime {
  display: flex;
  gap: 1em;
}
</style>
