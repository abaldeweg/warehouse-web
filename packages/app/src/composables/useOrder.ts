import { ref } from 'vue'
import { useRequest } from '@/composables/useRequest.ts'
import Cookies from 'js-cookie'
import { useI18n } from 'vue-i18n'
import type { Ref } from 'vue'

interface Order {
  id: string
  notes: string
  books: Array<{ id: string }>
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
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token') || '')

  const order = ref<Order | null>(null)

  const isLoading = ref(false)

  const flatten = (data: Array<{ id: string }>): string => {
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
