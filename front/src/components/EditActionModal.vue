<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }} </p>
        <button class="delete" aria-label="close" @click="emits('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">
            Je suis
            <input class="input" type="text" v-model="user" />
          </label>
        </div>
        <div class="field">
          <label class="label">
            Ou était le chat ?
            <input class="input" type="text" v-model="whereFrom" />
          </label>
        </div>
        <div class="field">
          <label class="label">
            Ou va le chat ?
            <input class="input" type="text" v-model="whereTo" />
          </label>
        </div>
        <div class="field">
          <label class="label">
            Commentaire
            <textarea class="input" type="text" v-model="comment" />
          </label>
        </div>

        <div class="field">
          <label class="label">
            Quand
            <div class="datetime">
              <input class="input" type="date" v-model="date" />
              <input class="input" type="time" v-model="time" min="00:00" max="24:00" />
              <button class="button" @click="resetDateTime">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </label>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success" @click="onSubmit">{{ submitLabel }}</button>
          <button class="button" @click="emits('close')">Annuler</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryAction } from '@/models/action';
import { formatDateForDatepicker, formatTimeForTimepicker, formatToAPITimestamp } from '@/services/date'
import { ref } from 'vue';
import type { EditActionPayload } from './EditAction.vue';


const emits = defineEmits<{
  submit: [EditActionPayload]
  close: []
}>()

const { title = "Bouger", submitLabel = "Valider", action } = defineProps<{ title?: string, submitLabel?: string, action?: HistoryAction }>()

const whereFrom = ref(action ? action.where_from : '')
const whereTo = ref(action ? action.where_to : '')
const date = ref(formatDateForDatepicker(action ? action.timestamp : new Date().toString()))
const time = ref(formatTimeForTimepicker(action ? action.timestamp : new Date().toString()))
const user = ref(action?.by_user ?? '')
const comment = ref(action?.comment ?? '')

const resetDateTime = () => {
  date.value = formatDateForDatepicker(action ? action.timestamp : new Date().toString())
  time.value = formatTimeForTimepicker(action ? action.timestamp : new Date().toString())
}

const onSubmit = () => {
  emits('submit', { date: date.value, time: time.value, user: user.value, whereTo: whereTo.value, whereFrom: whereFrom.value, comment: comment.value })
}
</script>

<style lang="scss" scoped>
.datetime {
  display: flex;
  gap: 1em;
}
</style>
