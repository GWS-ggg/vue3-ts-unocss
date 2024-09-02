import { createApp } from 'vue'
import './style.css'
import { setupRouter } from 'Plugins/router'
import App from './App.vue'
import 'vue-global-api'

// createApp(App)
//   .use(router)
//   .mount('#app');

const app = createApp(App)

async function setupApp() {
  // 挂载路由
  await setupRouter(app)

  app.mount('#app')
}

setupApp()
