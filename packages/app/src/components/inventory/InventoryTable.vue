<script setup lang="ts">
import type { Inventory } from '@/types/model/inventory'

defineProps<{
  inventories: Inventory[]
  isAdmin: boolean
}>()

const formatDate = (data: number) => {
  const date = new Date(data * 1000)
  return date.toLocaleString()
}
</script>

<template>
  <BTable v-if="inventories">
    <table :aria-label="$t('inventory')">
      <thead>
        <tr>
          <th scope="col">{{ $t('started_at') }}</th>
          <th scope="col">{{ $t('ended_at') }}</th>
          <th scope="col" class="alignRight">{{ $t('found') }}</th>
          <th scope="col" class="alignRight">
            {{ $t('not_found') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="inventory in inventories" :key="inventory.id">
          <td>{{ formatDate(inventory?.startedAt ?? 0) }}</td>
          <td>
            {{ inventory.endedAt ? formatDate(inventory.endedAt) : null }}
            <BButton
              design="text"
              @click="$emit('end', inventory.id)"
              v-if="!inventory.endedAt === null && isAdmin"
            >
              {{ $t('end') }}
            </BButton>
          </td>
          <td class="alignRight">{{ inventory.found }}</td>
          <td class="alignRight">{{ inventory.notFound }}</td>
        </tr>
      </tbody>
    </table>
  </BTable>
</template>

<style scoped>
.alignRight {
  text-align: right;
}
</style>
