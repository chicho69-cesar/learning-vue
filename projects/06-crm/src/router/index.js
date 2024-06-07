import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/ClientsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: { titleProp: 'Listado de Clientes' },
    },
    {
      path: '/add-client',
      name: 'add-client',
      component: () => import('../views/NewClientView.vue'),
      props: { titleProp: 'Agregar cliente' },
    },
    {
      path: '/edit-client/:id',
      name: 'edit-client',
      component: () => import('../views/EditClientView.vue'),
      props: { titleProp: 'Editar cliente' },
    },
  ],
})

export default router
