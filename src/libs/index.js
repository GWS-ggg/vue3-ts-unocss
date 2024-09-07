import { defineAsyncComponent } from 'vue'

// 导出对象、这个对象有install方法，这样就可以通过app.use(options)来使用
export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')

    for (const [path, fn] of Object.entries(components)) {
      const componentFn = defineAsyncComponent(fn)

      const componentName = path.replace('./', '').split('/')[0]
      app.component(`m-${componentName}`, componentFn)
    }
  },
}
