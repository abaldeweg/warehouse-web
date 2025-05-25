<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useOrder } from '@/composables/useOrder.js'
import { useProduct } from '@/composables/useProduct.js'

const props = defineProps<{ order: any }>()

const { t } = useI18n()

useHead({ title: t('reservation') })

const { remove, update } = useOrder()

const { sellAll } = useProduct()

const print = (): void => {
  window.print()
}

const updateStatus = (status: string): void => {
  props.order.status = status
  update(props.order)
}

const mail = (mail: string, surname: string): void => {
  window.location.href = `mailto:${mail}?subject=${t('your_reservation')}&body=${t('reservation_mail_body', { surname })}`
}
</script>

<template>
  <div class="toolbar">
    <div class="toolbar_group">
      <RouterLink :to="{ name: 'reservation' }">&lang; {{ $t('back') }}</RouterLink>
    </div>
    <div class="toolbar_group">
      <BTooltip :text="t('delete_reservation')" position="bottom">
        <BMaterialIcon @click="remove(order.id)" color="#ff0000" hover>delete</BMaterialIcon>
      </BTooltip>
      <BTooltip :text="t('sell_all')" position="bottom">
        <BMaterialIcon @click="sellAll(order.books)" hover>sell</BMaterialIcon>
      </BTooltip>
      <BTooltip :text="t('compose_mail')" position="bottom">
        <BMaterialIcon @click="mail(order.mail, order.surname)" hover>mail</BMaterialIcon>
      </BTooltip>
      <BTooltip :text="t('print')" position="bottom">
        <BMaterialIcon @click="print" hover>print</BMaterialIcon>
      </BTooltip>
      <BSwitch v-model="order.open" @update:modelValue="updateStatus" :label="$t('is_new')" />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  padding: 20px;
}
.toolbar_group {
  display: flex;
  gap: 20px;
  align-items: center;
}
@media print {
  .toolbar {
    display: none;
  }
}
</style>
