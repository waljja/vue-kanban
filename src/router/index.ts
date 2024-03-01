import { createRouter, createWebHistory } from 'vue-router'
import StockKanbanViewCN from '../views/kanban/StockKanbanViewCN.vue'
import ShipmentKanbanViewCN from '../views/kanban/ShipmentKanbanViewCN.vue';
import StockKanbanViewVN from '../views/kanban/StockKanbanViewVN.vue'
import ShipmentKanbanViewVN from '../views/kanban/ShipmentKanbanViewVN.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/stock-kanban-cn',
      name: 'StockKanbanViewCN',
      component: StockKanbanViewCN
    },
    {
      path: '/shipment-kanban-cn',
      name: 'ShipmentKanbanViewCN',
      component: ShipmentKanbanViewCN
    },
    {
      path: '/stock-kanban-vn',
      name: 'StockKanbanViewVN',
      component: StockKanbanViewVN
    },
    {
      path: '/shipment-kanban-vn',
      name: 'ShipmentKanbanViewVN',
      component: ShipmentKanbanViewVN
    }
  ]
})

export default router
