<script setup lang="ts">
import GenreShow from '@/components/genre/GenreShow.vue'
import GenreCreate from '@/components/genre/GenreCreate.vue'
import { useGenres } from '@/composables/genre/useGenres'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'

const { t } = useI18n()

useHead({ title: t('genres') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { genres, fetchGenres } = useGenres()
onMounted(() => {
  fetchGenres()
})
</script>

<template>
  <BContainer size="m">
    <RouterLink :to="{ name: 'settings' }">&lang; {{ $t('back') }}</RouterLink>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('genres') }}</h1>
    <p>{{ $t('genres_desc') }}</p>
  </BContainer>

  <BContainer size="m" v-if="genres && genres.length > 0">
    <GenreShow
      v-for="item in genres"
      :key="item.id"
      :item="item"
      :isAdmin="user?.isAdmin ?? false"
    />
  </BContainer>

  <BContainer size="m">
    <GenreCreate @created="fetchGenres" />
  </BContainer>
</template>
