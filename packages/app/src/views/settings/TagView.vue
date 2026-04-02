<script setup lang="ts">
import TagShow from '@/components/tag/TagShow.vue'
import TagCreate from '@/components/tag/TagCreate.vue'
import { useTags } from '@/composables/tags/useTags.js'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'

const { t } = useI18n()

useHead({ title: t('tags') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { tags, listTags } = useTags()
onMounted(() => {
  listTags()
})
</script>

<template>
  <BContainer size="m">
    <RouterLink :to="{ name: 'settings' }">&lang; {{ $t('back') }}</RouterLink>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('tags') }}</h1>
    <p>{{ $t('tags_desc') }}</p>
  </BContainer>

  <BContainer size="m" v-if="tags && tags.length > 0">
    <TagShow v-for="item in tags" :key="item.id" :item="item" :isAdmin="user?.isAdmin ?? false" />
  </BContainer>

  <BContainer size="m">
    <TagCreate @created="listTags" />
  </BContainer>
</template>
