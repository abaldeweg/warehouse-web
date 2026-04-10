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

const settings = [
  {
    title: t('branch'),
    route: { name: 'settings.branch' },
    icon: 'house',
  },
  {
    title: t('cleanup'),
    route: { name: 'settings.cleanup' },
    icon: 'cleaning_services',
  },
  {
    title: t('inventory'),
    route: { name: 'settings.inventory' },
    icon: 'inventory',
  },
  {
    title: t('condition'),
    route: { name: 'settings.condition' },
    icon: 'diagnosis',
  },
  {
    title: t('format'),
    route: { name: 'settings.format' },
    icon: 'unknown_document',
  },
  {
    title: t('genre'),
    route: { name: 'settings.genre' },
    icon: 'category',
  },
  {
    title: t('tags'),
    route: { name: 'settings.tag' },
    icon: 'label',
  },
]
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('settings_for_branch') }} "{{ user?.branch.name }}"</h1>
  </BContainer>

  <BContainer size="m">
    <BList
      :route="setting.route"
      mediaSize="avatar"
      divider
      hover
      v-for="setting in settings"
      :key="setting.title"
    >
      <template #title>{{ setting.title }}</template>
      <template #media>
        <RouterLink :to="setting.route">
          <BMaterialIcon>{{ setting.icon }}</BMaterialIcon>
        </RouterLink>
      </template>
      <template #controls>
        <RouterLink :to="setting.route">
          <BMaterialIcon>keyboard_arrow_right</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>
  </BContainer>
</template>
