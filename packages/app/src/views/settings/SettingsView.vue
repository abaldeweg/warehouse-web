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
    <BList :route="{ name: 'settings.branch' }" divider>
      <template #title>{{ $t('branch') }}</template>
    </BList>
    <BList :route="{ name: 'settings.inventory' }" divider>
      <template #title>{{ $t('inventory') }}</template>
    </BList>
    <BList :route="{ name: 'settings.condition' }" divider>
      <template #title>{{ $t('condition') }}</template>
    </BList>
    <BList :route="{ name: 'settings.format' }" divider>
      <template #title>{{ $t('format') }}</template>
    </BList>
    <BList :route="{ name: 'settings.genre' }" divider>
      <template #title>{{ $t('genre') }}</template>
    </BList>
    <BList :route="{ name: 'settings.tag' }" divider>
      <template #title>{{ $t('tags') }}</template>
    </BList>
  </BContainer>
</template>
