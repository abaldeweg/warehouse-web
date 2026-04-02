<script setup lang="ts">
import { onMounted } from 'vue'
import BranchEdit from '@/components/branch/BranchEdit.vue'
import BranchCleanBooks from '@/components/branch/BranchCleanBooks.vue'
import BranchPriceCalculator from '@/components/branch/BranchPriceCalculator.vue'
import { useBranch } from '@/composables/branch/useBranch'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'

const { t } = useI18n()

useHead({ title: t('branch') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})
const { branch, fetchBranch, updateBranch, cleanBooks } = useBranch()
onMounted(() => {
  fetchBranch(user?.value?.branch?.id || 0)
})
</script>

<template>
  <BContainer size="m">
    <RouterLink :to="{ name: 'settings' }">&lang; {{ $t('back') }}</RouterLink>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('branch') }}</h1>
  </BContainer>

  <BContainer size="m" v-if="user">
    <h2>{{ $t('common') }}</h2>
    <BranchEdit :branch="user.branch" :me="user" @update="updateBranch" />
  </BContainer>

  <BContainer size="m" v-if="user && user.isAdmin">
    <h2>{{ $t('clean_up') }}</h2>
    <p>{{ $t('clean_up_desc') }}</p>
    <BranchCleanBooks @clean="cleanBooks" />
  </BContainer>

  <BContainer size="m">
    <h3>{{ $t('pricelist') }}</h3>
    <p>{{ $t('pricelist_desc') }}</p>
    <BranchPriceCalculator :branch="branch" :user="user" @update="updateBranch" v-if="user" />
  </BContainer>
</template>
