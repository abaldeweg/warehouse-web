import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGenres } from '../useGenres'
import { apiClient } from '@/api/apiClient'

const commonBranch = {
  id: 1,
  name: 'Branch',
  steps: 1,
  currency: 'EUR',
  ordering: null,
  public: true,
  pricelist: '',
  cart: true,
  content: null,
  mail_reservation: null,
}

const mockGenres = [
  { id: 1, name: 'Crime', branch_id: 1, branch: commonBranch },
  { id: 2, name: 'Thriller', branch_id: 1, branch: commonBranch },
  { id: 3, name: 'Novels', branch_id: 1, branch: commonBranch },
]

describe('useGenres', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchGenres populates genres and toggles loading', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mockGenres })

    const { fetchGenres, genres, isLoading, processedGenres } = useGenres()

    expect(genres.value).toBeNull()
    const g = fetchGenres()
    expect(isLoading.value).toBe(true)
    await g
    expect(genres.value).toEqual(mockGenres)
    expect(processedGenres.value).toEqual(mockGenres)
    expect(isLoading.value).toBe(false)
  })

  it('processedGenres filters by criteria and sorts', () => {
    const { genres, criteria, sort, processedGenres } = useGenres()
    genres.value = mockGenres

    criteria.value = 'cr'
    expect(processedGenres.value).toEqual([
      { id: 1, name: 'Crime', branch_id: 1, branch: commonBranch },
    ])

    criteria.value = null
    sort.value = 'asc'
    expect(processedGenres.value?.map((g) => g.name)).toEqual(['Crime', 'Novels', 'Thriller'])

    sort.value = 'desc'
    expect(processedGenres.value?.map((g) => g.name)).toEqual(['Thriller', 'Novels', 'Crime'])
  })
})
