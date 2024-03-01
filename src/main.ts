import { createApp } from 'vue'
// pinia状态管理
import { createPinia } from 'pinia'
// 主页
import App from './App.vue'
// 路由
import router from './router'
// 国际化
import i18n from "./i18n";

import './assets/main.css'

const pinia = createPinia
const app = createApp(App)

app.use(router).use(pinia).use(i18n)

// 挂载主页
app.mount('#app')
