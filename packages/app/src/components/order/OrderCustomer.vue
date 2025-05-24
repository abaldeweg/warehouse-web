<script setup lang="ts">
import { useOrder } from '@/composables/useOrder.js'

defineProps<{
  order: any
}>()

const { update } = useOrder()
</script>

<template>
  <h2>{{ $t('customer') }}</h2>

  <BForm @submit.prevent="update(order)">
    <BSelect
      type="options"
      name="salutation"
      id="salutation"
      :label="$t('salutation')"
      :options="[
        { key: 'm', value: $t('mr') },
        { key: 'f', value: $t('mrs') },
        { key: 'd', value: $t('none_diverse') },
      ]"
      optionsKeyName="key"
      optionsValueName="value"
      v-model="order.salutation"
    />

    <BInput
      type="text"
      name="firstname"
      id="firstname"
      :placeholder="$t('firstname')"
      :label="$t('firstname')"
      v-model="order.firstname"
    />

    <BInput
      type="text"
      name="surname"
      id="surname"
      :placeholder="$t('surname')"
      :label="$t('surname')"
      v-model="order.surname"
    />

    <BInput
      type="email"
      name="mail"
      id="mail"
      :placeholder="$t('mail')"
      :label="$t('mail')"
      v-model="order.email"
    />

    <BInput
      type="tel"
      name="phone"
      id="phone"
      :placeholder="$t('phone')"
      :label="$t('phone')"
      v-model="order.phone"
    />

    <BTextarea
      type="text"
      name="notes"
      id="notes"
      :placeholder="$t('notes')"
      :label="$t('notes')"
      v-model="order.notes"
    />

    <BFormGroup buttons>
      <BFormItem>
        <BButton design="primary_wide">{{ $t('save') }}</BButton>
      </BFormItem>
    </BFormGroup>
  </BForm>
</template>
