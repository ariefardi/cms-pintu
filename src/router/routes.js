
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/auth',
    component: () => import('pages/Auth.vue')
  },
  { path: "*", redirect: '/404' }
]

