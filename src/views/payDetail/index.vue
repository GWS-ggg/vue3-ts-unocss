<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BannerImage from '../payHub/components/bannerImage/index.vue'
import OrderDialog from './components/gameOrder/index.vue'
import OrderPop from './components/gameOrderPop/index.vue'
import GameLogin from './components/gameLogin/index.vue'
import PopVue from './components/pop/index.vue'
import Paypal from './components/paypal/index.vue'
import Mycard from './components/mycard/index.vue'
import { filterPaymentMethods, getRebateAmount } from './index'
import HeaderContainer from '@/components/header/index.vue'
import FooterContainer from '@/components/footer/index.vue'
import { isPCDevice } from '@/utils/flexible'
import { Toast, initToast } from '@/utils/toast'
import { getPayDataApi, initH5PayApi, myCardOrderApi, orderStasuApi, paypalSettleApi } from '@/api'
import { MYCARD_PAY_TYPE, PAYPAL_PAY_TYPE } from '@/enum/const'
import type { GoodsDataType, H5PayBaseInfo, MyCardOrderRes, OrderReq, PaymethodType, Pop, Product, UIDRecord, UserInfo } from '@/types/index'
import { reportTrack } from '@/utils/report'
import { getVoucherPoints } from '@/utils'

defineOptions({
  // 禁止自动继承非Prop属性
  inheritAttrs: false,
})

// 确保在 setup 函数的顶部调用
const { t } = useI18n()

// 支付dialog开关 a-model
// const dialogOpen = ref<boolean>(false)
// function onShowDialog() {
//   dialogOpen.value = true
// }
// function handleOk(e: MouseEvent) {
//   console.log(e)
//   dialogOpen.value = false
// }
const dialogVisible = ref<boolean>(false)
function openDialog() {
  dialogVisible.value = true
}
// 支付pop开关
const isVisblePopup = ref(false)
function onShowPopup() {
  isVisblePopup.value = true
}
function onClosePopup() {
  isVisblePopup.value = false
}

// 商品信息
// interface goodsInfo {
//   title: string
//   image: string
//   price: string
// }

// const goodsInfoArray = ref<goodsInfo[]>([
//   {
//     image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
//     title: '20龙焰晶',
//     price: '¥ 6.00',
//   },
// ])
// 页面初始化 获取传递router过来的appid
const { query } = useRoute()
// todo ?? 猪来了欧美版用本地语言
let country = 'tw'
country = query.region as string || 'tw'
// const locale = localStorage.getItem('lang') || 'zh-TW'
const locale = ref('zh-TW')
const source = query.source as string
const baseInfo: H5PayBaseInfo = {
  appid: query.appid as string, // 从URL获取
  paypalClientId: '',
  paypalCurrency: '',
}

// 登录相关
const uid = ref('')
const isLogin = ref(false)
const userInfo = ref<UserInfo>()

// 登录页面按钮
const isVisibleLogin = ref(false)
function onShowLogin() {
  isLogin.value = false
  isVisibleLogin.value = true
}
function onLoginOut() {
  // todo
  isLogin.value = false
}
function onCloseLogin() {
  isVisibleLogin.value = false
}

// 数据上报信息定义
const baseReportParams = ref<{
  appid: string
  zoneId: string
  roleId: string
  uid: string
  lang: string
}>({
  appid: query.appid ? String(query.appid) : '',
  zoneId: query.zoneid ? String(query.zoneid) : '',
  roleId: query.roleid ? String(query.roleid) : '',
  uid: uid.value,
  lang: locale.value,
})

// CNY
const currencyCode = ref('')
// 二维码链接
const contactContent = ref('')
let uidCacheKey = ''
// 跳转详情页URL ?? gameURL
const pageInfo = reactive({
  gameUrl: '',
  bannerUrl: '',
})

