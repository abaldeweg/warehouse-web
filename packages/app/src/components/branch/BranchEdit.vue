<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  branch: Object,
  me: Object,
})

const emit = defineEmits(['update'])

const { branch } = toRefs(props)

const state = reactive({
  name: branch?.value?.name,
  steps: branch?.value?.steps,
  currency: branch?.value?.currency,
  ordering: branch?.value?.ordering,
  isPublic: branch?.value?.public,
  pricelist: branch?.value?.pricelist,
  cart: branch?.value?.cart,
  content: branch?.value?.content,
  mail_reservation: branch?.value?.mail_reservation,
  orderBy: branch?.value?.orderBy,
})

const update = () => {
  if (!props.me || !props.me.isAdmin) return

  emit('update', {
    id: branch?.value?.id,
    params: {
      name: state.name,
      steps: parseFloat(state.steps),
      currency: state.currency,
      ordering: state.ordering,
      public: state.isPublic,
      pricelist: state.pricelist,
      cart: state.cart,
      content: state.content,
      mail_reservation: state.mail_reservation,
    },
  })
}
</script>

<template>
  <b-form @submit.prevent="update" v-if="branch">
    <BInput
      type="text"
      name="name"
      id="name"
      :label="t('name_of_branch')"
      :help="t('branchNameHelp')"
      v-model="state.name"
    />

    <BInput
      type="number"
      name="steps"
      id="steps"
      :label="t('price_steps')"
      :help="t('branchStepsHelp')"
      min="0.00"
      max="100.00"
      step="0.01"
      pattern="^\d+(\.|,)?\d{0,2}$"
      v-model="state.steps"
    />

    <BSelect
      type="options"
      name="currency"
      id="currency"
      :label="t('currency')"
      :options="[
        { key: 'EUR', value: 'EUR' },
        { key: 'USD', value: 'USD' },
      ]"
      v-model="state.currency"
    />

    <BTextarea
      name="ordering"
      id="ordering"
      :label="t('bookOrdering')"
      :help="t('branchOrderingHelp')"
      :rows="5"
      v-model="state.ordering"
    />

    <BAlert type="warning">
      Deprecation: This setting will be removed soon. "Name - Ascending" will become the default.
      Diese Einstellung wird bald entfernt. "Name - Aufsteigend" wird der Standard.
    </BAlert>
    <BSelect
      type="options"
      name="orderBy"
      id="orderBy"
      :label="t('orderBy')"
      :help="t('branchOrderByHelp')"
      :options="[
        { key: 'name', value: $t('orderByNameAsc') },
        { key: 'books', value: $t('orderByBookcountDesc') },
      ]"
      v-model="state.orderBy"
    />

    <BSelect
      type="checkbox"
      name="public"
      id="public"
      :label="t('is_public')"
      :help="t('is_public_help')"
      :options="[{ key: '1', value: $t('is_public') }]"
      v-model="state.isPublic"
    />

    <BSelect
      type="checkbox"
      name="cart"
      id="cart"
      :label="t('activateCart')"
      :help="t('activateCartHelp')"
      :options="[{ key: '1', value: $t('activateCart') }]"
      v-model="state.cart"
    />

    <BTextarea
      name="content"
      id="content"
      :label="t('content')"
      :help="t('content_help')"
      v-model="state.content"
      rows="5"
    />

    <BTextarea
      name="mail_reservation"
      id="mail_reservation"
      :label="t('mail_reservation')"
      :help="t('mail_reservation_help')"
      v-model="state.mail_reservation"
      rows="5"
    />

    <template #buttons>
      <b-button design="outline">{{ $t('save') }}</b-button>
    </template>
  </b-form>
</template>
