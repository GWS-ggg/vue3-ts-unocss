import type { MyCardOrderRes, MyCardTypeList, MyCardTypeReq, OrderReq, OrderStatusReq, OrderStatusRes, PaymethodType, Product, UserInfo } from '../types'
import request from '@/utils/request'
// 获取MYCARD支付方式列表
export function myCardTypeApi(params: MyCardTypeReq): Promise<MyCardTypeList> {
  return request({
    url: '/wxpay/mycard/pay_type',
    method: 'get',
    params,
  })
}

// mycard和paypal支付下单
export function myCardOrderApi(params: OrderReq): Promise<MyCardOrderRes> {
  return request({
    url: '/wxpay/pay/order',
    method: 'post',
    params,
  })
}

// 初始化H5支付页信息
export function initH5PayApi(params: {
  appid: string
}): Promise<{
    bannerUrl: string
    PCurrency: string
    pClientId: string
    name: string
    guide: string[]
  }> {
  return request({
    url: '/box/site/init',
    method: 'post',
    params,
  })
}

// 获取用户及商品信息
export function getPayDataApi(params: {
  appid: string
  uid: string
}): Promise<{
    user: UserInfo
    currencyCode: string
    gameUrl: string
    goods: Product[]
    goods1: Product[]
    goods2: Product[]
    payChannelList: PaymethodType[]
    levels: Record<string, number>
    line: string
  }> {
  return request({
    url: '/box/site/uid/verify',
    method: 'post',
    params,
  })
}

// 查询订单状态接口
export function orderStasuApi(params: OrderStatusReq): Promise<OrderStatusRes> {
  return request({
    url: '/wxpay/site/qr_status',
    method: 'get',
    params,
  })
}

// paypal回调通知服务器
export function paypalSettleApi(params: {
  orderid: string
  fntype14: string
  status: 0 | 1 | 3
}): Promise<void> {
  return request({
    url: '/wxpay/paypal/settle',
    method: 'post',
    params,
  })
}

// 数据上报
export function reportApi(params: {
  tz: string
  ts: number
  os: string
  os_v: string
  model: string
  manufacturer: string
  lang?: string
  appid: string
  mappid: string
  zone_id?: string
  role_id?: string
  fn_uid?: string
  evt: string
  trackAction: string
  trackSrc: string
  payChannel?: string
  orderId?: string
  productId?: string
}): Promise<void> {
  return request({
    url: '/box/stats_sdk_new',
    method: 'post',
    params,
  })
}
