<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import ChangePassword from '@/components/account/ChangePassword.vue'

const { t } = useI18n()

useHead({ title: t('update_password') })
</script>

<template>
  <BContainer size="s">
    <RouterLink :to="{ name: 'account' }">&lang; {{ t('account') }}</RouterLink>
  </BContainer>

  <BContainer size="s">
    <h1>{{ t('update_password') }}</h1>
  </BContainer>

  <BContainer size="s">
    <ChangePassword />
  </BContainer>
</template>
