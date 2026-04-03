<script setup lang="ts">
import { useInventory } from '@/composables/inventory/useInventory'
import type { Inventory } from '@/types/model/inventory'

interface Props {
  inventories: Inventory[] | null
  isAdmin: boolean
}

withDefaults(defineProps<Props>(), {
  isAdmin: false,
})

const emits = defineEmits(['end'])

const formatDate = (data: number): string => {
  const date = new Date(data * 1000)
  return date.toLocaleString()
}

const { endInventory } = useInventory()

const end = async (id: number): Promise<void> => {
  await endInventory(id)
  emits('end')
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
          <td>{{ inventory.startedAt ? formatDate(inventory.startedAt) : null }}</td>
          <td>
            {{ inventory.endedAt ? formatDate(inventory.endedAt) : null }}
            <BButton
              design="text"
              @click="end(inventory.id)"
              v-if="inventory.endedAt === null && isAdmin"
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
