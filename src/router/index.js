import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Heroes from '../views/Heroes.vue'
import HeroProfil from '../views/HeroProfil.vue'
import NewHero from '../views/NewHero.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Heroes'
  },
  {
    path: '/Heroes',
    name: 'Heroes',
    component: Heroes
  },
  {
    path: '/Heroes/:id',
    name: 'HeroProfil',
    component: HeroProfil
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/AddHero',
    name: 'NewHero',
    component: NewHero
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
