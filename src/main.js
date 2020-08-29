import Vue from 'vue'
// import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App.vue'

Vue.config.productionTip = false

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     component: Home,
//     name: 'home',
//   },
//   {
//     path: '/about',
//     component: About,
//     name: 'about',
//   },
// ]

// const router = new VueRouter({
//   routes,
//   mode: 'history',
// })

new Vue({
  render: (h) => h(App),
  // router: router,
}).$mount('#app')
