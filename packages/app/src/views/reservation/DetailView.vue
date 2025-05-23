<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useOrder } from '@/composables/useOrder.js'
import OrderAge from '@/components/order/OrderAge.vue'
import OrderTable from '@/components/order/OrderTable.vue'
import OrderCustomer from '@/components/order/OrderCustomer.vue'
import OrderToolbar from '@/components/order/OrderToolbar.vue'
import { onMounted } from 'vue'
import { useDate } from '@/composables/useDate.ts'

const props = defineProps<{ id: string }>()

const { t } = useI18n()

useHead({ title: t('reservation') })

const { order, show } = useOrder()
onMounted(() => {
  show(props.id)
})

const { toLocaleDateString } = useDate()
</script>

<template>
  <div v-if="order">
    <BContainer size="m">
      <OrderToolbar :order="order" />
    </BContainer>

    <BContainer size="m">
      <OrderAge :created="order.createdAt" />
    </BContainer>

    <BContainer size="m">
      <h1>{{ $t('reservation_from') }} {{ toLocaleDateString(order.createdAt) }}</h1>
    </BContainer>

    <BContainer size="m">
      <OrderTable :products="order.books" />
    </BContainer>

    <BContainer size="m">
      <OrderCustomer :order="order" />
    </BContainer>
  </div>
</template>
