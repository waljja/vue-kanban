import { createRouter, createWebHistory } from 'vue-router'
import StockKanbanView from '../views/kanban/StockKanbanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'index',
      component: StockKanbanView
    }
  ]
})

export default router
