<script setup lang="ts">
import type { Book } from '@/types/model/book'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ products: Book[] }>()

const emit = defineEmits<{
  (event: 'remove'): void
  (event: 'remove-product', productId: string): void
}>()

const { t } = useI18n()

const catalog = import.meta.env.VITE_CATALOG

const currency = (number: number): string => {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'EUR',
  }).format(number)
}

const sum = computed(() => {
  return props.products.reduce((prev, cur) => {
    return prev + cur.price
  }, 0)
})
</script>

<template>
  <h2>{{ $t('products') }}</h2>

  <BAlert v-if="products.length === 0" type="warning">
    <div class="table_alert">
      {{ $t('no_products_in_reservation_found') }}
      <BButton design="text_danger" @click="emit('remove')" :style="{ float: 'right' }">{{
        t('delete_reservation')
      }}</BButton>
    </div>
  </BAlert>

  <BTable v-else>
    <table>
      <thead>
        <tr>
          <th>{{ $t('title') }}</th>
          <th>{{ $t('author') }}</th>
          <th>{{ $t('genre') }}</th>
          <th class="alignRight">{{ $t('price') }}</th>
          <th class="alignRight actions" width="24"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>
            <a :href="catalog + '/search/book/' + product.id">
              {{ product.title }}
            </a>
            <span v-if="product.sold"> - {{ $t('sold') }}</span>
            <span v-if="product.removed"> - {{ $t('removed') }}</span>
          </td>
          <td>{{ product.author.surname }}, {{ product.author.firstname }}</td>
          <td>{{ product.genre.name }}</td>
          <td class="alignRight">{{ currency(product.price) }}</td>
          <td class="alignRight actions">
            <BTooltip position="left" :text="t('remove_from_reservation')">
              <BMaterialIcon @click="emit('remove-product', product.id)" hover color="var(--color-accent-red-10)">cancel
              </BMaterialIcon>
            </BTooltip>
          </td>
        </tr>
      </tbody>

      <tfoot class="sum">
        <tr>
          <td colspan="3">
            {{ $t('grand_total') }}
          </td>
          <td class="alignRight">{{ currency(sum) }}</td>
          <td class="actions"></td>
        </tr>
      </tfoot>
    </table>
  </BTable>
</template>

<style scoped>
.sum {
  font-weight: bold;
}

.alignRight {
  text-align: right;
}

.table_alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media print {
  .actions {
    display: none;
  }
}
</style>
