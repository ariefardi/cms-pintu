import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Auth from '../pages/Auth'
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('layouts/MyLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Index.vue') }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})
