<script setup lang="ts">
import type { Book } from '@/types/model/book'
import { computed } from 'vue'

const props = defineProps<{ products: Book[] }>()

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

  <BTable>
    <table>
      <thead>
        <tr>
          <th>{{ $t('title') }}</th>
          <th>{{ $t('author') }}</th>
          <th>{{ $t('genre') }}</th>
          <th class="alignRight">{{ $t('price') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>
            {{ product.title }}
          </td>
          <td>{{ product.author.surname }}, {{ product.author.firstname }}</td>
          <td>{{ product.genre.name }}</td>
          <td class="alignRight">{{ currency(product.price) }}</td>

        </tr>
      </tbody>

      <tfoot class="sum">
        <tr>
          <td colspan="3">
            {{ $t('grand_total') }}
          </td>
          <td class="alignRight">{{ currency(sum) }}</td>
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
</style>
