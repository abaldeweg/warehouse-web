import { describe, it, vi, expect } from 'vitest'
import { useProduct } from '../useProduct'
import { apiClient } from '@/api/apiClient'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    put: vi.fn(),
  },
}))

describe('useProduct', () => {
  it('should call apiClient.put for each product in sellAll', async () => {
    const { sellAll } = useProduct()
    const products = [{ id: '1' }, { id: '2' }, { id: '3' }]

    await sellAll(products)

    expect(apiClient.put).toHaveBeenCalledTimes(products.length)
    products.forEach((product) => {
      expect(apiClient.put).toHaveBeenCalledWith(`/api/book/sell/${product.id}`)
    })
  })
})
