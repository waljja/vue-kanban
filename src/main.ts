import { createApp } from 'vue'
// 主页
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

// 挂载主页
app.mount('#app')
