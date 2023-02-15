import { createApp } from 'vue';
import './style.css';
import './index.css';
import './assets/propper.scss';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
//ele响应式
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';

import { createPinia } from 'pinia';
const pinia = createPinia();
import '@icon-park/vue-next/styles/index.css';

import '@/utils/extend';
import '@/assets/base.scss';
import '@/assets/theme.scss';

createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app');
