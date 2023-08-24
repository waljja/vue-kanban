import { createRouter, createWebHistory } from 'vue-router'
import StockKanbanView from '../views/kanban/StockKanbanView.vue'
import ShipmentKanbanView from '../views/kanban/ShipmentKanbanView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/stock-kanban',
      name: 'StockKanbanView',
      component: StockKanbanView
    },
    {
      path: '/shipment-kanban',
      name: 'ShipmentKanbanView',
      component: ShipmentKanbanView
    }
  ]
})

export default router
