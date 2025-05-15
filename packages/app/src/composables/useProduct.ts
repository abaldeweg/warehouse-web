import Cookies from 'js-cookie'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Method } from 'axios'

export interface Product {
  id: string
  title: string
  price: number
  sold?: boolean
  removed?: boolean
  author: {
    firstname: string
    surname: string
  }
  genre: {
    name: string
  }
}

export function useProduct() {
  /**
   * Make an authenticated API request.
   */
  const request = (method: Method, url: string, data?: any, params?: any): Promise<AxiosResponse> => {
    const config = {
      baseURL: import.meta.env.VITE_APP_API,
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token'),
      },
    }

    return axios.create(config).request({
      method,
      url,
      data,
      params,
    })
  }

  const sellAll = (products: Product[]): void => {
    products.forEach((element) => {
      sell(element.id)
    })
  }

  const sell = (id: string): Promise<AxiosResponse> => {
    return request('put', '/api/book/sell/' + id)
  }

  return {
    sellAll,
  }
}
