import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './style.css';
import App from './App.vue';
import router from './router.js';
import pinia from './pinia.js';
import i18n from './i18n.js';

const sagaTheme = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                primary: {
                    color: '#6FD513',
                    inverseColor: '#20310f',
                    hoverColor: '#63bf11',
                    activeColor: '#57a90f'
                },
                highlight: {
                    background: '#6FD513',
                    focusBackground: '#63bf11',
                    color: '#20310f',
                    focusColor: '#20310f'
                }
            }
        }
    }
});

createApp(App)
    .use(pinia).use(router).use(i18n)
    .use(PrimeVue, { theme: { preset: sagaTheme, options: { darkModeSelector: false } } })
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-toolbar', Toolbar)
    .component('pv-select', Select)
    .component('pv-input-number', InputNumber)
    .component('pv-message', Message)
    .mount('#app');
