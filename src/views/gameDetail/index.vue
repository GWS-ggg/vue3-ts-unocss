<script setup lang="ts">
import NavBar from './navBar/index.vue'
import OrderDialog from './gameOrder/index.vue'
import OrderPop from './gameOrderPop/index.vue'
import { isPCDevice } from '@/utils/flexible'

// 支付总开关
function showPayOrder() {
  if (isPCDevice.value) {
    onShowDialog()
  }
  else {
    onShowPopup()
  }
}

// 支付dialog开关
const dialogOpen = ref<boolean>(false)
function onShowDialog() {
  dialogOpen.value = true
}
function handleOk(e: MouseEvent) {
  console.log(e)
  dialogOpen.value = false
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
interface goodsInfo {
  title: string
  image: string
  price: string
}

const goodsInfoArray = ref<goodsInfo[]>([
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
  {
    image: 'https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp',
    title: '20龙焰晶',
    price: '¥ 6.00',
  },
])
</script>

<template>
  <div class="bg-[#f4f4f4]">
    <NavBar />
    <div class="mt-44" :class="{ imageMarginTop: isPCDevice }">
      <div class="relative h-auto w-full overflow-hidden">
        <img src="@/assets/images/home.jpg" alt="Header" class="w-full">
      </div>
    </div>
    <div class="relative mx-auto mt-10 max-w-1200">
      <div
        class="relative mx-15 w-auto flex flex-col items-center rounded-10 bg-[#ffffff] px-10 pb-10 pt-4 shadow-none -mt-30"
        md="w-full -mt-40 shadow-md p-15"
      >
        <div class="w-full flex items-center" md="w-auto">
          <img
            src="@/assets/images/pic1.webp"
            alt=""
            class="relative me-5 h-48 w-48 rounded-12 rounded-20 object-cover -mt-15"
            md="w-70 h-70 rounded-20 me-15"
          >
          <div>游戏名称</div>
        </div>
        <div class="ms-auto min-w-200 f-c flex flex-shrink flex-grow-0 flex-basis-360">
          <div class="mr-10">
            UID
          </div>
          <input class="mr-10 h-35 rounded-20" type="text">
          <div class="h-[50%] w-40 f-c cursor-pointer b-s rounded-30 bg-red">
            登录
          </div>
        </div>
      </div>
      <div class="mb-40 mt-20 bg-[#fff] shadow-md">
        <div class="h-50 w-full rounded-10 bg-[#fff] ps-12">
          <p class="pt-10 text-18 leading-25">
            礼包选择
          </p>
        </div>
        <div class="flex flex-wrap justify-start gap-12 px-15">
          <div
            v-for="(goods, index) in goodsInfoArray"
            :key="index"
            class="giftMediaWidth relative mb-16 min-h-150 min-w-150 flex flex-row cursor-pointer border rounded-24 text-center shadow-md"
          >
            <div class="w-full overflow-hidden rounded-25 shadow-lg">
              <div
                class="relative h-0 w-full bg-contain bg-center bg-no-repeat pb-[calc((92/164)*100%)]"
                :style="{ backgroundImage: `url(${goods.image})` }"
              />
              <div class="p-4 text-center">
                <div class="mb-17 font-semibold">
                  {{ goods.title }}
                </div>
                <div
                  class="mt-auto h-38 w-full f-c cursor-pointer border rounded-25 bg-red text-center text-12 color-[#fff] leading-12"
                  @click="showPayOrder"
                >
                  {{ goods.price }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model:open="dialogOpen" :mask-closable="false" :footer="null" width="750px" @ok="handleOk">
      <template #title>
        <div class="text-center">
          确认支付订单
        </div>
      </template>
      <OrderDialog />
    </a-modal>
    <m-popup v-model="isVisblePopup">
      <OrderPop @on-close-popup="onClosePopup" />
    </m-popup>
  </div>
</template>

<style scoped>
.imageMarginTop {
  margin-top: 80px;
}

@media screen and (min-width: 1180px) {
  .giftMediaWidth {
    width: calc((100% - 48px) / 5);
  }
}

@media screen and (max-width: 1180px) and (min-width: 900px) {
  .giftMediaWidth {
    width: calc((100% - 36px) / 4);
  }
}

@media screen and (max-width: 900px) and (min-width: 504px) {
  .giftMediaWidth {
    width: calc((100% - 24px) / 3);
  }
}

@media screen and (max-width: 504px) {
  .giftMediaWidth {
    width: calc((100% - 12px) / 2);
  }
}
</style>
