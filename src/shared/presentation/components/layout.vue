<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import LanguageSwitcher from './language-switcher.vue';
const { t, locale } = useI18n();
const route = useRoute();
const logoFailed = ref(false);
const logoToken = import.meta.env.VITE_LOGO_DEV_TOKEN;
const logoUrl = logoToken ? 'https://img.logo.dev/falabella.com.pe?token=' + encodeURIComponent(logoToken) : '';
watch([locale, () => route.name], () => {
  document.documentElement.lang = locale.value;
  const title = route.name === 'home' ? 'home' : route.name === 'new-item' ? 'newItem' : 'notFound';
  document.title = 'Saga Tech Management - ' + t(title);
}, { immediate: true });
</script>
<template>
  <pv-toolbar class="app-toolbar">
    <template #start>
      <img v-if="logoUrl && !logoFailed" :src="logoUrl" alt="Saga Falabella Perú" class="brand-logo" @error="logoFailed = true" />
      <span v-else class="brand-name">falabella</span>
      <span class="app-title">Saga Tech Management</span>
    </template>
  </pv-toolbar>
  <div class="app-body">
    <aside class="sidebar">
      <nav :aria-label="t('menu')">
        <router-link to="/home">{{ t('home') }}</router-link>
        <router-link to="/laptop/items/new">{{ t('newItem') }}</router-link>
      </nav>
      <LanguageSwitcher />
    </aside>
    <main><router-view /></main>
  </div>
</template>