// ？？根据挡位返利额度
const levelMap = ref<Record<string, number>>({
  0: 10,
  1: 13,
  2: 15,
})
// 对应上面的挡位？？
const goodsData = ref<GoodsDataType>()
// myCard支付方式 特殊处理 弹窗
// const myCardPayMethod = ref<PaymethodType>()
const payMethodList = ref<PaymethodType[]>([])
// 点击登录
async function handleUIDOk(uidInput: string) {
  uid.value = uidInput
  Toast.loading()
  try {
    const res = await getPayDataApi({
      appid: baseInfo.appid,
      uid: uid.value,
    })
    currencyCode.value = res.currencyCode
    contactContent.value = res.line
    uidCacheKey = `${uid.value}_cache_data`
    baseReportParams.value.uid = uid.value
    reportTrack({
      trackAction: 6,
      source,
      ...baseReportParams.value,
    })
    const fnuid = res.user.uid
    userInfo.value = {
      ...res.user,
      fnuid,
      uid: uid.value,
    }
    userInfo.value.uid = uid.value
    pageInfo.gameUrl = res.gameUrl
    if (res.levels && typeof res.levels === 'object') {
      levelMap.value = res.levels
    }
    if (Array.isArray(res.payChannelList)) {
      const payChannelList = res.payChannelList
      if (Array.isArray(payChannelList) && payChannelList.length) {
        // const mycardIndex = payChannelList.findIndex(item => item.payType === MYCARD_PAY_TYPE)
        // mycard隐藏起来并放在最后一个
        // todo 传过来的时候都是放最后一个
        // if (mycardIndex !== -1) {
        //   myCardPayMethod.value = payChannelList[mycardIndex]
        //   payChannelList.splice(mycardIndex, 1)
        // }
        // 根据设备类型调整支付方式的顺序
        payMethodList.value = filterPaymentMethods(payChannelList)
        getCacheMethods()
      }
      else {
        payMethodList.value = []
      }
    }
    goodsData.value = {
      goods: res.goods,
      goods1: res.goods1,
      goods2: res.goods2,
    }
    saveUIDRecord(userInfo.value)
    Toast.close()
    // 关闭弹窗 可以加个登录成功？
    onCloseLogin()
    isLogin.value = true
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      showPop({
        content: t('message.home'),
        type: 'error',
        closeable: true,
      })
    }
  }
  finally {
    Toast.close()
  }
}

// 如果有roleid参数，则直接使用该参数作为uid
// 应该没这种情况把 可以删除
// 改成登录持久化  loaclstorage中保存uid信息？
// if (query.roleid) {
//   handleUIDOk(String(query.roleid))
// }
// 获取本地缓存中上一次选择的支付方法
function getCacheMethods() {
  const userCacheData = JSON.parse(localStorage.getItem(uidCacheKey) || '{}')
  if (userCacheData.payMethod) {
    if (MYCARD_PAY_TYPE !== userCacheData.payMethod) { // 如果不是mycard 支付方式则根据缓存选择支付方式
      const item = payMethodList.value.find(item => item.payType === userCacheData.payMethod)
      if (item) {
        changePayMethod(item)
      }
    }
    else { // 如果是mycard支付方式则默认选择第一种支付方式
      changePayMethod(payMethodList.value[0])
    }
  }
  else { // 没有缓存则默认第一种支付方式
    changePayMethod(payMethodList.value[0])
  }
}
const storageKey = 'ccsgUIDRecord'
const uidStorageKey = `${baseInfo.appid}_uid`
// 缓存uid
function saveUIDRecord(userInfo: UserInfo) {
  try {
    const recordStorage = localStorage.getItem(storageKey)
    const record = recordStorage ? JSON.parse(recordStorage) : []
    // 去重
    const index = record.findIndex((_item: UIDRecord) => {
      return _item.uid === userInfo.uid
    })
    if (index > -1) {
      record.splice(index, 1)
    }
    record.unshift({
      uid: userInfo.uid,
      userName: userInfo.nick,
    })
    localStorage.setItem(storageKey, JSON.stringify(record))
    // const uidDom = document.getElementById('uid-input')
    // uidDom && uidDom.focus()

    // 缓存上次登录的uid
    localStorage.setItem(uidStorageKey, JSON.stringify(userInfo.uid))
  }
  catch (error) {
    console.log(error)
  }
}

