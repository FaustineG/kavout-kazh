<template>
  <table class="table">
    <thead>
      <tr>
        <th>Chat</th>
        <th>Mouvement</th>
        <th>Quand</th>
        <th>Détails</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="historyAction in actions" :key="historyAction.action_id">
        <td>{{ historyAction.cat_name }}</td>
        <td>{{ historyAction.where_from }} -> {{ historyAction.where_to }}</td>
        <td>
          <RelativeDate :timestamp="historyAction.timestamp" />
        </td>
        <td>
          <div class="details">
            <UserDetail :user-name="historyAction.by_user" />
            <CommentDetail :comment="historyAction.comment" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import CommentDetail from './CommentDetail.vue'
import RelativeDate from './RelativeDate.vue'
import UserDetail from './UserDetail.vue'
import type { HistoryAction } from '@/models/action'

defineProps<{ actions: HistoryAction[] }>()
</script>

<style lang="scss" scoped>
.details {
  display: flex;
}
table {
  margin-bottom: var(--footer-height);
}
</style>
