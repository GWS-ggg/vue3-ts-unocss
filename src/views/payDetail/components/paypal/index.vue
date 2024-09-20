<script lang="ts" setup>
import { ref, watch } from 'vue'
import Dialog from '../dialog/index.vue'
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
  loadScript(`https://www.paypal.com/sdk/js?client-id=${props.baseInfo.paypalClientId}&currency=${props.baseInfo.paypalCurrency}`, () => {
    const paypal = (window as any).paypal
    // paypal初始化
    paypal.Buttons({
      // 下单
      createOrder() {
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
  <Dialog v-model:visible="visible" title="Paypal">
    <div class="paypal-container">
      <div id="paypal-button-container" class="main" />
    </div>
  </Dialog>
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
