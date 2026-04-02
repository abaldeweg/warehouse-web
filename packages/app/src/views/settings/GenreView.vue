<script setup lang="ts">
import GenreShow from '@/components/genre/GenreShow.vue'
import GenreCreate from '@/components/genre/GenreCreate.vue'
import { useGenres } from '@/composables/genre/useGenres'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'

const { t } = useI18n()

useHead({ title: t('genres') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { genres, criteria, filteredGenres, fetchGenres } = useGenres()
onMounted(() => {
  fetchGenres()
})
</script>

<template>
  <BContainer size="m">
    <AppToolbar>
      <template #left>
        <RouterLink :to="{ name: 'settings' }">&lang; {{ $t('back') }}</RouterLink>
      </template>
    </AppToolbar>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('genres') }}</h1>
    <p>{{ $t('genres_desc') }}</p>
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('create_genre') }}</h2>
    <GenreCreate @created="fetchGenres" />
  </BContainer>

  <BContainer size="m" v-if="genres && genres.length > 0">
    <h2>{{ $t('all_genres') }}</h2>
    <BInput type="search" v-model="criteria" :placeholder="$t('filter_by_name')" />
    <GenreShow
      v-for="item in filteredGenres"
      :key="item.id"
      :item="item"
      :isAdmin="user?.isAdmin ?? false"
    />
  </BContainer>
</template>
