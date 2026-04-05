<script setup lang="ts">
import { onMounted } from 'vue'
import { useBranch } from '@/composables/branch/useBranch'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import AppToolbar from '@/components/AppToolbar.vue'

const { t } = useI18n()

useHead({ title: t('cleanup') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { cleanBooks } = useBranch()
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
    <h1>{{ $t('cleanup') }}</h1>
    <p>{{ $t('cleanup_desc') }}</p>
  </BContainer>

  <BContainer size="m">
    <BAlert variant="info" v-if="!user || !user.isAdmin">
      {{ t('only_admins_can_cleanup') }}
    </BAlert>

    <BButton design="outline_danger" @click="cleanBooks" v-if="user && user.isAdmin">
      {{ $t('clean_books') }}
    </BButton>
  </BContainer>
</template>
