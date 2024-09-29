<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { H5PayBaseInfo, OrderReq, Product, UserInfo } from '@/types/index'
import { myCardOrderApi } from '@/api'
import { PAYPAL_PAY_TYPE } from '@/enum/const'

interface Props {
  baseInfo: H5PayBaseInfo
  userInfo?: UserInfo
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['created', 'statusChange', 'close'])
const curProduct = ref<Product>()
const visible = ref<boolean>(false)
watch(visible, async (val) => {
  if (!val) {
    emits('close')
  }
})
async function start(product: Product) {
  curProduct.value = product
  renderBtn()
  visible.value = true
}

// 加载script
function loadScript(url: string, callback: () => void) {
  const script = document.createElement('script')
  script.src = url
  script.onload = callback
  document.head.appendChild(script)
}
const curOrder = ref<{
  orderId: string
  fntype14: string
}>()
async function createPaypalOrder() {
  if (!curProduct.value || !props.userInfo) {
    return
  }
  const orderParams: OrderReq = {
    appid: props.baseInfo.appid,
    version: ' 1.0',
    fn_uid: props.userInfo.fnuid,
    fn_deviceid: '',
    token: '',
    os: 'pc',
    game_platform: 'h5',
    ts: new Date().getTime() / 1000,
    price: curProduct.value.usd,
    priceUsd: curProduct.value.usd,
    params: '',
    desc: '',
    pid: curProduct.value.pid,
    title: curProduct.value.title,
    game_appid: props.baseInfo.appid,
    game_openid: props.userInfo.fnuid,
    pay_type: PAYPAL_PAY_TYPE,
    content_type: '',
    zoneid: props.userInfo.zoneid ? Number(props.userInfo.zoneid) : 0,
    roleid: props.userInfo.roleid,
    zone_id: props.userInfo.zoneid ? Number(props.userInfo.zoneid) : 0,
    role_id: props.userInfo.roleid,
    is_gs: 0,
    channel: 'site',
  }
  const res = await myCardOrderApi(orderParams)
  const { fntype14 } = res
  curOrder.value = {
    orderId: res.orderid,
    fntype14,
  }
  emits('created', res)
  return fntype14
}
const STATUS_SUCCESS = 1
const STATUS_ERROR = 0
const STATUS_CANCEL = 3
function renderBtn() {
  // 设置国际化语言
  const localeLanguage = 'en_US' // 例如：中文简体

  // en_US：英语（美国）
  // zh_CN：中文（简体）
  // zh_TW：中文（繁体）
  // es_ES：西班牙语（西班牙）
  // fr_FR：法语（法国）
  // de_DE：德语（德国）
  // ja_JP：日语（日本）
  // ko_KR：韩语（韩国）

  loadScript(`https://www.paypal.com/sdk/js?client-id=${props.baseInfo.paypalClientId}&currency=${props.baseInfo.paypalCurrency}&locale=${localeLanguage}`, () => {
    // 定义按钮样式
    const buttonStyle = {
      layout: 'vertical', // 按钮布局：vertical, horizontal
      color: 'gold', // 按钮颜色：gold, blue, silver, black
      shape: 'rect', // 按钮形状：rect, pill
      label: 'paypal', // 按钮标签：paypal, checkout, buynow, pay
      height: 55, // 按钮高度（像素）
    }
    //   // 使用自定义图片
    //   // custom: '@/assets/icons/99-logo.png',
    // }

    const paypal = (window as any).paypal
    // paypal初始化
    paypal.Buttons({
      // 下单
      createOrder() {
        console.log('2222')
        return createPaypalOrder()
      },
      // 付款
      onApprove() {
        emits('statusChange', {
          ...curOrder.value,
          status: STATUS_SUCCESS,
        })
      },
      // 取消付款
      onCancel() {
        emits('statusChange', {
          ...curOrder.value,
          status: STATUS_CANCEL,
        })
      },
      // 付款失败
      onError(_err: any) {
        emits('statusChange', {
          ...curOrder.value,
          status: STATUS_ERROR,
        })
      },
      // 添加样式选项
      style: buttonStyle,
      // 设置语言
      locale: localeLanguage,
    }).render('#paypal-button-container')
  })
}

defineExpose({
  start,
  renderBtn,
  close: () => {
    visible.value = false
    curOrder.value = undefined
  },
})
</script>

<template>
  <m-dialog v-model="visible">
    <div class="h-626 w-626 f-c">
      <div
        id="paypal-button-container"
        class="w-480"
      />
    </div>
  </m-dialog>
  <!-- <Dialog
    v-model:visible="visible"
    title="Paypal"
  >
    <div class="paypal-container">
      <div
        id="paypal-button-container"
        class="main"
      />
    </div>
  </Dialog> -->
</template>

<style lang="less" scoped>
.paypal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
