<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">MOVE THAT CAT</p>
        <button class="delete" aria-label="close" @click="emits('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">
            Je suis
            <input class="input" type="text" v-model="currentUser" />
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
            Quand
            <div class="datetime">
              <input class="input" type="date" v-model="date" />
              <input class="input" type="time" v-model="time" min="00:00" max="24:00" />
              <button class="button" @click="resetDateTime">
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
                  class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"
                >
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
          <button class="button is-success" @click="onMoveCat">MOVE IT MOVE IT</button>
          <button class="button" @click="emits('close')">Annuler</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MoveCatPayload } from '@/models/action'
import { formatDateForDatepicker, formatTimeForTimepicker } from '@/services/date'
import { useUser } from '@/services/user'
import { onMounted, ref } from 'vue'

const emits = defineEmits<{
  move: [payload: MoveCatPayload]
  close: []
}>()

const { currentUser, loadUserLocal } = useUser()
const whereTo = ref('')
const date = ref(formatDateForDatepicker(new Date().toString()))
const time = ref(formatTimeForTimepicker(new Date().toString()))

const resetDateTime = () => {
  date.value = formatDateForDatepicker(new Date().toString())
  time.value = formatTimeForTimepicker(new Date().toString())
}
onMounted(loadUserLocal)

const onMoveCat = () => {
  const timestamp = new Date(date.value + ' ' + time.value).toISOString()
  emits('move', { where_to: whereTo.value, by_user: currentUser.value, timestamp })
}
</script>

<style lang="scss" scoped>
.datetime {
  display: flex;
  gap: 1em;
}
</style>
