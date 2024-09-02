import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Ant Design Vue 4.x 自动按需引入组件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // Ant Design Vue 4.x 自动按需引入组件
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'Assets': path.resolve(__dirname, 'src/assets'),
      'Components': path.resolve(__dirname, 'src/components'),
      'Utils': path.resolve(__dirname, 'src/utils'), // 工具类方法（新创建的）
      'Views': path.resolve(__dirname, 'src/views'),
      'Routes': path.resolve(__dirname, 'src/routes'),
      'Config': path.resolve(__dirname, 'src/config'),
      'Plugins': path.resolve(__dirname, 'src/plugins'),
      'Store': path.resolve(__dirname, 'src/store'),
      'Api': path.resolve(__dirname, 'src/api'),
    },
  },
  server: {
    port: 3000, // 本地开发服务端口
    proxy: {
      '/API': {
        target: 'http://127.0.0.3:62000', // 要代理的地址
        changeOrigin: true,
        followRedirects: true, // Cookie支持重定向
        rewrite: path => path.replace(/^\/API/, ''),
      },
    },
  },
})
