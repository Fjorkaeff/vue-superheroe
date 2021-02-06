import Vue from 'vue'
import VueRouter from 'vue-router'
import Acceuil from '../views/Acceuil.vue'
import Heroes from '../views/Heroes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:lang',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/',
        name: 'Acceuil',
        component: Acceuil
      },
      {
        path: '/Heroes',
        name: 'Heroes',
        component: Heroes
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
