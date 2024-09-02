import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
    },
  },
})
