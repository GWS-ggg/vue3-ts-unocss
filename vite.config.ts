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
    },
  },
})
