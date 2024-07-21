import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/property/:id',
      name: 'property',
      component: () => import('../views/PropertyView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      /* En las rutas de nuestro router podemos definir rutas hijas de
      otras rutas, asi el path sera una combinación de la path del padre
      mas la path de las rutas hijas. */
      children: [
        {
          path: 'properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: 'new',
          name: 'new-property',
          component: () => import('../views/admin/NewPropertyView.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit-property',
          component: () => import('../views/admin/EditPropertyView.vue')
        }
      ]
    }
  ]
})

/* Creamos un middleware para nuestro router, asi esta función se 
ejecutara antes de ingresar a cada ruta, de esta forma podemos por ejemplo
y como se ve en este ejemplo validar que un usuario este loggeado en el
sistema. */
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)
  
  if (requiresAuth) {
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      
      if (user) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

export default router
