<script setup lang="ts">
import GenreShow from '@/components/genre/GenreShow.vue'
import GenreCreate from '@/components/genre/GenreCreate.vue'
import OptionsFilterSort from '@/components/OptionsFilterSort.vue'
import { useGenres } from '@/composables/genre/useGenres'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'

const { t } = useI18n()

useHead({ title: t('genres') })

const { user, fetchUser } = useToken()
const { genres, criteria, sort, isLoading, processedGenres, fetchGenres, counter } = useGenres()

onMounted(async () => {
  await fetchUser()
  if (!user.value) return
  await fetchGenres()
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
    <h1>{{ $t('genres') }} ({{ counter }})</h1>
    <p>{{ $t('genres_desc') }}</p>
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('create_genre') }}</h2>

    <BAlert type="info" v-if="user && !user?.isAdmin">
      {{ $t('only_admin_can_create_genres') }}
    </BAlert>

    <GenreCreate @created="fetchGenres" v-if="user?.isAdmin" />
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('all_genres') }}</h2>

    <BAlert type="info" v-if="!isLoading && (!genres || genres.length === 0)">
      <p>{{ $t('no_genres_available') }}</p>
    </BAlert>

    <div v-if="user && genres && genres.length > 0">
      <OptionsFilterSort v-model:criteria="criteria" v-model:sort="sort" />

      <GenreShow
        v-for="genre in processedGenres"
        :key="genre.id"
        :genre="genre"
        :isAdmin="user?.isAdmin ?? false"
      />
    </div>
  </BContainer>
</template>
