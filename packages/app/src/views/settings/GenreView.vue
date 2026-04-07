<script setup lang="ts">
import GenreShow from '@/components/genre/GenreShow.vue'
import GenreCreate from '@/components/genre/GenreCreate.vue'
import { useGenres } from '@/composables/genre/useGenres'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { computed, onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'

const { t } = useI18n()

useHead({ title: t('genres') })

const { user, fetchUser } = useToken()
const { genres, criteria, sort, isLoading, processedGenres, fetchGenres } = useGenres()

const counter = computed(() => {
  if (!genres.value) return 0
  return genres.value.length
})

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

    <BAlert variant="info" v-if="user && !user?.isAdmin">
      <p>{{ $t('only_admin_can_create_genres') }}</p>
    </BAlert>

    <GenreCreate @created="fetchGenres" v-if="user?.isAdmin" />
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('all_genres') }}</h2>

    <BAlert variant="info" v-if="!isLoading && (!genres || genres.length === 0)">
      <p>{{ $t('no_genres_available') }}</p>
    </BAlert>

    <div v-if="user && genres && genres.length > 0">
      <div class="options">
        <div class="option filter">
          <div class="icon">
            <BMaterialIcon>filter_alt</BMaterialIcon>
          </div>
          <div class="form">
            <BInput
              type="search"
              v-model="criteria"
              name="criteria"
              id="criteria"
              :label="$t('filter_by_name')"
              hideLabel
              :placeholder="$t('filter_by_name')"
            />
          </div>
        </div>
        <div class="option sort">
          <div class="icon">
            <BMaterialIcon>sort_by_alpha</BMaterialIcon>
          </div>
          <div class="form">
            <BSelect
              v-model="sort"
              type="options"
              name="sort"
              id="sort"
              :label="$t('sort_direction')"
              hideLabel
              :options="[
                { key: null, value: $t('sort_none') },
                { key: 'asc', value: $t('sort_asc') },
                { key: 'desc', value: $t('sort_desc') },
              ]"
            />
          </div>
        </div>
      </div>

      <GenreShow
        v-for="genre in processedGenres"
        :key="genre.id"
        :genre="genre"
        :isAdmin="user?.isAdmin ?? false"
      />
    </div>
  </BContainer>
</template>

<style scoped>
.options {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter {
  flex: 1;
}

.option .icon {
  display: flex;
  align-items: center;
}

.option .form {
  flex: 1;
}

@media (min-width: 600px) {
  .options {
    flex-direction: row;
  }
  .sort {
    width: 33%;
  }
}
</style>
