<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavBar from './navBar/index.vue'
import { isMobile } from '@/utils/flexible'
import GameOrder from './gameOrder/index.vue'
const route = useRoute()
const title = route.params.title // 获取路由参数
const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
}
const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
</script>

<template>
  <div>
    <NavBar></NavBar>
    <div class="mt-80" :class="{ imageMarginTop: isMobile }">
      <div class="relative h-0 w-full overflow-hidden pb-[15.625%]">
        <img src="@/assets/images/home.jpg" alt="Header" class="w-full" />
      </div>
    </div>
    <div class="max-w-1200 relative mx-auto my-0">
      <div class="rounded-10 p-15 relative -mt-40 flex w-full content-center bg-[#ffffff] shadow-md">
        <div class="me-10 flex flex-1 content-center">
          <img src="@/assets/images/pic1.webp" alt="" class="w-70 rounded-20 me-15 h-70 relative object-cover" />
          <div flex-1>游戏名称</div>
        </div>
        <div class="flex-basis-360 min-w-200 f-c ms-auto flex flex-shrink flex-grow-0">
          <div class="mr-10">UID</div>
          <input class="h-35 rounded-20 mr-10" type="text" />
          <div class="b-s bg-red f-c rounded-30 h-[50%] w-40 cursor-pointer">登录</div>
        </div>
      </div>
      <div class="rounded-10 mb-40 mt-20 bg-[#fff] shadow-md">
        <div class="h-50 rounded-10 w-full bg-[#fff] ps-12">
          <p class="text-18 leading-25 ml-25 pt-10">礼包选择</p>
        </div>
        <div class="min-w-350 pl-30 mt-10 flex flex-wrap justify-start py-10 pr-10">
          <div
            class="rounded-t-23 min-w-200 max-h-358 mb-22 relative me-20 flex w-[calc(100%-100px)/5] cursor-pointer flex-row text-center shadow-md"
          >
            <div class="w-full overflow-hidden shadow-lg">
              <div class="relative">
                <div
                  class="rounded-t-23 pb-118 relative h-0 w-full bg-contain bg-center bg-no-repeat"
                  style="
                    background-image: url('https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp');
                  "
                ></div>
              </div>
              <div class="p-4 text-center">
                <div class="mb-17 font-semibold">20龙焰晶</div>
                <div
                  class="rounded-25 color-[#fff] f-c text-18 leading-25 bg-red mt-auto h-44 w-full cursor-pointer border text-center"
                  @click="showModal"
                >
                  ¥ 6.00
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded-t-23 min-w-200 max-h-358 mb-22 relative me-20 flex w-[calc(100%-100px)/5] cursor-pointer flex-row text-center shadow-md"
          >
            <div class="w-full overflow-hidden shadow-lg">
              <div class="relative">
                <div
                  class="rounded-t-23 pb-118 relative h-0 w-full bg-contain bg-center bg-no-repeat"
                  style="
                    background-image: url('https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp');
                  "
                ></div>
              </div>
              <div class="p-4 text-center">
                <div class="mb-17 font-semibold">20龙焰晶</div>
                <div class="rounded-25 color-[#fff] f-c text-18 leading-25 bg-red mt-auto h-44 w-full cursor-pointer border text-center">¥ 6.00</div>
              </div>
            </div>
          </div>
          <div
            class="rounded-t-23 min-w-200 max-h-358 mb-22 relative me-20 flex w-[calc(100%-100px)/5] cursor-pointer flex-row text-center shadow-md"
          >
            <div class="w-full overflow-hidden shadow-lg">
              <div class="relative">
                <div
                  class="rounded-t-23 pb-118 relative h-0 w-full bg-contain bg-center bg-no-repeat"
                  style="
                    background-image: url('https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp');
                  "
                ></div>
              </div>
              <div class="p-4 text-center">
                <div class="mb-17 font-semibold">20龙焰晶</div>
                <div class="rounded-25 color-[#fff] f-c text-18 leading-25 bg-red mt-auto h-44 w-full cursor-pointer border text-center">¥ 6.00</div>
              </div>
            </div>
          </div>
          <div
            class="rounded-t-23 min-w-200 max-h-358 mb-22 relative me-20 flex w-[calc(100%-100px)/5] cursor-pointer flex-row text-center shadow-md"
          >
            <div class="w-full overflow-hidden shadow-lg">
              <div class="relative">
                <div
                  class="rounded-t-23 pb-118 relative h-0 w-full bg-contain bg-center bg-no-repeat"
                  style="
                    background-image: url('https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp');
                  "
                ></div>
              </div>
              <div class="p-4 text-center">
                <div class="mb-17 font-semibold">20龙焰晶</div>
                <div class="rounded-25 color-[#fff] f-c text-18 leading-25 bg-red mt-auto h-44 w-full cursor-pointer border text-center">¥ 6.00</div>
              </div>
            </div>
          </div>
          <div
            class="rounded-t-23 min-w-200 max-h-358 mb-22 relative me-20 flex w-[calc(100%-100px)/5] cursor-pointer flex-row text-center shadow-md"
          >
            <div class="w-full overflow-hidden shadow-lg">
              <div class="relative">
                <div
                  class="rounded-t-23 pb-118 relative h-0 w-full bg-contain bg-center bg-no-repeat"
                  style="
                    background-image: url('https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp');
                  "
                ></div>
              </div>
              <div class="p-4 text-center">
                <div class="mb-17 font-semibold">20龙焰晶</div>
                <div class="rounded-25 color-[#fff] f-c text-18 leading-25 bg-red mt-auto h-44 w-full cursor-pointer border text-center">¥ 6.00</div>
              </div>
            </div>
          </div>
          <div
            class="rounded-t-23 min-w-200 max-h-358 mb-22 relative me-20 flex w-[calc(100%-100px)/5] cursor-pointer flex-row text-center shadow-md"
          >
            <div class="w-full overflow-hidden shadow-lg">
              <div class="relative">
                <div
                  class="rounded-t-23 pb-118 relative h-0 w-full bg-contain bg-center bg-no-repeat"
                  style="
                    background-image: url('https://imv2.lilithgame.com/pluto/mall/uat/uploads/1725264449236.png?x-oss-process=image/format,webp');
                  "
                ></div>
              </div>
              <div class="p-4 text-center">
                <div class="mb-17 font-semibold">20龙焰晶</div>
                <div class="rounded-25 color-[#fff] f-c text-18 leading-25 bg-red mt-auto h-44 w-full cursor-pointer border text-center">¥ 6.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model:open="open" maskClosable="false" mask="true" width="700px" @ok="handleOk">
      <game-order />
    </a-modal>
  </div>
</template>

<style scoped>
.imageMarginTop {
  margin-top: 40px;
}
</style>
