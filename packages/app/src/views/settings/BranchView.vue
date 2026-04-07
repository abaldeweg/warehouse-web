<script setup lang="ts">
import { onMounted, watch } from 'vue'
import BranchEdit from '@/components/branch/BranchEdit.vue'
import BranchShow from '@/components/branch/BranchShow.vue'
import { useBranch } from '@/composables/branch/useBranch'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import AppToolbar from '@/components/AppToolbar.vue'

const { t } = useI18n()

useHead({ title: t('branch') })

const { user, fetchUser } = useToken()
const { branch, isSaving, savedSuccess, savedError, fetchBranch, updateBranch } = useBranch()

onMounted(async () => {
  await fetchUser()
  const id = user?.value?.branch?.id
  if (id) await fetchBranch(id)
})

watch(isSaving, (newVal, oldVal) => {
  if (oldVal && !newVal && typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
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
    <h1>{{ $t('branch') }}</h1>

    <BAlert type="success" v-if="savedSuccess" closable>
      {{ t('branch_updated_successfully') }}
    </BAlert>

    <BAlert type="warning" v-if="savedError" closable>
      {{ t('branch_update_failed') }}
    </BAlert>
  </BContainer>

  <BContainer size="m" v-if="branch && user && user.isAdmin">
    <BranchEdit
      :branch="branch"
      :user="user"
      :is-saving="isSaving"
      @update="updateBranch"
    />
  </BContainer>

  <BranchShow :branch="branch" v-if="branch && user && !user.isAdmin" />
</template>