function getLastLoginUid() {
  try {
    const recordStorage = localStorage.getItem(uidStorageKey)
    const record = recordStorage ? JSON.parse(recordStorage) : ''
    return record
  }
  catch (error) {
    console.log(error)
  }
}
// 支付方法逻辑
const payMethod = ref(0)
const payLevel = ref(0)
// 选中商品 删除待定 todo
const activeProduct = ref<Product>()
function changePayMethod(item: PaymethodType) {
  payMethod.value = item?.payType || 0
  localStorage.setItem(uidCacheKey, JSON.stringify({ payMethod: payMethod.value }))
  // if (item?.level !== payLevel.value) {
  //   payLevel.value = item?.level || 0
  //   activeProduct.value = undefined
  // }
}

// 支付弹窗开关
function showPayOrder(selectedProduct: Product) {
  activeProduct.value = selectedProduct
  if (isPCDevice.value) {
    openDialog()
  }
  else {
    onShowPopup()
  }
}

async function initPage() {
  // 网页标题修改 todo
  initToast()
  Toast.loading()
  const res = await initH5PayApi({
    appid: baseInfo.appid,
  })
  // 数据上报 5
  reportTrack({
    trackAction: 5,
    source,
    ...baseReportParams.value,
  })
  // 修改网页标题 document.title
  if (res.name) {
    document.title = res.name
  }
  baseInfo.paypalClientId = res.pClientId
  baseInfo.paypalCurrency = res.PCurrency
  // 获取缓存中的uid 有的话直接登录
  // 退出登录 是否会有问题
  const lastLoginUid: string = getLastLoginUid()
  if (lastLoginUid !== '') {
    handleUIDOk(lastLoginUid)
  }
  console.log(res)
  Toast.close()
}

initPage()

// 弹窗逻辑
const pop = ref<Pop>({
  visible: false,
  type: 'success',
  content: '',
})
function showPop(prop: Pop) {
  pop.value = {
    ...prop,
    visible: true,
  }
}
function handlePopVisibleUpdate(value: boolean) {
  pop.value.visible = value
}

// 结算下单
const mycardRef = ref()
const payPalRef = ref()
async function checkout() {
  if (!activeProduct.value || !userInfo.value) {
    return
  }
  reportTrack({
    trackAction: 7,
    source,
    payChannel: payMethod.value,
    productId: activeProduct.value.pid,
    ...baseReportParams.value,
  })
  // maycard支付
  if (payMethod.value === MYCARD_PAY_TYPE) {
    mycardRef.value.start(activeProduct.value)
  }
  else if (payMethod.value === PAYPAL_PAY_TYPE) {
    payPalRef.value.start(activeProduct.value)
  }
  else {
    handlePayerMaxCheckout()
  }
}
let win: Window | null = null
async function handlePayerMaxCheckout() {
  if (!activeProduct.value || !userInfo.value) {
    return
  }
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  const name = 'PayerMax'
  const options = 'width=700,height=700,left=-185,top=-220,resizable=no,location=no,menubar=no'
  if (isSafari) {
    win = window.open() as Window
  }
  try {
    Toast.loading()
    const res = await createPayermaxOrder(activeProduct.value, userInfo.value, baseInfo)
    if (res) {
      const { fntype14 } = res
      if (fntype14) {
        const url = fntype14
        if (!isSafari) {
          win = window.open(url, name, options)
        }
        else {
          if (win) {
            win.location.replace(url)
          }
        }
      }
      // 先清除旧的事件监听
      window.removeEventListener('message', payermaxMsghandler)
      window.addEventListener('message', payermaxMsghandler)
      handleOrderCreated(res)
    }
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      showPop({
        content: t('message.pay_failed'),
        type: 'error',
        closeable: true,
      })
    }
  }
  finally {
    Toast.close()
  }
}
// 查询订单状态
async function checkOrderStatus(orderId: string) {
  console.log('checkOrderStatus', orderId)
  const res = await orderStasuApi({
    order_id: orderId,
  })
  return res
}
// 轮序查询订单状态
let currentPayId: string
const ORDER_STATUS_SUCCESS = 1
const ORDER_STATUS_FAILED = -1
const ORDER_STATUS_PENDDING = 0
async function startCheckStatus(res: MyCardOrderRes) {
  const { orderid } = res
  const payId = orderid
  currentPayId = payId
  let count = 0
  const maxCount = 600
  const interval = 1000
  const check = async () => {
    console.log('check', payId, currentPayId)
    if (payId !== currentPayId)
      return
    const checkRes = await checkOrderStatus(payId)
    if (checkRes.status === ORDER_STATUS_SUCCESS) {
      showSuccessPop()
      mycardRef.value.close()
      payPalRef.value.close()
    }
    else if (checkRes.status === ORDER_STATUS_PENDDING) {
      if (count < maxCount) {
        count++
        setTimeout(check, interval)
      }
      else {
        showPop({
          content: t('message.pay_failed'),
          type: 'error',
          closeable: true,
          defaultBtn: {
            text: t('message.continue'),
            onClick: () => {
              pop.value.visible = false
            },
          },
        })
        mycardRef.value.close()
        payPalRef.value.close()
      }
    }
    else if (checkRes.status === ORDER_STATUS_FAILED) {
      showPop({
        content: t('message.pay_failed'),
        type: 'error',
        closeable: true,
        defaultBtn: {
          text: t('message.continue'),
          onClick: () => {
            pop.value.visible = false
          },
        },
      })
    }
  }
  check()
}

