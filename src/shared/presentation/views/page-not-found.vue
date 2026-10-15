<script setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
const route = useRoute();
const { t } = useI18n();
</script>
<template>
  <section>
    <h1>{{ t('notFound') }}</h1>
    <p>{{ t('notFoundMessage') }} <strong>{{ route.fullPath }}</strong></p>
    <router-link to="/home"><pv-button :label="t('backHome')" /></router-link>
  </section>
</template>
