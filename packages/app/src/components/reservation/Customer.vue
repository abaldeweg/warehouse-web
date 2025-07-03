<script setup lang="ts">
interface Reservation {
  salutation: string
  firstname: string
  surname: string
  mail: string
  phone: string
  notes: string
}

const props = defineProps<{ reservation: Reservation }>()

const emit = defineEmits<{ (event: 'update', payload: Reservation): void }>()

const handleUpdate = () => {
  emit('update', { ...props.reservation })
}
</script>

<template>
  <h2>{{ $t('customer') }}</h2>

  <BForm @submit.prevent="handleUpdate">
    <BSelect type="options" name="salutation" id="salutation" :label="$t('salutation')" :options="[
      { key: 'm', value: $t('mr') },
      { key: 'f', value: $t('mrs') },
      { key: 'd', value: $t('none_diverse') },
    ]" optionsKeyName="key" optionsValueName="value" v-model="props.reservation.salutation" />

    <BInput type="text" name="firstname" id="firstname" :placeholder="$t('firstname')" :label="$t('firstname')"
      v-model="props.reservation.firstname" />

    <BInput type="text" name="surname" id="surname" :placeholder="$t('surname')" :label="$t('surname')"
      v-model="props.reservation.surname" />

    <BInput type="email" name="mail" id="mail" :placeholder="$t('mail')" :label="$t('mail')"
      v-model="props.reservation.mail" />

    <BInput type="tel" name="phone" id="phone" :placeholder="$t('phone')" :label="$t('phone')"
      v-model="props.reservation.phone" />

    <BTextarea type="text" name="notes" id="notes" :placeholder="$t('notes')" :label="$t('notes')"
      v-model="props.reservation.notes" />

    <template #buttons>
      <BButton design="primary_wide">{{ $t('save') }}</BButton>
    </template>
  </BForm>
</template>
