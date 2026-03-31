<script setup lang="ts">
import { useTag } from '@/composables/tags/useTag.js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['created'])

const { t } = useI18n()

const name = ref('')

const { createTag } = useTag()

const create = () => {
  createTag(name.value)
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
      :label="t('new_tag')"
      hideLabel
      :placeholder="t('enter_tag_and_hit_enter')"
    />
  </BForm>
</template>
