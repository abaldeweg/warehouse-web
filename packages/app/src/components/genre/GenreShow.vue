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
const hide = ref<boolean>(false)

const { deleteSuccess, deleteError, updateGenre, updateGenreDebounced, removeGenre } = useGenre()
</script>

<template>
  <BList v-if="deleteSuccess && !hide">
    <template #title>
      <span :style="{ textTransform: 'uppercase' }">{{ t('deleted') }}</span>
    </template>
    <template #controls>
      <BMaterialIcon @click="hide = true" :style="{ cursor: 'pointer' }">close</BMaterialIcon>
    </template>
  </BList>

  <BList divider v-if="!deleteSuccess && genre">
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
          @input="updateGenreDebounced(genre.id, name)"
        />
      </BForm>
    </template>

    <template #controls>
      <BDropdown v-if="isAdmin">
        <template #selector>
          <BMaterialIcon :style="{ cursor: 'pointer' }">more_vert</BMaterialIcon>
        </template>
        <BDropdownItem icon="delete" @click="removeGenre(genre.id)">
          {{ $t('delete_genre') }}
        </BDropdownItem>
      </BDropdown>
    </template>
  </BList>

  <BDialog v-model="deleteError">
    <p>{{ $t('genre_delete_error') }}</p>
    <template #actions>
      <BButton @click="deleteError = false">{{ $t('close') }}</BButton>
    </template>
  </BDialog>
</template>
