import { reportApi } from '@/api/index'
import { getDeviceModel, getDeviceOSVersion, getDeviceType, getTimezone } from '@/utils/index'

const tz = getTimezone()
const os = getDeviceType()
const os_v = getDeviceOSVersion()
const model = getDeviceModel()
const manufacturer = navigator.vendor
export function reportTrack(params: {
  trackAction: number
  source: string
  payChannel?: number
  orderId?: string
  productId?: string
  lang?: string
  appid: string
  zoneId: string
  roleId: string
  uid: string
}) {
  reportApi({
    tz,
    ts: new Date().getTime(),
    os,
    os_v,
    model,
    manufacturer,
    lang: params?.lang || undefined,
    appid: params?.appid,
    mappid: params?.appid,
    zone_id: params?.zoneId || undefined,
    role_id: params?.roleId || undefined,
    fn_uid: params?.uid || '0',
    evt: 't_official_track',
    trackAction: String(params.trackAction),
    trackSrc: params?.source,
    payChannel: params?.payChannel ? String(params?.payChannel) : undefined,
    orderId: params?.orderId || undefined,
    productId: params?.productId || undefined,
  })
}
