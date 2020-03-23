import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import  './icons/index';
// import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(ElementUi)
// Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
