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
            Commentaire
            <textarea class="textarea" v-model="comment"></textarea>
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
import { useUser } from '@/services/user'
import { onMounted, ref } from 'vue'

const emits = defineEmits<{
  move: [payload: { whereTo: string; comment: string; user: string }]
  close: []
}>()

const { currentUser, loadUserLocal } = useUser()
const whereTo = ref('')
const comment = ref('')
onMounted(loadUserLocal)

const onMoveCat = () => {
  emits('move', { whereTo: whereTo.value, comment: comment.value, user: currentUser.value })
}
</script>
