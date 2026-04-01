import { computed, ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Inventory } from '@/types/model/inventory'
import type { UseInventory } from '@/types/composables'

/**
 * useInventory composable for managing a list of inventories.
 */
export function useInventory(): UseInventory {
  const inventories = ref<Inventory[] | null>(null)

  const hasActiveInventory = computed(() => {
    let active = false
    inventories.value?.forEach((element) => {
      if (null === element.endedAt) {
        active = true
      }
    })
    return active
  })

  const listInventories = async (): Promise<void> => {
    const response = await apiClient.get('/api/inventory/')
    inventories.value = response.data
  }

  const createInventory = async () => {
    return await apiClient.post('/api/inventory/new').then(() => {
      listInventories()
    })
  }

  const endInventory = async (id: number) => {
    const endedAt = Date.now() / 1000
    return await apiClient.put('/api/inventory/' + id, { endedAt }).then(() => {
      listInventories()
    })
  }

  return {
    inventories,
    hasActiveInventory,
    listInventories,
    createInventory,
    endInventory,
  }
}
