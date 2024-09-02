import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export async function routerBeforeEachFunc(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  // 路由进入前的操作

  next()
}

export function routerAfterEachFunc(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  // 路由进入后的操作
  console.log('Navigated to:', to.path) // 使用 to 参数
  console.log('Navigated from:', from.path) // 使用 from 参数
}
