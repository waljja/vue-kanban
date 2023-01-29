import { createApp } from 'vue'
// 主页
import App from './App.vue'
// 路由
import router from './router'
// 后端数据获取
import axios from "./axios/axios";

import './assets/main.css'

const app = createApp(App)

// aixos 全局引入
app.config.globalProperties.$axios = axios

app.use(router)

// 挂载主页
app.mount('#app')
