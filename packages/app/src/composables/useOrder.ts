import { ref } from 'vue'
import Cookies from 'js-cookie'
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Method } from 'axios'

interface Order {
  id: string
  notes: string
  books: any[]
  salutation: string
  firstname: string
  surname: string
  mail: string
  phone: string
  open: boolean
  createdAt: number
}

interface UseOrder {
  orders: Ref<Order[] | null>
  order: Ref<Order | null>
  isLoading: Ref<boolean>
  list: () => Promise<void>
  show: (id: string) => Promise<void>
  update: (data: any) => Promise<void>
  remove: (id: string) => Promise<void>
}

const orders = ref<Order[] | null>(null)

export function useOrder(): UseOrder {
  /**
   * Make an authenticated API request.
   * @param {Method} method - HTTP method
   * @param {string} url - API endpoint
   * @param {any} [data] - Request body
   * @param {any} [params] - Query parameters
   * @returns {Promise<AxiosResponse>} - Axios response promise
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

  const order = ref<Order | null>(null)

  const isLoading = ref(false)

  const flatten = (data: any[]): string => {
    return data.map((element) => element.id).join(',')
  }

  const list = async () => {
    isLoading.value = true

    try {
      const res = await request('get', '/api/reservation/list')
      orders.value = res.data
    } finally {
      isLoading.value = false
    }
  }

  const show = async (id: string) => {
    const res = await request('get', `/api/reservation/${id}`)
    order.value = res.data
  }

  const update = async (data: any) => {
    if (!data) return

    await request('put', `/api/reservation/${data.id}`, {
      notes: data.notes,
      books: flatten(data.books),
      salutation: data.salutation,
      firstname: data.firstname,
      surname: data.surname,
      mail: data.mail,
      phone: data.phone,
      open: data.open,
    })
  }

  const remove = async (id: string) => {
    await request('delete', `/api/reservation/${id}`)
    await list()
  }

  return {
    orders,
    order,
    isLoading,
    list,
    show,
    update,
    remove,
  }
}
