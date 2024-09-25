import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import postCssPxToRem from 'postcss-pxtorem'
// import pxtorom from '@minko-fe/postcss-pxtorem'
// Icons 自动按需引入图标库

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('swiper-'),
        },
      },
    }),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver(), IconsResolver({
        prefix: 'Icon',
      })],
    }),
    Components({
      resolvers: [
        // Ant Design Vue 4.x 自动按需引入组件
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
        ElementPlusResolver(),
        IconsResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'Assets': path.resolve(__dirname, 'src/assets'),
      'Components': path.resolve(__dirname, 'src/components'),
      'Utils': path.resolve(__dirname, 'src/utils'),
      'Views': path.resolve(__dirname, 'src/views'),
      'Routes': path.resolve(__dirname, 'src/routes'),
      'Config': path.resolve(__dirname, 'src/config'),
      'Plugins': path.resolve(__dirname, 'src/plugins'),
      'Store': path.resolve(__dirname, 'src/store'),
      'Api': path.resolve(__dirname, 'src/api'),
    },
  },
  // server: {
  //   port: 3000, // 本地开发服务端口
  //   proxy: {
  //     '/API': {
  //       target: 'http://127.0.0.3:62000', // 要代理的地址
  //       changeOrigin: true,
  //       followRedirects: true, // Cookie支持重定向
  //       rewrite(path) { return path.replace(/^\/API/, '') },
  //     },
  //   },
  // },
  server: {
    https: false,
    // Listening on all local IPs
    host: true,
    port: 5173,
    // Load proxy configuration from .env
    proxy: {
      '/box': {
        target: 'https://mprogram-test.forevernine.com/',
        changeOrigin: true,
      },
      '/wxpay': {
        target: 'https://mprogram-test.forevernine.com/',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'ESNext',
    minify: 'esbuild',
    // rollup 配置
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
    },
  },
  esbuild: {
    drop: [
      'console', // 如果线上需要打印，就把这行注释掉
      'debugger',
    ],
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 100, // 这里代表的是1rem等于多少rootValue的px。75表示750设计稿，37.5表示375设计稿
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ['norem', 'ignore'], // 过滤掉norem-开头的class，不进行rem转换
          mediaQuery: false, // 允许在媒体查询中转换 px
          exclude: (e) => { // 只对src/views/gameDetail文件进行px转rem，其他文件不转换
            if (/src\/views\/gameDetail/.test(e)) {
              return false
            }
            else {
              return false
            }
          },
        }),
      ],
    },
  },
})
