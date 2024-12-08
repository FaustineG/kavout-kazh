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
      <tr v-for="historyAction in orderedActions" :key="historyAction.action_id">
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
import { computed } from 'vue'

const props = defineProps<{ actions: HistoryAction[] }>()

const orderedActions = computed(() =>
  [...props.actions].sort((a1, a2) => (new Date(a1.timestamp) > new Date(a2.timestamp) ? -1 : 1))
)
</script>

<style lang="scss" scoped>
.details {
  display: flex;
}
thead {
  font-weight: bold;
}

table {
  margin-bottom: var(--footer-height);
}
</style>
