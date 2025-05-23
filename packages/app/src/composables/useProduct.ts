import Cookies from 'js-cookie'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Method } from 'axios'

export function useProduct() {
  /**
   * Make an authenticated API request.
   */
  const request = (method: Method, url: string, data?: any, params?: any): Promise<AxiosResponse> => {
    const config = {
      baseURL: import.meta.env.VITE_BASE_URL,
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

  // Sell all products
  const sellAll = (products: any[]): void => {
    products.forEach((element) => {
      sell(element.id)
    })
  }

  // Sell a product by ID
  const sell = (id: string): Promise<AxiosResponse> => {
    return request('put', '/api/book/sell/' + id)
  }

  return {
    sellAll,
  }
}
