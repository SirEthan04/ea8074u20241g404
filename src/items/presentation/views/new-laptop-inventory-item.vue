<script setup>
import { useI18n } from 'vue-i18n';
import LaptopInventoryItemForm from '../components/laptop-inventory-item-form.vue';
const { t } = useI18n();
</script>
<template>
  <section>
    <h1>{{ t('newItem') }}</h1>
    <p>{{ t('subtitle') }}</p>
    <LaptopInventoryItemForm />
  </section>
</template>
