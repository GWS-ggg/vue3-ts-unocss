export interface Product {
  title: string
  pid: string
  img: string
  usd: string
  twd: string
  krw?: string
  price: string
}
export interface ReqBaseParams {
  appid: string
  version: string
  fn_uid: string
  fn_deviceid: string
  zoneid: number
  roleid: string
  is_gs: number
  token: string
  os: string
  game_platform?: 'app' | 'h5'
  ts: number
}
export interface UserInfo {
  nick: string
  uid: string
  zoneid: string
  roleid: string
  fnuid: string
}
export interface PayInfo extends Record<string, string | number | undefined> {
  price: string
  params: string
  desc: string
  pid: string
  title: string
  game_appid: string
  game_openid: string
  content_type: string
  trade_type?: string
  method?: string
  zone_id: number
  role_id: string
}
export type OrderReq = PayInfo & ReqBaseParams
export interface MyCardOrderRes {
  fntype14: string
  orderid: string
  paymethod: string
}

export interface MyCardTypeReq {
  appid: string
  currency: string
  amount: number
}

export interface MyCardType {
  PaymentType: string
  PaymentTypeDesc: string
  PaymentGroup: string
  PaymentGroupDesc: string
  ItemList: MycardItem[]
}

interface MycardItem {
  ItemCode: string
  ItemCodeDesc: string
  TradePointType: string
  Amount: string
  Currency: string
}
export type MyCardTypeList = MyCardType[]

export interface H5PayBaseInfo {
  appid: string
  paypalClientId: string
  paypalCurrency: string
}

export interface OrderStatusReq {
  order_id: string
}
export interface OrderStatusRes {
  status: number
  transaction_id: string
  err_msg: string // 错误信息，需要展示
}
export interface Pop {
  visible?: boolean
  type: string
  content: string
  closeable?: boolean
  defaultBtn?: {
    text: string
    onClick: () => void
  }
  primaryBtn?: {
    text: string
    onClick: () => void
  }
}
export interface UIDRecord {
  uid: string
  userName: string
}
// 支付方式
export interface PaymethodType { payType: number, level: number, name: string, icon: string }

export interface GoodsDataType {
  goods2: Product[] // 一档商品
  goods1: Product[] // 二档商品
  goods: Product[] // 三档商品
}
