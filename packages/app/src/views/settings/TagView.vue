<script setup lang="ts">
import TagShow from '@/components/tag/TagShow.vue'
import TagCreate from '@/components/tag/TagCreate.vue'
import { useTags } from '@/composables/tags/useTags'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'
import OptionsFilterSort from '@/components/OptionsFilterSort.vue'

const { t } = useI18n()

useHead({ title: t('tags') })

const { user, fetchUser } = useToken()
const { tags, criteria, sort, isLoading, processedTags, listTags, counter } = useTags()

onMounted(async () => {
  await fetchUser()
  if (!user.value) return
  await listTags()
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
    <h1>{{ $t('tags') }} ({{ counter }})</h1>
    <p>{{ $t('tags_desc') }}</p>
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('create_tag') }}</h2>
    <TagCreate @created="listTags" />
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('all_tags') }}</h2>

    <BAlert type="info" v-if="!isLoading && (!tags || tags.length === 0)">
      {{ $t('no_tags_available') }}
    </BAlert>

    <div v-if="user && tags && tags.length > 0">
      <OptionsFilterSort v-model:criteria="criteria" v-model:sort="sort" />

      <TagShow
        v-for="tag in processedTags"
        :key="tag.id"
        :tag="tag"
        :isAdmin="user?.isAdmin ?? false"
      />
    </div>
  </BContainer>
</template>
