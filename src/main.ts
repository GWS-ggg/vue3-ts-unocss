import 'virtual:uno.css'
import { createApp } from 'vue'
import { setupRouter } from 'Plugins/router'
import { setupStore } from 'Store/index'
import App from './App.vue'
import 'vue-global-api'

// createApp(App)
//   .mount('#app')

const app = createApp(App)

async function setupApp() {
  // 挂载pinia状态管理
  setupStore(app)
  // 挂载路由
  await setupRouter(app)

  app.mount('#app')
}

setupApp()
