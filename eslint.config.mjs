// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  extends: ['vue-global-api', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-console': 'off', // 关闭对 console 的限制
  },
})
