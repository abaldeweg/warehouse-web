<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useOrder } from '@/composables/useOrder.js'
import { useProduct } from '@/composables/useProduct.js'
import OrderAge from '@/components/order/OrderAge.vue'
import OrderTable from '@/components/order/OrderTable.vue'
import OrderStatus from '@/components/order/OrderStatus.vue'
import OrderCustomer from '@/components/order/OrderCustomer.vue'
import OrderDelete from '@/components/order/OrderDelete.vue'
import OrderSellAll from '@/components/order/OrderSellAll.vue'
import OrderPrint from '@/components/order/OrderPrint.vue'

const props = defineProps<{ id: string }>()

const { t } = useI18n()

useHead({ title: t('order') })

const { order, show, update, remove } = useOrder()
show(props.id)

const { sellAll } = useProduct()

const toLocaleDateString = (data: number): string => {
  const date = new Date(data * 1000)
  return date.toLocaleString()
}
</script>

<template>
  <div v-if="order">
    <BContainer size="m">
      <RouterLink :to="{ name: 'home' }">&lang; {{ $t('back') }}</RouterLink>
    </BContainer>

    <BContainer size="m">
      <h1>{{ $t('order_from') }} {{ toLocaleDateString(order.createdAt) }}</h1>
    </BContainer>

    <OrderAge :created="order.createdAt" />

    <OrderTable :products="order.books" />

    <OrderStatus :open="order.open" @update:open="order.open = $event" @update="update" />

    <OrderCustomer :order="order" @update="update" @update:salutation="order.salutation = $event"
      @update:firstname="order.firstname = $event" @update:surname="order.surname = $event"
      @update:mail="order.mail = $event" @update:phone="order.phone = $event" @update:notes="order.notes = $event" />

    <OrderPrint :order="order" />

    <OrderSellAll :id="order.id" @sell-all="sellAll(order.books), (order.books = [])" />

    <OrderDelete :id="order.id" @remove="remove" />
  </div>
</template>
