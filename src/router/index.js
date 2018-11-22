import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Auth from '../pages/Auth'
import Register from '../pages/Register'
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('layouts/MyLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Index.vue') },
        { path: '/blog', component: () => import('pages/Post.vue') },
        { path: '/blog-add', component: () => import('pages/PostAdd.vue') },
        { path: '/blog-edit/:id', component: () => import('pages/PostEdit.vue') },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
