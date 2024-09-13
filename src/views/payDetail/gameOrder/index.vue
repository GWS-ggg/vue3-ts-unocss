<script setup lang="ts">
interface PayMethod {
  id: number
  name: string
  description: string
  logo: string
}

const emit = defineEmits(['onCloseDialog'])

const selectedMethod = ref<number | null>(null)

const payMethods: PayMethod[] = [
  {
    id: 1,
    name: '支付宝',
    description: 'Alipay',
    logo: '/src/assets/icons/alipay-log.png',
  },
  {
    id: 2,
    name: '微信支付',
    description: 'WeChat Pay',
    logo: '/src/assets/icons/wechat-pay-logo.png',
  },
]

function selectMethod(id: number) {
  selectedMethod.value = id
}

function handleClose() {
  emit('onCloseDialog')
}
</script>

<template>
  <div class="scrollWidthNone max-h-[90vh] overflow-x-hidden overflow-y-auto text-16">
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-15 top-13 z-10 h-24 w-24 cursor-pointer" @click="handleClose">
      <circle opacity="0.08" cx="12" cy="12" r="12" fill="#333" />
      <g stroke="#666" stroke-width="2" stroke-linecap="round"><path d="m8.691 15.531 7.071-7.07M8.691 8.469l7.071 7.07" /></g>
    </svg>
    <div class="relative h-45 w-full f-c bg-[#fff] px-15 text-18">
      确认支付订单
    </div>
    <div class="h-auto bg-[#fff] px-15 pb-15 pt-10">
      <div class="flex items-center">
        <div class="leftPanel mr-10 min-w-300 w-387">
          <div class="roleInfo h-44 w-full flex rounded-10 bg-[#f0f0f0] py-6 pl-7 pr-10">
            <div class="w-full flex">
              <div class="svgImg block h-32 w-32 flex-basis-32 overflow-hidden rounded-[50%] bg-cover bg-no-repeat">
                <img
                  class="h-full w-full"
                  src="https://imv2-gl.lilithgame.com/afk2/avatar/spui_avatarhead_1.png"
                  draggable="false"
                  style="object-fit: cover; display: block"
                >
              </div>
              <div class="uidInfo w-full f-c">
                uidInfo
              </div>
            </div>
          </div>
          <div class="orderInfo my-10 h-518 rounded-10 bg-[#f8f8f8] py-10">
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
          </div>
        </div>
        <div class="rightPanel min-w-300 w-326">
          <div class="scrollWidthNone h-360 overflow-y-auto border border-[#eee] rounded-10 border-solid bg-[#f8f8f8]">
            <div class="px-10 pb-15 pt-10">
              <div class="mb-10 flex items-center">
                <p class="text-12 color-[#666666] font-normal">
                  支付方式
                </p>
              </div>
              <div
                v-for="method in payMethods"
                :key="method.id"
                class="payList mb-10 h-40 f-c cursor-pointer rounded-8"
                :class="selectedMethod === method.id ? 'border border-solid border-[#d32f2f] bg-[#fff8f8]' : 'b-s bg-[#fff]'"
                @click="selectMethod(method.id)"
              >
                <img :src="method.logo" :alt="method.description" class="max-h-30 max-w-[40%]">
              </div>
            </div>
          </div>
          <div class="mt-10 h-218 flex flex-col justify-between border border-[#eee] rounded-10 border-solid bg-[#f8f8f8] p-10">
            <div class="mt-15 px-10">
              <div class="mb-5 h-24 f-b text-14">
                <span class="min-w-70 color-[#666666]">商品价格:</span>
                <span class="color-red-600 font-medium">$ 6.00</span>
              </div>
            </div>
            <div class="flex flex-col gap-12">
              <div class="f-s text-16 leading-16">
                <p>合计：</p>
                <div class="text-18 color-red-6 font-bold">
                  ￥ 6.00
                </div>
              </div>
              <div class="mr-10 h-44 w-full f-c cursor-pointer rounded-25 bg-[#f54042] text-18 color-[#fff]">
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
