<script setup lang="ts">
import { useFormat } from '@/composables/formats/useFormat.js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['created'])

const { t } = useI18n()

const name = ref('')

const { createFormat } = useFormat()

/**
 * create creates a new format.
 */
const create = () => {
  createFormat(name.value)
  name.value = ''
  emits('created')
}
</script>

<template>
  <BForm @submit.prevent="create">
    <BInput
      v-model="name"
      type="text"
      name="name"
      id="name"
      :label="t('format_name')"
      :placeholder="t('format')"
    />
    <BButton type="submit" :style="{ float: 'right' }">{{ t('save') }}</BButton>
  </BForm>
</template>
