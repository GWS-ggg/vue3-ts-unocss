import type { PaymethodType } from '@/types/index'
import { getDeviceType } from '@/utils/index'

// 根据设备类型过滤支付方式
export function filterPaymentMethods(payMethods: PaymethodType[]): PaymethodType[] {
  const deviceType = getDeviceType()
  if (deviceType === 'Android') {
    // 安卓过滤苹果支付
    return payMethods.filter(item => item.payType !== 23003)
  }
  else if (deviceType === 'iOS') {
    // 苹果过滤google支付
    return payMethods.filter(item => item.payType !== 23004)
  }
  return payMethods
}

// 根据档位返回不同的返利额度
export function getRebateAmount(level: number, levelMap: Record<string, number>): number {
  return levelMap[level] || 0
}

// 猪来了欧美版 appid
export const PGEuropeAppid = '1619260258402128'
