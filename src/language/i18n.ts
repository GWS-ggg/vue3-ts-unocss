import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-cn'
import en from './locales/en'
import ja from './locales/ja'

const messages = {
  'zh-cn': zhCN,
  en,
  ja,
}
type LocaleKey = keyof typeof messages

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false,
})

// main.ts中使用
export function setupI18n(app: App) {
  app.use(i18n)
}

export function t(key: string) {
  return i18n.global.t(key)
}

// 用于设定在本地存储选择的语言类型
export function setLocale(locale: LocaleKey) {
  i18n.global.locale.value = locale
  localStorage.setItem('lang', locale)
}
