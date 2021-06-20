import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/Landing.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/flow',
    name: 'Flow',
    component: () => import('../views/Flow.vue')
  },
  {
    path: '/writemsg',
    name: 'WriteMsg',
    component: () => import('../views/WriteMsg.vue')
  },
  {
    path: '/deleted',
    name: 'Deleted',
    component: () => import('../views/Deleted.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
