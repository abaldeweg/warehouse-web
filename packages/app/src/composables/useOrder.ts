import { ref } from 'vue'
import Cookies from 'js-cookie'
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Method } from 'axios'
import type { Product } from '@/composables/useProduct'

interface Order {
  id: string
  notes: string
  books: Product[]
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
  update: () => Promise<void>
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

  const order = ref<Order | null>(null)

  const isLoading = ref(false)

  const flatten = (data: Product[]): string => {
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

  const update = async () => {
    if (!order.value) return

    await request('put', `/api/reservation/${order.value.id}`, {
      notes: order.value.notes,
      books: flatten(order.value.books),
      salutation: order.value.salutation,
      firstname: order.value.firstname,
      surname: order.value.surname,
      mail: order.value.mail,
      phone: order.value.phone,
      open: order.value.open,
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
