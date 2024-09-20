import type { App } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import zhCN from './locales/zh-cn'
import en from './locales/en'
import ja from './locales/ja'

const messages = {
  'zh-cn': zhCN,
  en,
  ja,
}
export type LocaleKey = keyof typeof messages

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zh-cn',
  fallbackLocale: 'en', // 语言缺少替补
  messages,
  legacy: false,
})

// main.ts中使用
export function setupI18n(app: App) {
  app.use(i18n)
}

export function t(key: string): string {
  const { t } = useI18n()
  return t(key) as string
}

// 用于设定在本地存储选择的语言类型
export function setLocale(locale: LocaleKey) {
  i18n.global.locale.value = locale
  localStorage.setItem('lang', locale)
}
export default i18n
