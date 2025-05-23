<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Login from '@/components/auth/Login.vue'
import { useHead } from '@unhead/vue'

const { t } = useI18n()

useHead({ title: t('login') })
</script>

<template>
  <BContainer size="s">
    <h1>{{ t('login') }}</h1>
  </BContainer>

  <BContainer size="s">
    <Login />
  </BContainer>
</template>
