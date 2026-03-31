<script setup lang="ts">
import { useCondition } from '@/composables/conditions/useCondition'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['created'])

const { t } = useI18n()

const name = ref('')

const { createCondition } = useCondition()

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
      :label="t('new_condition')"
      hideLabel
      :placeholder="t('enter_condition_and_hit_enter')"
    />
  </BForm>
</template>
