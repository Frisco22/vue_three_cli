import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './pages/Home/index.vue'
import Demo1 from './pages/Demo/demo1.vue'
import Light from './pages/Demo/light.vue'
import Vein from './pages/Demo/vein.vue'


const routes = [
  {
    path: '/',
    name: '',
    redirect: '/index',
    meta: {
      title: '3D'
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Home,
    // component: () => import('./pages/Home/login.vue'), //Login,
    meta: {
      title: '3D'
    }
  },
  {
    path: '/demo1',
    name: 'Demo1',
    component: Demo1,
    // component: () => import('./pages/Home/login.vue'), //Login,
    meta: {
      title: '3D'
    }
  },
  {
    path: '/light',
    name: 'Light',
    component: Light,
    // component: () => import('./pages/Home/login.vue'), //Login,
    meta: {
      title: '3D'
    }
  },
  {
    path: '/vein',
    name: 'Vein',
    component: Vein,
    // component: () => import('./pages/Home/login.vue'), //Login,
    meta: {
      title: '3D'
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})
export default router
