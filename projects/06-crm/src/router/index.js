import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/ClientsView.vue'

/* Creamos un router para definir las rutas de nuestra pagina web */
const router = createRouter({
  /* Definimos el manejo del historial */
  history: createWebHistory(import.meta.env.BASE_URL),
  /* Definimos las rutas de nuestra aplicación */
  routes: [
    /* Cada ruta definida debe de tener un path, un nombre de la ruta, 
    el componente que se va a renderizar en la ruta y ademas le podemos pasar
    las props que recibe el componente. */
    {
      path: '/',
      name: 'home',
      component: Home,
      props: { titleProp: 'Listado de Clientes' },
    },
    /* En las rutas también podemos definir importaciones dinámicas para
    los componentes y de esta forma aumentar el rendimiento. */
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
