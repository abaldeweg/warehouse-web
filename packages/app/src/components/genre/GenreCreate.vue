<script setup lang="ts">
import { useGenre } from '@/composables/genre/useGenre'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['created'])

const { t } = useI18n()

const name = ref('')

const { createGenre } = useGenre()

/**
 * Creates a new genre.
 */
const create = () => {
  createGenre(name.value)
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
      :label="t('genre_name')"
      :placeholder="t('genre')"
    />
    <BButton type="submit" :style="{ float: 'right' }">{{ t('save') }}</BButton>
  </BForm>
</template>
