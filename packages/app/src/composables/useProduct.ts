import type { AxiosResponse } from 'axios'
import { apiClient } from '@/api/apiClient'
import type { Book } from '@/types/book'

/**
 * Interface for the useProduct composable.
 */
export interface UseProduct {
  sellAll: (products: Book[]) => void
}

/**
 * useProduct composable for managing product sales.
 */
export function useProduct(): UseProduct {
  /**
   * Sells all products by iterating through the provided array of products.
   */
  const sellAll = (products: Book[]): void => {
    products.forEach((element) => {
      sell(element.id)
    })
  }

  /**
   * Sells a single product by sending a PUT request to the API.
   */
  const sell = (id: string): Promise<AxiosResponse> => {
    return apiClient.put('/api/book/sell/' + id)
  }

  return {
    sellAll,
  }
}
