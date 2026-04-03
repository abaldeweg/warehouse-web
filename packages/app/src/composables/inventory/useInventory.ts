import { apiClient } from '@/api/apiClient'
import type { UseInventory } from '@/types/composables'

/**
 * useInventory composable for managing a single inventory.
 */
export function useInventory(): UseInventory {
  /**
   * Creates a new inventory.
   */
  const createInventory = async (): Promise<void> => {
    await apiClient.post('/api/inventory/new')
  }

  /**
   * Ends an inventory.
   */
  const endInventory = async (id: number): Promise<void> => {
    const endedAt = Date.now() / 1000
    await apiClient.put('/api/inventory/' + id, { endedAt })
  }

  return {
    createInventory,
    endInventory,
  }
}
