<script setup lang="ts">
import { useFormat } from '@/composables/formats/useFormat.js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['created'])

const { t } = useI18n()

const name = ref('')
const loading = ref(false)
const savedSuccess = ref(false)
const savedError = ref(false)

const { createFormat } = useFormat()

/**
 * Creates a new format.
 */
const create = async () => {
  loading.value = true
  savedSuccess.value = false
  savedError.value = false

  try {
    await createFormat(name.value)
    savedSuccess.value = true
    name.value = ''
    emits('created')
  } catch {
    savedError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BAlert type="success" v-if="savedSuccess" closable>
    {{ t('format_created_successfully') }}
  </BAlert>

  <BAlert type="warning" v-if="savedError" closable>
    {{ t('format_creation_failed') }}
  </BAlert>

  <BForm @submit.prevent="create">
    <BInput
      v-model="name"
      type="text"
      name="name"
      id="name"
      :label="t('format_name')"
      :placeholder="t('format')"
      required
    />
    <BButton design="text" :style="{ float: 'right' }" v-if="loading">
      <BSpinner size="s" />
    </BButton>
    <BButton type="submit" :style="{ float: 'right' }" v-if="!loading">{{ t('save') }}</BButton>
  </BForm>
</template>
