<template>
    <span @click="onClick">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-pencil preview-icon">
            <path
                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
        </svg>
    </span>
    <EditActionModal v-if="isModalOpen" :action="action" :title="`Corriger (${action.cat_name})`" @close="onCloseModal"
        @submit="onSubmit" />
</template>

<script setup lang="ts">
import { type HistoryAction } from '@/models/action';
import EditActionModal from './EditActionModal.vue';
import { ref } from 'vue';

export interface EditActionPayload { date: string, time: string, whereTo: string, whereFrom: string, user: string; comment: string }

const { action } = defineProps<{ action: HistoryAction }>()
const emits = defineEmits<{ submit: [action_id: string, payload: { date: string, time: string, whereTo: string, whereFrom: string, user: string }] }>()

const isModalOpen = ref(false)

const onClick = () => {
    isModalOpen.value = true;
}

const onCloseModal = () => {
    isModalOpen.value = false;
}

const onSubmit = async (payload: EditActionPayload) => {
    emits('submit', action.action_id, payload)
    onCloseModal()
}

</script>