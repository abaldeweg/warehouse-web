<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Branch } from '@/types/model/branch'
import type { User } from '@/types/model/user'
import PricelistEditor from './PricelistEditor.vue'

interface Props {
  branch: Branch
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [payload: { id: number; params: Omit<Branch, 'id'> }]
}>()

const { t } = useI18n()

const name = ref(props.branch.name)
const steps = ref(props.branch.steps)
const ordering = ref(props.branch.ordering)
const isPublic = ref(props.branch.public)
const pricelist = ref(props.branch.pricelist)
const cart = ref(props.branch.cart)
const content = ref(props.branch.content)
const mailReservation = ref(props.branch.mail_reservation)

const update = (): void => {
  if (!props.user?.isAdmin) return
  emit('update', {
    id: props.branch.id,
    params: {
      name: name.value,
      steps: steps.value,
      currency: 'EUR',
      ordering: ordering.value,
      public: isPublic.value,
      pricelist: pricelist.value,
      cart: cart.value,
      content: content.value,
      mail_reservation: mailReservation.value,
    },
  })
}
</script>

<template>
  <BForm @submit.prevent="update" v-if="branch">
    <BInput
      type="text"
      name="name"
      id="name"
      :label="t('name_of_branch')"
      :help="t('branch_name_help')"
      v-model="name"
    />

    <BInput
      type="number"
      name="steps"
      id="steps"
      :label="t('price_steps')"
      :help="t('branch_steps_help')"
      min="0.00"
      max="100.00"
      step="0.01"
      pattern="^\d+(\.|,)?\d{0,2}$"
      v-model="steps"
    />

    <BTextarea
      name="ordering"
      id="ordering"
      :label="t('book_ordering')"
      :help="t('branch_ordering_help')"
      :rows="5"
      v-model="ordering"
    />

    <BSelect
      type="checkbox"
      name="public"
      id="public"
      :label="t('is_public')"
      :help="t('is_public_help')"
      :options="[{ key: '1', value: $t('is_public') }]"
      v-model="isPublic"
    />

    <BSelect
      type="checkbox"
      name="cart"
      id="cart"
      :label="t('activate_cart')"
      :help="t('activate_cart_help')"
      :options="[{ key: '1', value: $t('activate_cart') }]"
      v-model="cart"
    />

    <BTextarea
      name="content"
      id="content"
      :label="t('content')"
      :help="t('content_help')"
      rows="5"
      v-model="content"
    />

    <BTextarea
      name="mail_reservation"
      id="mail_reservation"
      :label="t('mail_reservation')"
      :help="t('mail_reservation_help')"
      rows="5"
      v-model="mailReservation"
    />

    <PricelistEditor v-model="pricelist" />

    <template #buttons>
      <BButton design="primary_wide">{{ $t('save') }}</BButton>
    </template>
  </BForm>
</template>
