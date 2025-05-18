import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProduct } from '../useProduct'
import axios from 'axios'
import Cookies from 'js-cookie'

vi.mock('axios')
vi.mock('js-cookie')

describe('useProduct', () => {
  const mockAxios = axios as unknown as { create: any }
  const mockRequest = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockAxios.create = vi.fn(() => ({ request: mockRequest }))
      ; (Cookies.get as any) = vi.fn(() => 'test-token')
  })

  it('should call sell with correct id', async () => {
    mockRequest.mockResolvedValue({ data: 'ok' })
    const { sellAll } = useProduct()
    const products = [{ id: '1' }, { id: '2' }]

    await sellAll(products)

    expect(mockRequest).toHaveBeenCalledWith(expect.objectContaining({
      method: 'put',
      url: '/api/book/sell/1',
    }))
    expect(mockRequest).toHaveBeenCalledWith(expect.objectContaining({
      method: 'put',
      url: '/api/book/sell/2',
    }))
  })
})
