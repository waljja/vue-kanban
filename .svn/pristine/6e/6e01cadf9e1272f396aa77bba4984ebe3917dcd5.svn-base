import { createApp } from 'vue'
// pinia状态管理
import { createPinia } from 'pinia'
// 主页
import App from './App.vue'
// 路由
import router from './router'

import './assets/main.css'

const pinia = createPinia
const app = createApp(App)

app.use(router).use(pinia)

// 挂载主页
app.mount('#app')
