<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'

const { t } = useI18n()

useHead({ title: t('settings') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('settings_for_branch') }} "{{ user?.branch.name }}"</h1>
  </BContainer>

  <BContainer size="m">
    <BList :route="{ name: 'settings.branch' }" mediaSize="avatar" divider hover>
      <template #title>{{ $t('branch') }}</template>
      <template #media>
        <RouterLink :to="{ name: 'settings.branch' }">
          <BMaterialIcon>house</BMaterialIcon>
        </RouterLink>
      </template>
      <template #controls>
        <RouterLink :to="{ name: 'settings.branch' }">
          <BMaterialIcon>keyboard_arrow_right</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>

    <BList :route="{ name: 'settings.inventory' }" mediaSize="avatar" divider hover>
      <template #title>{{ $t('inventory') }}</template>
      <template #media>
        <RouterLink :to="{ name: 'settings.branch' }">
          <BMaterialIcon>inventory</BMaterialIcon>
        </RouterLink>
      </template>
      <template #controls>
        <RouterLink :to="{ name: 'settings.inventory' }">
          <BMaterialIcon>keyboard_arrow_right</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>

    <BList :route="{ name: 'settings.condition' }" mediaSize="avatar" divider hover>
      <template #title>{{ $t('condition') }}</template>
      <template #media>
        <RouterLink :to="{ name: 'settings.branch' }">
          <BMaterialIcon>diagnosis</BMaterialIcon>
        </RouterLink>
      </template>
      <template #controls>
        <RouterLink :to="{ name: 'settings.condition' }">
          <BMaterialIcon>keyboard_arrow_right</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>

    <BList :route="{ name: 'settings.format' }" mediaSize="avatar" divider hover>
      <template #title>{{ $t('format') }}</template>
      <template #media>
        <RouterLink :to="{ name: 'settings.branch' }">
          <BMaterialIcon>unknown_document</BMaterialIcon>
        </RouterLink>
      </template>
      <template #controls>
        <RouterLink :to="{ name: 'settings.format' }">
          <BMaterialIcon>keyboard_arrow_right</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>

    <BList :route="{ name: 'settings.genre' }" mediaSize="avatar" divider hover>
      <template #title>{{ $t('genre') }}</template>
      <template #media>
        <RouterLink :to="{ name: 'settings.branch' }">
          <BMaterialIcon>category</BMaterialIcon>
        </RouterLink>
      </template>
      <template #controls>
        <RouterLink :to="{ name: 'settings.genre' }">
          <BMaterialIcon>keyboard_arrow_right</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>

    <BList :route="{ name: 'settings.tag' }" mediaSize="avatar" divider hover>
      <template #title>{{ $t('tags') }}</template>
      <template #media>
        <RouterLink :to="{ name: 'settings.branch' }">
          <BMaterialIcon>label</BMaterialIcon>
        </RouterLink>
      </template>
      <template #controls>
        <RouterLink :to="{ name: 'settings.tag' }">
          <BMaterialIcon>keyboard_arrow_right</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>
  </BContainer>
</template>
