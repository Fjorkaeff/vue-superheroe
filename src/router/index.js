import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Heroes from '../views/Heroes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Heroes',
    component: Heroes
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
