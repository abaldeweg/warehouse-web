import type { AxiosResponse } from 'axios'
import { apiClient } from '@/api/apiClient'
import type { Book } from '@/types/model/book'
import type { UseProduct } from '@/types/composables'
import { ref, type Ref } from 'vue'

/**
 * useProduct composable for managing product sales.
 */
export function useProduct(): UseProduct {
  const book: Ref<Book | null> = ref(null)

  const show = async (id: string): Promise<void> => {
    const res = await apiClient.get('/api/book/' + id)
    book.value = res.data
  }

  const update = async (data: any): Promise<void> => {
    let tags: any[] = []
    data.tags.forEach((element: { id: any }) => {
      tags.push(element.id)
    })

    const book = {
      added: new Date(data.added).getTime() / 1000,
      title: data.title,
      shortDescription: data.shortDescription,
      author: data.author.surname + ',' + data.author.firstname,
      genre: data.genre.id,
      price: data.price,
      sold: data.sold,
      removed: data.removed,
      reserved: data.reserved,
      releaseYear: data.releaseYear !== '' ? data.releaseYear : 0,
      cond: data.condition?.id,
      tags: tags,
      recommendation: data.recommendation,
      format: data.format.id,
      subtitle: data.subtitle,
      duplicate: data.duplicate,
    }
    return await apiClient.put('/api/book/' + data.id, book)
  }

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
    book,
    show,
    update,
    sellAll,
    sell,
  }
}
