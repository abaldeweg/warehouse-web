<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  criteria: string | null
  sort: string | null
}

const props = defineProps<Props>()

const emits = defineEmits(['update:criteria', 'update:sort'])

const { t } = useI18n()

const criteriaModel = computed({
  get: () => props.criteria,
  set: (v: string) => emits('update:criteria', v),
})

const sortModel = computed({
  get: () => props.sort,
  set: (v: string | null) => emits('update:sort', v),
})
</script>

<template>
  <div class="options">
    <div class="option filter">
      <div class="icon">
        <BMaterialIcon>filter_alt</BMaterialIcon>
      </div>
      <div class="form">
        <BInput
          type="search"
          v-model="criteriaModel"
          name="criteria"
          id="criteria"
          :label="t('filter_by_name')"
          hideLabel
          :placeholder="t('filter_by_name')"
        />
      </div>
    </div>

    <div class="option sort">
      <div class="icon">
        <BMaterialIcon>sort_by_alpha</BMaterialIcon>
      </div>
      <div class="form">
        <BSelect
          v-model="sortModel"
          type="options"
          name="sort"
          id="sort"
          :label="t('sort_direction')"
          hideLabel
          :options="[
            { key: null, value: t('sort_none') },
            { key: 'asc', value: t('sort_asc') },
            { key: 'desc', value: t('sort_desc') },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.options {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter {
  flex: 1;
}

.icon {
  display: flex;
  align-items: center;
}

.form {
  flex: 1;
}

@media (min-width: 600px) {
  .options {
    flex-direction: row;
  }
  .sort {
    width: 33%;
  }
}
</style>
