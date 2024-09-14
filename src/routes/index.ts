export default [
  {
    path: '/',
    name: 'Home',
    redirect: '/gameDetail', // 在vite.config.ts和tsconfig.json配置好路径别名Views
  },
  { path: '/gameHome', name: 'gameHome', component: () => import('Views/gameHome/index.vue') },
  {
    path: '/gameList',
    name: 'gameList',
    component: () => import('Views/gameList/index.vue'),
  },
  {
    path: '/payDetail/:title',
    name: 'payDetail',
    component: () => import('Views/payDetail/index.vue'),
    props: true, // 允许将路由参数作为 props 传递给组件
  },
  {
    path: '/payHub',
    name: 'payHub',
    component: () => import('Views/payHub/index.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('Views/test.vue'),
  },
  {
    path: '/gameDetail',
    name: 'gameDetail',
    component: () => import('Views/gameDetail/index.vue'),
  },
]
