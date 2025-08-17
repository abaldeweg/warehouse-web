import { describe, it, expect, beforeEach, vi } from 'vitest'
import { apiClient } from '@/api/apiClient'
import { useBranch } from '@/composables/branch/useBranch'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('useBranch', () => {
  let fetchBranch: ReturnType<typeof useBranch>['fetchBranch']
  let branch: ReturnType<typeof useBranch>['branch']

  beforeEach(() => {
    const composable = useBranch()
    fetchBranch = composable.fetchBranch
    branch = composable.branch
    vi.clearAllMocks()
  })


  it('should fetch branch and update branch ref on success', async () => {
    const mockBranch = {
      id: 1,
      name: 'Branch',
      steps: '',
      currency: 'EUR',
      ordering: '',
      public: true,
      pricelist: '',
      cart: true,
      content: null,
      mail_reservation: null,
    }

      ; (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        status: 200,
        data: mockBranch,
      })

    await fetchBranch(1)

    expect(apiClient.get).toHaveBeenCalledWith('/apis/core/1/api/branch/1')
    expect(branch.value).toEqual(mockBranch)
  })
})
