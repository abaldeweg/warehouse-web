import type { AxiosResponse } from 'axios'
import { apiClient } from '@/api/apiClient'
import type { Book } from '@/types/book'

export interface UseProduct {
  sellAll: (products: Book[]) => void
}

export function useProduct(): UseProduct {
  // Sell all products
  const sellAll = (products: Book[]): void => {
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
