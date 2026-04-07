<script setup lang="ts">
import { useCondition } from '@/composables/conditions/useCondition'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Condition } from '@/types/model/condition'

interface Props {
  condition: Condition
  isAdmin: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const name = ref(props.condition.name)
const hide = ref<boolean>(false)

const { deleteSuccess, deleteError, updateCondition, removeCondition } = useCondition()
</script>

<template>
  <BList v-if="deleteSuccess && !hide">
    <template #title>
      <span :style="{ textTransform: 'uppercase' }">{{ t('deleted') }}</span>
    </template>
    <template #controls>
      <BMaterialIcon @click="hide = true" :style="{ cursor: 'pointer' }">close</BMaterialIcon>
    </template>
  </BList>

  <BList divider v-if="!deleteSuccess && condition">
    <template #title>
      <span v-if="!isAdmin">{{ condition.name }}</span>

      <BForm @submit.prevent="updateCondition(condition.id, name)" v-if="isAdmin">
        <BInput
          v-model="name"
          type="text"
          name="name"
          id="name"
          :label="t('condition_name')"
          hideLabel
          @input="updateCondition(condition.id, name)"
        />
      </BForm>
    </template>

    <template #controls>
      <BDropdown v-if="isAdmin">
        <template #selector>
          <BMaterialIcon :style="{ cursor: 'pointer' }">more_vert</BMaterialIcon>
        </template>
        <BDropdownItem icon="delete" @click="removeCondition(condition.id)">
          {{ $t('delete_item') }}
        </BDropdownItem>
      </BDropdown>
    </template>
  </BList>

  <BDialog v-model="deleteError">
    <p>{{ $t('condition_delete_error') }}</p>
    <template #actions>
      <BButton @click="deleteError = false">{{ $t('close') }}</BButton>
    </template>
  </BDialog>
</template>
