<script lang="ts" setup>
import { ref, watch } from 'vue'
import Dialog from '../dialog/index.vue'
import type { H5PayBaseInfo, MyCardType, MyCardTypeList, OrderReq, Product, UserInfo } from '@/types/index'
import { myCardOrderApi, myCardTypeApi } from '@/api'
import { Toast } from '@/utils/toast'
import { MYCARD_PAY_TYPE } from '@/enum/const'

interface Props {
  baseInfo: H5PayBaseInfo
  userInfo?: UserInfo
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['created', 'close'])
const currency = ref<string>('TWD')
const curProduct = ref<Product>()
const mycardTypeList = ref<MyCardTypeList>([])
const visible = ref<boolean>(false)
watch(visible, async (val) => {
  if (!val) {
    emits('close')
  }
})
async function changeCurrency(value: string) {
  currency.value = value
  if (!curProduct.value)
    return
  mycardTypeList.value = []
  const { usd } = curProduct.value
  await getTypeList(Number(usd))
}
async function start(product: Product) {
  curProduct.value = product
  const { usd } = product
  await getTypeList(Number(usd))
  visible.value = true
}
const payMethod = ref<MyCardType>()
function chageMethod(method: MyCardType) {
  payMethod.value = method
}

async function getTypeList(amount: number) {
  Toast.loading()
  const res = await myCardTypeApi({
    appid: props.baseInfo.appid,
    currency: currency.value,
    amount,
  })
  mycardTypeList.value = res
  payMethod.value = res.length ? res[0] : undefined
  Toast.close()
}
async function order() {
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  const name = 'Mycard'
  const options = 'width=700,height=700,left=-185,top=-220,resizable=no,location=no,menubar=no'
  let win: Window | null = null
  if (isSafari) {
    win = window.open() as Window
  }
  if (!curProduct.value || !props.userInfo) {
    return
  }
  const typeItem = payMethod.value
  if (!typeItem) {
    Toast.info('请选择支付方式')
    return
  }
  try {
    const orderParams: OrderReq = {
      appid: props.baseInfo.appid,
      version: ' 1.0',
      fn_uid: props.userInfo.fnuid,
      fn_deviceid: '',
      token: '',
      os: 'pc',
      game_platform: 'h5',
      ts: new Date().getTime() / 1000,
      price: curProduct.value.twd,
      priceUsd: curProduct.value.usd,
      params: '',
      desc: '',
      pid: curProduct.value.pid,
      title: curProduct.value.title,
      game_appid: props.baseInfo.appid,
      game_openid: props.userInfo.fnuid,
      pay_type: MYCARD_PAY_TYPE,
      mycard_pay_type: typeItem.PaymentType,
      content_type: '',
      zoneid: props.userInfo.zoneid ? Number(props.userInfo.zoneid) : 0,
      roleid: props.userInfo.roleid,
      zone_id: props.userInfo.zoneid ? Number(props.userInfo.zoneid) : 0,
      role_id: props.userInfo.roleid,
      is_gs: 0,
      channel: 'site',
    }
    Toast.loading()
    const res = await myCardOrderApi(orderParams)
    const { fntype14 } = res
    if (fntype14) {
      const url = fntype14
      if (!isSafari) {
        window.open(url, name, options)
      }
      else {
        if (win) {
          win.location.replace(url)
        }
      }
    }
    Toast.close()
    emits('created', res)
  }
  catch (error) {
    console.log(error)
    if (win) {
      win.close()
    }
  }
}
defineExpose({
  start,
  close: () => {
    visible.value = false
  },
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    title="Mycard"
  >
    <div class="mycard-container">
      <div class="currency-selcet">
        <div class="radio-list">
          <div
            class="radio-item"
            :class="{ 'active-item': currency === 'TWD' }"
            @click="changeCurrency('TWD')"
          >
            TWD
          </div>
          <div
            class="radio-item"
            :class="{ 'active-item': currency === 'HKD' }"
            @click="changeCurrency('HKD')"
          >
            HKD
          </div>
        </div>
      </div>
      <div class="method-list">
        <div
          v-for=" typeItem in mycardTypeList"
          :key="typeItem.PaymentType"
          class="method-item"
          :class="{ 'active-method-item': payMethod?.PaymentType === typeItem.PaymentType }"
          @click="chageMethod(typeItem)"
        >
          <div class="cover-img method-icon">
            <img src="/img/mycard.png">
          </div>
          <div class="method-desc">
            {{ typeItem.PaymentTypeDesc }}
          </div>
        </div>
        <div
          v-if="!mycardTypeList.length"
          class="empty-tip"
        >
          暫無可用支付方式
        </div>
      </div>
      <div class="confirm-btn-wrap">
        <div
          class="button confirm-button"
          @click="order"
        >
          繼續
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style lang="less" scoped>
.mycard-container {
  padding: 10px 0 0;
}

.method-list {
  overflow-y: auto;
  margin-bottom: 27px;
  height: 670px;
  vertical-align: top;

  .method-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 50px 33px;
    margin-top: 13px;
    width: 100%;
    height: 152px;
    background-color: #141c3d;
    cursor: pointer;

    .method-icon {
      padding: 10px;
      margin-right: 43px;
      width: 91px;
      height: 91px;
      background-color: #fff;
    }

    .method-desc {
      font-size: 30px;
      font-family: Helvetica, sans-serif;
      color: #efefef;
      font-weight: bold;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
    }
  }

  .empty-tip {
    font-size: 30px;
    text-align: center;
    color: #efefef;
    font-weight: bold;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 0px;
  }

  .active-method-item {
    padding: 48px 31px;
    border: solid 2px #3a7bfc;

    &:after {
      content: "";
      position: absolute;
      top: -1px;
      left: -1px;
      width: 48px;
      height: 48px;
      background-image: url("/img/selected-flag.png");
      background-size: 100%;
    }

    .recommend-flag {
      position: absolute;
      top: 3px;
      right: -1px;
    }
  }
}

.confirm-button {
  height: 1.173rem;
}

:deep(.pop-main) {
  height: 1000px !important;
  max-height: 80vh !important;
}

.currency-selcet {
  margin-bottom: 36px;
}

.radio-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 30px;
  color: #efefef;

  .ridio-label {
    margin-right: 20px;
  }

  .radio-item {
    cursor: pointer;
    position: relative;
    flex-grow: 1;
    padding: 12px 36px;
    font-weight: bold;
    background-color: #141c3d;
  }

  .active-item {
    padding: 10px 34px;
    background-color: #3a7bfc;
    border: solid 2px #3a7bfc;
    // &:after {
    //   content: "";
    //   position: absolute;
    //   top: -1px;
    //   left: -1px;
    //   width: 48px;
    //   height: 48px;
    //   background-image: url("/img/selected-flag.png");
    //   background-size: 100%;
    // }
  }
}
</style>
