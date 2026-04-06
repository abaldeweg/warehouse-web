<script setup lang="ts">
import { useGenre } from '@/composables/genre/useGenre'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Genre } from '@/types/model/genre'

interface Props {
  genre: Genre
  isAdmin: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const name = ref(props.genre.name)

const { updateGenre, removeGenre } = useGenre()
</script>

<template>
  <BList divider v-if="genre">
    <template #title>
      <span v-if="!isAdmin">{{ genre.name }}</span>

      <BForm @submit.prevent="updateGenre(genre.id, name)" v-if="isAdmin">
        <BInput
          v-model="name"
          type="text"
          name="name"
          id="name"
          :label="t('genre_name')"
          hideLabel
          @input="updateGenre(genre.id, name)"
        />
      </BForm>
    </template>

    <template #controls>
      <BDropdown v-if="isAdmin">
        <template #selector>
          <BMaterialIcon :style="{ cursor: 'pointer' }">more_vert</BMaterialIcon>
        </template>
        <BDropdownItem icon="delete" @click="removeGenre(genre.id)">
          {{ $t('delete_item') }}
        </BDropdownItem>
      </BDropdown>
    </template>
  </BList>
</template>
