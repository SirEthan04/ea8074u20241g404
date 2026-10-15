<script setup>
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
</script>
<template>
  <div class="language-switcher">
    <pv-button v-for="language in ['en', 'es']" :key="language" :label="language.toUpperCase()"
               :outlined="locale !== language" :aria-pressed="locale === language" @click="locale = language" />
  </div>
</template>
