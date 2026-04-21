import { computed, ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Inventory } from '@/types/model/inventory'
import type { Ref } from 'vue'

interface UseInventories {
  inventories: Ref<Inventory[] | null>
  hasActiveInventory: Ref<boolean>
  listInventories: () => Promise<void>
}

/**
 * useInventories composable for managing a list of inventories.
 */
export function useInventories(): UseInventories {
  const inventories = ref<Inventory[] | null>(null)

  const hasActiveInventory = computed((): boolean => {
    let active = false
    inventories.value?.forEach((element) => {
      if (null === element.endedAt) {
        active = true
      }
    })
    return active
  })

  /**
   * Fetches the list of inventories from the API and updates the inventories ref.
   */
  const listInventories = async (): Promise<void> => {
    const response = await apiClient.get('/api/inventory/')
    const data: Inventory[] = response.data ?? []
    inventories.value = [...data].sort(
      (a, b) => (b.startedAt ?? 0) - (a.startedAt ?? 0)
    )
  }

  return {
    inventories,
    hasActiveInventory,
    listInventories,
  }
}
