import { describe, it, vi, expect } from 'vitest'
import { useProduct } from '../useProduct'
import { apiClient } from '@/api/apiClient'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    put: vi.fn(),
  },
}))

const product = {
  id: '1',
  branch: {
    id: 1,
    name: '',
    steps: '',
    currency: '',
    ordering: '',
    public: false,
    pricelist: '',
    cart: false,
    content: '',
  },
  added: 0,
  title: '',
  shortDescription: '',
  author: { id: 1, firstname: '', surname: '' },
  genre: {
    id: 1,
    name: '',
    branch: {
      id: 1,
      name: '',
      steps: '',
      currency: '',
      ordering: '',
      public: false,
      pricelist: '',
      cart: false,
      content: '',
    },
    books: 0,
  },
  price: 0,
  sold: false,
  soldOn: null,
  removed: false,
  removedOn: null,
  reserved: false,
  reservedAt: null,
  releaseYear: 0,
  condition: null,
  tags: [],
  reservation_id: null,
  recommendation: false,
  inventory: null,
  format: {
    id: 1,
    name: '',
    branch: {
      id: 1,
      name: '',
      steps: '',
      currency: '',
      ordering: '',
      public: false,
      pricelist: '',
      cart: false,
      content: '',
    },
  },
  subtitle: null,
  duplicate: false,
}

const products = [
  { ...product, id: '1' },
  { ...product, id: '2' },
  { ...product, id: '3' },
]

describe('useProduct', () => {
  it('should call apiClient.put for each product in sellAll', async () => {
    const { sellAll } = useProduct()

    await sellAll(products)

    expect(apiClient.put).toHaveBeenCalledTimes(products.length)
    products.forEach((product) => {
      expect(apiClient.put).toHaveBeenCalledWith(`/api/book/sell/${product.id}`)
    })
  })
})
