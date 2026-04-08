import { apiClient } from '@/api/apiClient'
import type { UseCondition } from '@/types/composables'
import { ref } from 'vue'

/**
 * useCondition composable for single condition management logic.
 */
export function useCondition(): UseCondition {
  const deleteSuccess = ref<boolean>(false)
  const deleteError = ref<boolean>(false)

  /**
   * Creates a new condition with the given name.
   */
  const createCondition = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/condition/new', { name })
    return response.data.id
  }

  /**
   * Updates the name of an existing condition.
   */
  const updateCondition = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/condition/' + id, { name })
  }

  /**
   * Removes an existing condition by its ID.
   */
  const removeCondition = async (id: number): Promise<void> => {
    try {
      await apiClient.delete('/api/condition/' + id)
      deleteSuccess.value = true
    } catch {
      deleteError.value = true
    }
  }

  return {
    deleteSuccess,
    deleteError,
    createCondition,
    updateCondition,
    removeCondition,
  }
}
