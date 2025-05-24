<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import AccountProfile from '@/components/account/Profile.vue'

const { t } = useI18n()

useHead({ title: t('account') })
</script>

<template>
  <BContainer size="s">
    <h1>{{ t('account') }}</h1>
  </BContainer>

  <BContainer size="s">
    <div class="card">
      <AccountProfile />
    </div>
  </BContainer>
</template>

<style scoped>
.card {
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  padding: 20px;
}
</style>