function handleOrderCreated(res: MyCardOrderRes) {
  console.log(res, 'handleOrderCreated')
  reportTrack({
    trackAction: 8,
    source,
    payChannel: payMethod.value,
    productId: activeProduct.value?.pid,
    orderId: res.orderid,
    ...baseReportParams.value,
  })
  showPop({
    content: t('message.pop_content_new_page'),
    visible: true,
    type: 'success',
    closeable: false,
    defaultBtn: {
      text: t('message.cancel'),
      onClick: () => {
        console.log('cancel test')
        pop.value.visible = false
        mycardRef.value.close()
        payPalRef.value.close()
        currentPayId = ''
      },
    },
  })
  startCheckStatus(res)
}

// 监听postMessage
function payermaxMsghandler(event: MessageEvent) {
  const PAYERMAX_SUCCESS_RET = 0
  const PAYERMAX_FAILED_RET = -2
  const { data } = event
  try {
    console.log('test 监听postMessage')
    if (typeof data === 'string') {
      const message = JSON.parse(data)
      console.log(message, 'message')
      const { Ret, OrderId } = message
      if (OrderId === currentPayId) {
        win?.close()
        switch (Ret) {
          case PAYERMAX_SUCCESS_RET:
            currentPayId = ''
            showSuccessPop()
            break
          case PAYERMAX_FAILED_RET:
            currentPayId = ''
            showPop({
              content: t('message.pay_failed'),
              type: 'error',
              closeable: true,
              defaultBtn: {
                text: t('message.continue'),
                onClick: () => {
                  pop.value.visible = false
                },
              },
            })
            break
        }
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}

// payermax下单
async function createPayermaxOrder(product: Product, userInfo: UserInfo, baseInfo: H5PayBaseInfo) {
  if (!product || !userInfo) {
    return
  }
  const orderParams: OrderReq = {
    appid: baseInfo.appid,
    version: ' 1.0',
    fn_uid: userInfo.fnuid,
    fn_deviceid: '',
    token: '',
    os: 'pc',
    game_platform: 'h5',
    ts: new Date().getTime() / 1000,
    price: product.usd,
    priceUsd: product.usd,
    params: '',
    desc: '',
    pid: product.pid,
    title: product.title,
    game_appid: baseInfo.appid,
    game_openid: userInfo.fnuid,
    pay_type: payMethod.value,
    content_type: '',
    zoneid: userInfo.zoneid ? Number(userInfo.zoneid) : 0,
    roleid: userInfo.roleid,
    zone_id: userInfo.zoneid ? Number(userInfo.zoneid) : 0,
    role_id: userInfo.roleid,
    is_gs: 0,
    channel: 'site',
    country: country.toUpperCase(),
    trackSrc: source,
  }
  const res = await myCardOrderApi(orderParams)
  return res
}
// 关闭定时？
function handleModalClose() {
  currentPayId = ''
}

function handlePaypalStatusChange(data: {
  orderId: string
  fntype14: string
  status: 0 | 1 | 3
}) {
  const { orderId, fntype14, status } = data
  console.log('handlePaypalStatusChange', data)
  paypalSettleApi({
    orderid: orderId,
    fntype14,
    status,
  })
  if (status === 3) {
    payPalRef.value.close()
    showPop({
      content: t('canceled'),
      type: 'failed',
      closeable: true,
      defaultBtn: {
        text: t('close'),
        onClick: () => {
          pop.value.visible = false
        },
      },
    })
  }
  if (status === 0) {
    payPalRef.value.close()
    showPop({
      content: t('pay_failed'),
      type: 'failed',
      closeable: true,
      defaultBtn: {
        text: t('close'),
        onClick: () => {
          pop.value.visible = false
        },
      },
    })
  }
}
function showSuccessPop() {
  showPop({
    content: t('message.pay_success_tip'),
    type: 'success',
    closeable: true,
    primaryBtn: (country === 'kr' || !pageInfo.gameUrl)
      ? undefined
      : {
          text: t('message.open_game'),
          onClick: () => {
            window.location.href = pageInfo.gameUrl
          },
        },
    defaultBtn: {
      text: t('message.continue_buy'),
      onClick: () => {
        pop.value.visible = false
      },
    },
  })
}

// 商品数量
const productCount = ref(1)

function addProductCount() {
  productCount.value++
}

function reduceProductCount() {
  if (productCount.value > 1) {
    productCount.value--
  }
}
// interface VoucherPoints {
//   beforeValue: string
//   result: string
//   makeUpPoint: number
// }
// 数量变化 价格重新计算
// const voucherPoints = ref<VoucherPoints>()
// watch(productCount, () => {
//   voucherPoints.value = getVoucherPoints(product, currencyCode, getRebateAmount(payLevel, levelMap), baseInfo.appid, productCount)
// })
</script>

<template>
  <div class="scrollbarWidth h-[100vh] w-[100vw] overflow-x-hidden overflow-y-auto bg-[#f8f8f8]">
    <HeaderContainer />
    <BannerImage />
    <div
      class="relative mx-auto w-750 text-24 -mt-50"
      lg="w-1200 text-18 -mt-40"
    >
      <div
        class="relative mx-auto w-710 flex flex-col items-start rounded-10 bg-[#ffffff] p-10"
        lg="w-full items-center justify-between flex-row rounded-20"
      >
        <div
          class="flex"
          lg="items-center"
        >
          <img
            src="@/assets/images/pic1.webp"
            alt=""
            class="relative h-80 w-80 rounded-12 rounded-20 object-cover"
            lg="h-80 w-80"
          >
          <div
            class="ml-20 mt-10 flex flex-col"
            lg="mt-0"
          >
            <div
              class="text-24"
              lg="text-24"
            >
              游戏名称
            </div>
            <div
              class="mt-15"
              lg="text-20"
            >
              游戏描述
            </div>
          </div>
        </div>
        <div
          class="mt-10 w-full rounded-10 bg-[#f8f8f8]"
          lg="w-auto mt-0"
        >
          <div v-show="isLogin">
            <div
              class="mb-10 ml-10 mt-10 f-s"
              lg="my-0"
            >
              <img
                src="@/assets/icons/Avatar.png"
                alt=""
                class="relative h-63 w-63 rounded-12 object-cover"
                lg="h-63 w-63 my-5"
              >
              <div class="my-auto ml-10 flex flex-col">
                <div
                  class="mb-15 mr-10 text-24"
                  lg="text-24"
                >
                  UID: {{ uid }}
                </div>
                <div>
                  Server
                </div>
              </div>
              <div
                class="my-auto ml-10 flex cursor-pointer items-center text-24"
                @click="onLoginOut"
              >
                <div class="color-[#ED6504]">
                  Log out
                </div>
                <div
                  class="i-iconamoon:arrow-right-2-light h-30 w-30"
                  style="color: #ED6504;"
                />
              </div>
            </div>
          </div>

          <div
            v-show="!isLogin"
            class="mb-10 mt-10 f-c flex-col text-24"
            lg="p-10 my-0"
          >
            <div>
              Log into your game account
            </div>
            <div
              class="mt-10 f-c flex cursor-pointer color-[#ED6504]"
              @click="onShowLogin"
            >
              <div>Log in</div>
              <div
                class="i-iconamoon:arrow-right-2-light h-30 w-30"
                style="color: #ED6504;"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-40 mt-20 rounded-20 bg-[#fff] text-20">
        <div class="ml-10 py-10 text-24">
          礼包选择
        </div>
        <div
          class="flex flex-wrap justify-start gap-15 px-27.5"
          lg="gap-12 px-32"
        >
          <div
            v-for="(product, index) in goodsData?.goods"
            :key="index"
            class="relative mb-15 h-340 w-340 flex flex-row cursor-pointer border rounded-24 text-center shadow-md"
            lg="h-275 w-275"
          >
            <div
              class="relative w-full rounded-25 text-26 shadow-lg"
              lg="text-24"
            >
              <img
                class="absolute left-[50%] top-0 z-0 h-[60%] w-[60%] translate-x-[-50%]"
                :src="product.img"
                alt=""
              >
              <div class="absolute left-[50%] top-[60%] z-10 w-full f-c flex-col translate-x-[-50%]">
                <div class="whitespace-nowrap font-semibold">
                  {{ product.title }}
                </div>
                <div
                  class="btnColor mt-30 h-50 w-[80%] f-c cursor-pointer border rounded-25 text-center color-[#fff]"
                  lg="mt-20"
                  @click="showPayOrder(product)"
                >
                  {{ getVoucherPoints(product, currencyCode, getRebateAmount(payLevel, levelMap),
                                      baseInfo.appid).beforeValue
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterContainer />
    <!-- <a-modal v-model:open="dialogOpen" :mask-closable="false" :footer="null" width="750px" @ok="handleOk">
      <template #title>
        <div class="text-center">
          确认支付订单
        </div>
      </template>
<OrderDialog />
</a-modal> -->
  </div>
  <m-dialog v-model="dialogVisible">
    <OrderDialog
      :selected-product="activeProduct"
      :user-info="userInfo"
      :product-count="productCount"
      :currency-code="currencyCode"
      :pay-method-list="payMethodList"
      :pay-level="payLevel"
      :level-map="levelMap"
      :base-info="baseInfo"
      @add-product-count="addProductCount"
      @reduce-product-count="reduceProductCount"
      @checkout="checkout"
      @change-pay-method="changePayMethod"
    />
  </m-dialog>
  <m-dialog
    v-model="isVisibleLogin"
    custome-class="rounded-20"
  >
    <GameLogin
      v-model:uid="uid"
      @on-click-login="handleUIDOk"
    />
  </m-dialog>
  <m-popup v-model="isVisblePopup">
    <OrderPop
      :selected-product="activeProduct"
      :user-info="userInfo"
      :product-count="productCount"
      :currency-code="currencyCode"
      :pay-method-list="payMethodList"
      :pay-level="payLevel"
      :level-map="levelMap"
      :base-info="baseInfo"
      @on-close-popup="onClosePopup"
      @add-product-count="addProductCount"
      @reduce-product-count="reduceProductCount"
      @checkout="checkout"
      @change-pay-method="changePayMethod"
    />
  </m-popup>
  <Paypal
    ref="payPalRef"
    :base-info="baseInfo"
    :user-info="userInfo"
    @created="handleOrderCreated"
    @close="handleModalClose"
    @status-change="handlePaypalStatusChange"
  />
  <Mycard
    ref="mycardRef"
    :base-info="baseInfo"
    :user-info="userInfo"
    @created="handleOrderCreated"
    @close="handleModalClose"
  />
  <PopVue
    :pop="pop"
    @update:visible="handlePopVisibleUpdate"
  />
</template>

<style scoped>
.imageMarginTop {
  margin-top: 80px;
}

.gameIntroPCMargin {
  @apply mx-0
}

.btnColor {
  background: linear-gradient(93deg, #FFA500 0%, #FF8C00 100%);
}

.scrollbarWidth {
  scrollbar-width: none;
}
</style>
