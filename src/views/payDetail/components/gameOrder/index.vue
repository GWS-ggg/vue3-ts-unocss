<script setup lang="ts">
import type { PaymethodType, Product, UserInfo } from '@/types/index'
import { getPriceStr } from '@/utils'

// interface PayMethod {
//   id: number
//   name: string
//   description: string
//   logo: string
// }
interface Props {
  selectedProduct: Product | null
  payMethodList: PaymethodType[]
  currencyCode: string
  userInfo?: UserInfo
  productCount: number
}
const props = withDefaults(defineProps<Props>(), {
  selectedProduct: null,
  currencyCode: '',
  productCount: 1,
})
const emit = defineEmits(['onCloseDialog', 'checkout', 'changePayMethod', 'addProductCount', 'reduceProductCount'])

const selectedMethod = ref<PaymethodType | null>(null)

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
// ]

function selectMethod(method: PaymethodType) {
  selectedMethod.value = method
  emit('changePayMethod', method)
}

function handleClose() {
  emit('onCloseDialog')
}

const priceStr = computed(() => {
  if (!props.selectedProduct)
    return ''
  return getPriceStr(props.selectedProduct, props.currencyCode)
})

function checkout() {
  emit('checkout')
}

function addProductCount() {
  emit('addProductCount')
}
function reduceProductCount() {
  emit('reduceProductCount')
}
</script>

<template>
  <div class="scrollWidthNone max-h-[90vh] overflow-x-hidden overflow-y-auto text-20">
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute right-15 top-13 z-10 h-24 w-24 cursor-pointer"
      @click="handleClose"
    >
      <circle
        opacity="0.08"
        cx="12"
        cy="12"
        r="12"
        fill="#333"
      />
      <g
        stroke="#666"
        stroke-width="2"
        stroke-linecap="round"
      ><path d="m8.691 15.531 7.071-7.07M8.691 8.469l7.071 7.07" /></g>
    </svg>
    <div class="relative h-45 w-full f-c bg-[#fff] px-15 text-18">
      确认支付订单
    </div>
    <div class="h-auto bg-[#fff] px-15 pb-15 pt-10">
      <div class="flex items-center">
        <div class="leftPanel mr-10 min-w-300 w-387">
          <div class="roleInfo flex rounded-10 bg-[#E0E0E0] py-6 pl-7 pr-10">
            <div class="flex items-center">
              <img
                class="h-63 w-63 rounded-10"
                src="@/assets/icons/Avatar.png"
                draggable="false"
              >
              <div class="ml-10 flex-col">
                <div>UID : {{ userInfo?.uid }}</div>
                <div mt-10>
                  {{ userInfo?.nick }}
                </div>
              </div>
            </div>
          </div>
          <div class="orderInfo my-10 h-518 rounded-10 bg-[#E0E0E0] py-10">
            <div class="mb-8 px-10 text-12 color-[#666666] leading-16">
              商品信息
            </div>
            <div class="f-b px-10">
              <div flex>
                <img
                  class="h-63 w-63 rounded-12 bg-contain bg-no-repeat"
                  :src="selectedProduct?.img"
                  alt=""
                >
                <div class="f-c p-10 font-bold">
                  {{ selectedProduct?.title }}
                </div>
              </div>
              <div>
                <div class="f-c">
                  <div
                    class="h-24 w-24 f-c cursor-not-allowed border-2 rounded-full rounded-full border-solid color-[#cccccc]"
                    :class="{ 'color-[#ED6504] cursor-pointer! ': productCount > 1 }"
                    @click="reduceProductCount"
                  >
                    <div class="i-ic:baseline-minus h-20 w-20" />
                  </div>
                  <div class="mx-10">
                    {{ productCount }}
                  </div>
                  <div
                    class="h-24 w-24 f-c cursor-pointer rounded-full bg-[#ED6504]"
                    @click="addProductCount"
                  >
                    <div
                      class="i-ic:baseline-add h-20 w-20"
                      style="color: #fff;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rightPanel min-w-300 w-326">
          <div class="scrollWidthNone h-360 overflow-y-auto border border-[#eee] rounded-10 border-solid bg-[#E0E0E0]">
            <div class="px-10 pb-15 pt-10">
              <div class="mb-10 flex items-center">
                <p class="text-12 color-[#666666] font-normal">
                  支付方式
                </p>
              </div>
              <div
                v-for="method in payMethodList"
                :key="method.payType"
                class="payList mb-10 h-40 f-c cursor-pointer rounded-8"
                :class="selectedMethod === method ? 'border border-solid border-[#ED6504] bg-[#fff5e6]' : 'b-s bg-[#fff]'"
                @click="selectMethod(method)"
              >
                <img
                  :src="method.icon"
                  :alt="method.name"
                  class="max-h-30 max-w-[40%]"
                >
              </div>
            </div>
          </div>
          <div class="mt-10 h-218 flex flex-col justify-between border border-[#eee] rounded-10 border-solid bg-[#E0E0E0] p-10">
            <div class="mt-15">
              <div class="mb-5 h-24 f-b text-14">
                <span class="min-w-70 color-[#666666]">商品价格:</span>
                <span class="color-[#ED6504] font-medium">{{ priceStr }}</span>
              </div>
              <div class="mb-5 h-24 f-b text-14">
                <span class="min-w-70 color-[#666666]">商城折扣:</span>
                <span class="color-[#ED6504] font-medium">{{ priceStr }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-12">
              <div class="f-b text-16 leading-16">
                <div>合计：</div>
                <div class="text-18 color-[#ED6504] font-bold">
                  {{ priceStr }}
                </div>
              </div>
              <div
                class="mr-10 h-44 w-full f-c cursor-pointer rounded-25 bg-[#ED6504] text-18 color-[#fff]"
                @click="checkout"
              >
                立即支付
              </div>
            </div>
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
.scrollWidthNone {
  scrollbar-width: none;
}
</style>
