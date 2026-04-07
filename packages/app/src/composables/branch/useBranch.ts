import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Branch } from '@/types/model/branch'
import type { UseBranch } from '@/types/composables'

/**
 * useBranch composable for branch logic.
 */
export function useBranch(): UseBranch {
  const branch = ref<Branch | null>(null)
  const isSaving = ref<boolean>(false)
  const savedSuccess = ref<boolean>(false)
  const savedError = ref<boolean>(false)
  const isCleaning = ref<boolean>(false)
  const cleaningSuccess = ref<boolean>(false)
  const cleaningError = ref<boolean>(false)

  /**
   * Fetch a branch by its ID.
   */
  const fetchBranch = async (id: number): Promise<void> => {
    const response = await apiClient.get(`/api/branch/${id}`)
    branch.value = response.data
  }

  /**
   * Update a branch by its ID.
   */
  const updateBranch = async (data: { id: number; params: Omit<Branch, 'id'> }): Promise<void> => {
    isSaving.value = true
    savedSuccess.value = false
    savedError.value = false

    try {
      await apiClient.put(`/api/branch/${data.id}`, data.params)
      savedSuccess.value = true
    } catch {
      savedError.value = true
    } finally {
      isSaving.value = false
    }
  }

  /**
   * Permanently delete books marked as removed.
   */
  const cleanBooks = async (): Promise<void> => {
    isCleaning.value = true
    cleaningSuccess.value = false
    cleaningError.value = false
    try {
      await apiClient.delete('/api/book/clean')
      cleaningSuccess.value = true
    } catch {
      cleaningError.value = true
    } finally {
      isCleaning.value = false
    }
  }

  return {
    branch,
    isSaving,
    savedSuccess,
    savedError,
    isCleaning,
    cleaningSuccess,
    cleaningError,
    fetchBranch,
    updateBranch,
    cleanBooks,
  }
}
