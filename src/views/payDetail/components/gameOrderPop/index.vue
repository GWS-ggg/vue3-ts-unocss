<script setup lang="ts">
import type { PaymethodType } from '@/types/index'
// interface PayMethod {
//   id: number
//   name: string
//   description: string
//   logo: string
// }
// interface Props {
//   selectedProduct: Product | null
//   payMethodList: PaymethodType[]
//   currencyCode: string
//   userInfo?: UserInfo
//   productCount: number
//   payLevel: number
//   levelMap: Record<string, number>
//   baseInfo: H5PayBaseInfo
// }
// const props = withDefaults(defineProps<Props>(), {
//   selectedProduct: null,
//   currencyCode: '',
//   productCount: 1,
// })
const emit = defineEmits(['onClosePopup', 'checkout', 'changePayMethod', 'addProductCount', 'reduceProductCount'])

const selectedMethod = ref<PaymethodType | null>(null)

function selectMethod(method: PaymethodType) {
  selectedMethod.value = method
  emit('changePayMethod', method)
}

// const priceStr = computed(() => {
//   if (!props.selectedProduct)
//     return ''
//   return getVoucherPoints(props.selectedProduct, props.currencyCode, getRebateAmount(props.payLevel, props.levelMap), props.baseInfo.appid, props.productCount).beforeValue
// })

// function checkout() {
//   emit('checkout')
// }

// function addProductCount() {
//   emit('addProductCount')
// }
// function reduceProductCount() {
//   emit('reduceProductCount')
// }

// interface PayMethod {
//   id: number
//   name: string
//   description: string
//   logo: string
// }

function handleClose() {
  emit('onClosePopup')
}

// const selectedMethod = ref<number | null>(null)

// const payMethods: PayMethod[] = [
//   {
//     id: 1,
//     name: '支付宝',
//     description: 'Alipay',
//     logo: '/src/assets/icons/alipay-log.png',
//   },
//   {
//     id: 2,
//     name: '微信支付',
//     description: 'WeChat Pay',
//     logo: '/src/assets/icons/wechat-pay-logo.png',
//   },
//   {
//     id: 3,
//     name: '微信支付',
//     description: 'WeChat Pay',
//     logo: '/src/assets/icons/wechat-pay-logo.png',
//   },
//   {
//     id: 4,
//     name: '微信支付',
//     description: 'WeChat Pay',
//     logo: '/src/assets/icons/wechat-pay-logo.png',
//   },
//   {
//     id: 5,
//     name: '微信支付',
//     description: 'WeChat Pay',
//     logo: '/src/assets/icons/wechat-pay-logo.png',
//   },
//   {
//     id: 6,
//     name: '微信支付',
//     description: 'WeChat Pay',
//     logo: '/src/assets/icons/wechat-pay-logo.png',
//   },

// ]
</script>

<template>
  <div class="relative max-h-[90vh] overflow-hidden rounded-t-24 bg-[#fff] text-18">
    <div
      class="absolute right-20 top-13 z-10 f-c cursor-pointer border-2 border-[#757575] rounded-full border-solid"
      @click="handleClose"
    >
      <div
        class="i-material-symbols:close h-30 w-30"
        style="color:#757575;"
      />
    </div>

    <div class="relative my-15 w-full f-c px-15 text-36">
      确认支付订单
    </div>
    <div class="max-h-[80vh] min-h-[50vh] overflow-auto bg-[#fff] px-15 pb-150 pt-10">
      <div class="w-full flex b-s-gray rounded-10 bg-[#f8f8f8] p-10">
        <img
          src="@/assets/icons/Avatar.png"
          alt=""
          class="relative h-63 w-63 rounded-12 object-cover"
          lg="h-63 w-63 my-5"
        >
        <div class="my-auto ml-10 flex flex-col text-24">
          <div class="mb-10 mr-10">
            UID: 1531351
          </div>
          <div>
            Server
          </div>
        </div>
      </div>
      <div class="orderInfo my-10 rounded-10 bg-[#f8f8f8] py-10">
        <p class="mb-8 px-10 text-12 color-[#666666] leading-16">
          商品信息
        </p>
        <div class="flex justify-start px-10">
          <div
            class="h-56 w-98 rounded-12 bg-contain bg-no-repeat"
            style="background-image: url('https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449185.png?x-oss-process=image/format,webp')"
          />
          <div class="f-c p-10 font-bold">
            20龙焰晶
          </div>
        </div>
        <div class="mt-15 px-10">
          <div class="mb-5 h-24 f-b text-14">
            <span class="min-w-70 color-[#666666]">商品价格:</span>
            <span>$ 6.00</span>
          </div>
        </div>
      </div>
      <div class="payInfo min-h-100 rounded-10 bg-[#f8f8f8] px-10 pb-15 pt-10">
        <div class="mb-10 flex items-center">
          <p class="text-12 color-[#666666] font-normal">
            支付方式
          </p>
        </div>
        <div
          v-for="method in payMethodList"
          :key="method.payType"
          class="payList mb-10 h-40 f-c cursor-pointer rounded-8"
          :class="selectedMethod === method ? 'border border-solid border-[#ED6504] bg-[#fff8f8]' : 'b-s bg-[#fff]'"
          @click="selectMethod(method)"
        >
          <img
            :src="method.icon"
            :alt="method.name"
            class="max-h-30 max-w-[40%]"
          >
        </div>
      </div>
      <div class="confirmBtn shadow-custom absolute bottom-0 left-0 min-h-84 w-full rounded-t-12 bg-[#fff] p-15">
        <div class="f-b">
          <div class="f-c">
            <p>合计：</p>
            <div class="text-18 color-[#ED6504] font-bold">
              ￥ 6.00
            </div>
          </div>
          <div class="mr-10 h-44 w-150 f-c cursor-pointer rounded-25 bg-[#ED6504] text-18 color-[#fff]">
            立即支付
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-custom {
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
