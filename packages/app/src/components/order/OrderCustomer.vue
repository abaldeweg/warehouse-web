<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  order: {
    salutation: string;
    firstname: string;
    surname: string;
    mail: string;
    phone: string;
    notes: string;
  }
}>()

defineEmits([
  'update',
  'update:salutation',
  'update:firstname',
  'update:surname',
  'update:mail',
  'update:phone',
  'update:notes',
])
</script>

<template>
  <BContainer size="m">
    <h2>{{ $t('customer') }}</h2>

    <details>
      <summary class="selector">
        {{ $t('customer_details') }}
      </summary>

      <BForm @submit.prevent="$emit('update')">
        <BFormGroup>
          <BFormItem>
            <BFormLabel for="salutation">
              {{ $t('salutation') }}
            </BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormSelect
              :items="[
                { key: 'm', value: $t('mr') },
                { key: 'f', value: $t('mrs') },
                { key: 'd', value: $t('none_diverse') },
              ]"
              id="salutation"
              :modelValue="order.salutation"
              @update:modelValue="$emit('update:salutation', $event)"
            />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="firstname">
              {{ $t('firstname') }}
            </BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput
              type="text"
              id="firstname"
              :modelValue="order.firstname"
              @update:modelValue="$emit('update:firstname', $event)"
            />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="surname">
              {{ $t('surname') }}
            </BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput
              type="text"
              id="surname"
              :modelValue="order.surname"
              @update:modelValue="$emit('update:surname', $event)"
            />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="mail">
              {{ $t('mail') }}
            </BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput
              type="email"
              id="mail"
              :modelValue="order.mail"
              @update:modelValue="$emit('update:mail', $event)"
            />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="phone">
              {{ $t('phone') }}
            </BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput
              type="tel"
              id="phone"
              :modelValue="order.phone"
              @update:modelValue="$emit('update:phone', $event)"
            />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="notes">{{ $t('notes') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormTextarea
              id="notes"
              :modelValue="order.notes"
              @update:modelValue="$emit('update:notes', $event)"
            />
          </BFormItem>
        </BFormGroup>

        <BFormGroup buttons>
          <BFormItem>
            <BButton design="outline">{{ $t('save') }}</BButton>
          </BFormItem>
        </BFormGroup>
      </BForm>
    </details>
  </BContainer>
</template>

<style scoped>
.selector {
  cursor: pointer;
  user-select: none;
}
</style>
