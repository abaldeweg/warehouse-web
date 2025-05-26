import type { AxiosResponse } from 'axios'
import { apiClient } from '@/api/apiClient'

export function useProduct() {
  // Sell all products
  const sellAll = (products: any[]): void => {
    products.forEach((element) => {
      sell(element.id)
    })
  }

  // Sell a product by ID
  const sell = (id: string): Promise<AxiosResponse> => {
    return apiClient.put('/api/book/sell/' + id)
  }

  return {
    sellAll,
  }
}
