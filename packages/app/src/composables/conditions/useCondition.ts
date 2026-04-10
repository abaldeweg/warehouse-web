import { apiClient } from '@/api/apiClient'
import { ref } from 'vue'
import type { Ref } from 'vue'
import debounce from 'debounce'

interface UseCondition {
  deleteSuccess: Ref<boolean>
  deleteError: Ref<boolean>
  createCondition: (name: string) => Promise<number>
  updateCondition: (id: number, name: string) => Promise<void>
  updateConditionDebounced: (id: number, name: string) => void
  removeCondition: (id: number) => Promise<void>
}

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
   * Debounced version of updateCondition.
   */
  const updateConditionDebounced = debounce((id: number, name: string): void => {
    updateCondition(id, name)
  }, 1000)

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
    updateConditionDebounced,
    removeCondition,
  }
}
