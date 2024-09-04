export default [
	{
		path: '/',
		name: 'Home',
		component: () => import('Views/gameHome/index.vue'), // 在vite.config.ts和tsconfig.json配置好路径别名Views
	},
	{ path: '/home', redirect: '/' },
	{
		path: '/gameList',
		name: 'gameList',
		component: () => import('Views/gameList/index.vue'),
	},
	{
		path: '/gameDetail',
		name: 'gameDetail',
		component: () => import('Views/gameDetail/index.vue'),
	},
	{
		path: '/payHub',
		name: 'payHub',
		component: () => import('Views/payHub/index.vue'),
	},
]
