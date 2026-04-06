<script setup lang="ts">
import { useCondition } from '@/composables/conditions/useCondition'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['created'])

const { t } = useI18n()

const name = ref('')

const { createCondition } = useCondition()

/**
 * Creates a new condition.
 */
const create = () => {
  createCondition(name.value)
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
      :label="t('condition_name')"
      :placeholder="t('condition')"
    />
    <BButton type="submit" :style="{ float: 'right' }">{{ t('save') }}</BButton>
  </BForm>
</template>
