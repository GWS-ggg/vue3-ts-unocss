import type { Product } from '@/types'
import { mjsgAppid, mjsgMjAppid } from '@/enum/const'
// 获取设备类型
export function getDeviceType(): string {
  const userAgent = navigator.userAgent.toLowerCase()
  if (/android/.test(userAgent)) {
    return 'Android'
  }
  else if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'iOS'
  }
  else if (/windows phone/.test(userAgent) || /windows/.test(userAgent)) {
    return 'Windows'
  }
  else if (/mac/.test(userAgent)) {
    return 'Mac'
  }
  else {
    return '未知设备'
  }
}

// 获取设备版本
export function getDeviceOSVersion(): string {
  const userAgent: string = navigator.userAgent
  let version: string = 'Unknown'

  if (/Android/i.test(userAgent)) {
    version = userAgent.match(/Android\s([0-9.]+)/)![1]
  }
  else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    version = userAgent.match(/OS\s([0-9_]+)/)![1].replace(/_/g, '.')
  }
  else if (/Windows Phone/i.test(userAgent)) {
    version = userAgent.match(/Windows Phone\s([0-9.]+)/)![1]
  }
  else if (/Windows NT/i.test(userAgent)) {
    version = userAgent.match(/Windows NT\s([0-9.]+)/)![1]
  }
  else if (/Mac OS X/i.test(userAgent)) {
    version = userAgent.match(/Mac OS X\s([0-9_]+)/)![1].replace(/_/g, '.')
  }
  return version
}

// 获取设备model
export function getDeviceModel(): string {
  let model: string = 'Unknown'

  if (/iPhone/i.test(navigator.userAgent)) {
    model = 'iPhone'
  }
  else if (/iPad/i.test(navigator.userAgent)) {
    model = 'iPad'
  }
  else if (/iPod/i.test(navigator.userAgent)) {
    model = 'iPod'
  }
  else if (/Android/i.test(navigator.userAgent)) {
    model = 'Android Device'
  }
  else if (/Windows Phone/i.test(navigator.userAgent)) {
    model = 'Windows Phone'
  }
  else if (/Windows NT/i.test(navigator.userAgent)) {
    model = 'Windows PC'
  }
  else if (/Mac OS X/i.test(navigator.userAgent)) {
    model = 'Mac'
  }
  return model
}

// 获取商品价格
export function getPriceStr(product: Product, currencyCode: string) {
  let result = `${currencyCode} ${Number(product.price) / 100}`
  const usdText = `(USD ${Number(product.usd) / 100})`
  result += `\n${usdText}`
  return result
}
// 名将三国返利配置
const mjGiftValue: Record<string, Record<string, number>> = {
  499: {
    10: 0,
    13: 3,
  },
  999: {
    10: 2,
    13: 7,
  },
  1399: {
    10: 0,
    13: 12,
  },
  1999: {
    10: 12,
    13: 0,
  },
  2499: {
    10: 27,
    13: 0,
  },
  2999: {
    10: 22,
    13: 36,
  },
  4999: {
    10: 52,
    13: 54,
  },
  9999: {
    10: 122,
    13: 130,
  },
  19999: {
    10: 204,
    13: 234,
  },
  29999: {
    10: 356,
    13: 406,
  },
}
// 获取赠送点券
export function getVoucherPoints(product: Product, currencyCode: string, rebate: number, appid: string) {
  let beforeValue = ''
  let result = ''
  let priceValue = 0
  let makeUpPoint = 0
  const rebateValue = 1 + (rebate || 0) / 100
  try {
    if (![mjsgMjAppid, mjsgAppid].includes(appid)) { // 非名将三国的走档位逻辑
      priceValue = Number(product.price) / 100
      const tempResult = Math.floor(priceValue * rebateValue)
      // if (tempResult > priceValue && appid !== ycwgAppid) { // 勇闯王国不显示角标
      //   makeUpPoint = tempResult - priceValue
      // }
      beforeValue = `${currencyCode} ${priceValue}`
      result = `${currencyCode} ${tempResult}`
    }
    else { // 名将三国返利写死
      const usdValue = product.usd
      priceValue = Number(product.price) / 100
      const tempResult = Math.floor(priceValue * 1.15)
      if (tempResult > priceValue) {
        makeUpPoint = mjGiftValue[usdValue][rebate]
      }
      beforeValue = `${currencyCode} ${priceValue}`
      result = `${currencyCode} ${tempResult}`
    }
  }
  catch (error) {
    console.error(error)
  }
  return {
    beforeValue,
    result,
    makeUpPoint,
  }
}

// 跳转链接
export function jumpUrl(url: string) {
  if (url && typeof url === 'string') {
    window.open(url)
  }
}
// 动态加载js文件
export function loadScript(url: string, params?: { [key: string]: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    if (params && typeof params === 'object' && Object.keys(params).length > 0) {
      for (const key in params) {
        script.setAttribute(key, params[key])
      }
    }
    script.async = true
    script.onload = () => {
      resolve()
    }
    script.onerror = (error) => {
      reject(error)
    }
    document.body.appendChild(script)
  })
}

export function getEnv() {
  if (location.origin.includes('mprogram.forevernine.com')) {
    return 'release'
  }
  else {
    return 'dev'
  }
}

// 时区
export function getTimezone(): string {
  const timezoneOffsetInMinutes = new Date().getTimezoneOffset()
  const hoursOffset = Math.abs(Math.floor(timezoneOffsetInMinutes / 60))
  const sign = timezoneOffsetInMinutes > 0 ? '-' : '+'
  const formattedOffset = `${sign}${hoursOffset}`
  return formattedOffset
}

// 复制
export function copyTextToClipboard(text: string): boolean {
  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed' // 确保在视口中固定位置
  document.body.appendChild(textarea) // 将 textarea 添加到文档中

  // 选中并复制文本
  textarea.select()
  const success = document.execCommand('copy')

  // 清理工作：移除 textarea
  document.body.removeChild(textarea)

  return success
}
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  tw: 'zh-TW',
  kr: 'ko-KR',
  en: 'en',
  de: 'de',
  fr: 'fr',
  jp: 'jp',
}
export function getLocalValue(country: string) {
  return COUNTRY_LOCALE_MAP[country] || 'zh-TW'
}

// 转换为html
export function convertToHtml(input: string): string {
  const lines = input.split('\n')
  let result = ''
  let inList = false

  const emailRegex = /([\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi
  const urlRegex = /(https?:\/\/\S+)/g

  for (const line of lines) {
    if (line.startsWith('-')) {
      if (!inList) {
        result += '<ul>'
        inList = true
      }
      result += `<li style="margin-left: 25px;">${line.slice(1).trim()}</li>`
    }
    else {
      if (inList) {
        result += '</ul>'
        inList = false
      }
      let formattedLine = line.replace(emailRegex, '<a href="mailto:$1">$1</a>')
      formattedLine = formattedLine.replace(urlRegex, '<a href="$1">$1</a>')
      result += `<div>${formattedLine}</div>`
    }
  }

  if (inList) {
    result += '</ul>'
  }
  return result
}
