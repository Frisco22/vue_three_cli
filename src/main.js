import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as THREE from 'three'
import * as TrackballControls from 'three-trackballcontrols'
import * as ThreeStats from 'three-stats'

Vue.config.productionTip = false
Vue.prototype.THREE = THREE
Vue.prototype.TrackballControls = TrackballControls
Vue.prototype.ThreeStats = ThreeStats

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
