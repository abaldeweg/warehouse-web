import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Branch } from '@/types/model/branch'
import type { UseBranch } from '@/types/composables'

/**
 * useBranch composable for branch logic.
 */
export function useBranch(): UseBranch {
  const branch = ref<Branch | null>(null)

  const fetchBranch = async (id: number): Promise<void> => {
    const response = await apiClient.get(`/api/branch/${id}`)
    branch.value = response.data
  }

  return {
    branch,
    fetchBranch,
  }
}
