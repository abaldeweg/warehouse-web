import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Branch } from '@/types/model/branch'
import type { UseBranch } from '@/types/composables'

/**
 * useBranch composable for branch logic.
 */
export function useBranch(): UseBranch {
  const branch = ref<Branch | null>(null)
  const isSaving = ref(false)
  const savedSuccess = ref(false)
  const savedError = ref(false)

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
   * Clean books.
   */
  const cleanBooks = async (): Promise<void> => {
    return await apiClient.delete('/api/book/clean')
  }

  return {
    branch,
    isSaving,
    savedSuccess,
    savedError,
    fetchBranch,
    updateBranch,
    cleanBooks,
  }
}
