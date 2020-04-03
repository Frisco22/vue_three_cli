import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './pages/Home/index.vue'
import QC from './pages/Home/qc.vue'

import Demo1 from './pages/Demo/demo1.vue'
import Light from './pages/Demo/light.vue'
import Vein from './pages/Demo/vein.vue'
import LoadModel from './pages/Demo/loadModel.vue'


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
    meta: {
      title: '3D'
    }
  },
  {
    path: '/light',
    name: 'Light',
    component: Light,
    meta: {
      title: '3D'
    }
  },
  {
    path: '/vein',
    name: 'Vein',
    component: Vein,
    meta: {
      title: '3D'
    }
  },
  {
    path: '/loadModel',
    name: 'LoadModel',
    component: LoadModel,
    meta: {
      title: '3D'
    }
  },
  {
    path: '/qc',
    name: 'QC',
    component: QC,
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
