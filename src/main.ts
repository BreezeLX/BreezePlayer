import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import '@/assets/index.scss';
import '@icon-park/vue-next/styles/index.css';
import '@/utils/extend';
// import '@/assets/style.css';
//引入tailwind
import 'tailwindcss/tailwind.css';
//ele响应式
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
import { createPinia } from 'pinia';
const pinia = createPinia();
createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app');
