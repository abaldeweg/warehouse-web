<script setup lang="ts">
import { useCondition } from '@/composables/conditions/useCondition'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['created'])

const { t } = useI18n()

const name = ref('')
const loading = ref(false)
const savedSuccess = ref(false)
const savedError = ref(false)

const { createCondition } = useCondition()

/**
 * Creates a new condition.
 */
const create = async () => {
  loading.value = true
  savedSuccess.value = false
  savedError.value = false

  try {
    await createCondition(name.value)
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
    {{ t('condition_created_successfully') }}
  </BAlert>

  <BAlert type="warning" v-if="savedError" closable>
    {{ t('condition_creation_failed') }}
  </BAlert>

  <BForm @submit.prevent="create">
    <BInput
      v-model="name"
      type="text"
      name="name"
      id="name"
      :label="t('condition_name')"
      :placeholder="t('condition')"
      required
    />
    <BButton design="text" :style="{ float: 'right' }" v-if="loading">
      <BSpinner size="s" />
    </BButton>
    <BButton type="submit" :style="{ float: 'right' }" v-if="!loading">{{ t('save') }}</BButton>
  </BForm>
</template>
