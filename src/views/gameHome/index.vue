<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { Autoplay, EffectCoverflow, Pagination, Scrollbar } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import { useRouter } from 'vue-router'
import { isPCDevice } from '@/utils/flexible'
import HeaderContainer from '@/components/header/index.vue'
import FooterContainer from '@/components/footer/index.vue'
import { t } from '@/language/i18n'

interface GameBg {
  bgImageMobile: string
  bgImagePC: string
  title: string
  titleImage: string
  description: string

}

interface GameCard {
  bgImage: string
  title: string
  logoImage: string
  link: string
}

const games = ref<GameBg[]>([
  { bgImageMobile: '/src/assets/images/Lilith Games_files/AFK_banner_m.jpg', title: '剑与远征：启程', titleImage: '/src/assets/images/Lilith Games_files/AFK-logo-cn.png', description: '由你，唤醒魔法旷野', bgImagePC: '/src/assets/images/Lilith Games_files/AFK_banner.jpg' },
  { bgImageMobile: '/src/assets/images/Lilith Games_files/m_01.jpg', title: '众神派对', titleImage: '/src/assets/images/Lilith Games_files/logo_01.png', description: '电音幻想风都市神话RPG', bgImagePC: '/src/assets/images/Lilith Games_files/pc_01.jpg' },
  { bgImageMobile: '/src/assets/images/Lilith Games_files/banner_m_01.jpg', title: '战火勋章', titleImage: '/src/assets/images/Lilith Games_files/logo_02.png', description: '由你，唤醒魔法旷野', bgImagePC: '/src/assets/images/Lilith Games_files/banner_01.jpg' },

])

const gameCardList = ref<GameCard[]>([
  { bgImage: '/src/assets/images/Lilith Games_files/AFK-bg.jpg', title: '剑与远征：启程', logoImage: '/src/assets/images/Lilith Games_files/AFK-avater-cn.png', link: 'https://afkjourney.lilith.com/' },
  { bgImage: '/src/assets/images/Lilith Games_files/xgame_01.jpg', title: '众神派对', logoImage: '/src/assets/images/Lilith Games_files/icon_02.jpg', link: 'https://afkjourney.lilith.com/' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '战火勋章', logoImage: '/src/assets/images/Lilith Games_files/icon_03.png', link: 'https://afkjourney.lilith.com/' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '战火勋章', logoImage: '/src/assets/images/Lilith Games_files/icon_03.png', link: 'https://afkjourney.lilith.com/' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '战火勋章', logoImage: '/src/assets/images/Lilith Games_files/icon_03.png', link: 'https://afkjourney.lilith.com/' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '战火勋章', logoImage: '/src/assets/images/Lilith Games_files/icon_03.png', link: 'https://afkjourney.lilith.com/' },
])

function testClick() {
  console.log('testclick')
}

// swiper for gameList
const swiperRef = ref<SwiperClass | null>(null)
const isFirstSlide = ref(true)
const isLastSlide = ref(false)
function onSwiper(swiper: SwiperClass) {
  swiperRef.value = swiper
}

function goToNextSlide() {
  if (swiperRef.value) {
    swiperRef.value.slideNext()
  }
}
function goToPrevSlide() {
  if (swiperRef.value) {
    swiperRef.value.slidePrev()
  }
}

function onSlideChange() {
  if (swiperRef.value) {
    isFirstSlide.value = swiperRef.value.isBeginning
    isLastSlide.value = swiperRef.value.isEnd
  }
}

//  swiper for banner
const modules = [Scrollbar, Pagination, Autoplay, EffectCoverflow]
const swiperBannerRef = ref<SwiperClass | null>(null)
function onBannerSwiper(swiper: SwiperClass) {
  swiperBannerRef.value = swiper
}

function goToNextBannerSlide() {
  if (swiperBannerRef.value) {
    swiperBannerRef.value.slideNext()
  }
}
function goToPrevBannerSlide() {
  if (swiperBannerRef.value) {
    swiperBannerRef.value.slidePrev()
  }
}

function onBannerSlideChange() {
  // 添加移动式样
  console.log('testClass')
}

// 路由跳转
const router = useRouter()

//  跳转到游戏列表
function navigatieToGameList() {
  router.push('/gameList')
  nextTick(() => {
    window.scrollTo(0, 0) // 确保滚动到顶部
  })
}

// 跳转到游戏详情页面
function navigatieToGameDetail() {
  router.push('/gameDetail')
}
</script>

<template>
  <el-container>
    <HeaderContainer />
    <el-main class="mt-50 w-full p-[0]!" :class="{ 'mt-60 ': isPCDevice }">
      <div class="bannerTest relative bg-[#000] color-[#fff]">
        <Swiper
          :navigation="true"
          :autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
          :slides-per-view="1"
          :loop="true"
          :modules="modules"
          @swiper="onBannerSwiper"
          @slide-change="onBannerSlideChange"
        >
          <SwiperSlide
            v-for="item in games"
            v-slot="{ isActive }" :key="item.title" class="relative w-[100vw] cursor-pointer"
            :style="{ height: isPCDevice ? '540px' : '106.67vw' } "
          >
            <div :class="{ 'absolute left-0 top-0 w-full': isPCDevice }">
              <img
                :src="isPCDevice ? item.bgImagePC : item.bgImageMobile" alt=""
                class="h-61.33vw w-full object-contain" :class="{ 'h-auto': isPCDevice, 'bannrImgAnimation': isActive }"
              >
            </div>
            <img
              v-if="!isPCDevice" :src="item.titleImage" alt=""
              class="absolute inset-x-0 top-61.33vw mx-auto h-25.2vw min-h-[30vw] transform -translate-y-[100%]"
              @click="testClick"
            >
            <div v-if="!isPCDevice" class="mt-20 text-center">
              <div class="h-30 text-25 leading-30" @click="testClick">
                {{ item.title }}
              </div>
              <div class="h-30 text-16 leading-30">
                {{ item.description }}
              </div>
              <div class="m-x-auto mt-6.66vw h-12.266vw w-89.333vw f-c cursor-pointer bg-[#d32f2f] text-18">
                了解详情
              </div>
            </div>
            <div v-if="isPCDevice" class="relative m-auto h-[100%] max-w-1560 pl-100 text-left">
              <img :src="item.titleImage" alt="" class="mb-40.5 mt-58 h-136.5" :class="{ textImgAnimation: isActive }" @click="testClick">
              <div class="absolute bottom-80 left-100">
                <div class="h-63 text-50 font-450 leading-63 text-shadow" :class="{ textImgAnimation: isActive }">
                  {{ item.title }}
                </div>
                <div class="h-63 text-50 font-450 leading-63 text-shadow" :class="{ textImgAnimation: isActive }">
                  {{ item.description }}
                </div>
                <div
                  class="mt-28 h-46 w-176 f-c cursor-pointer border border-[#d32f2f] border-solid border-solid bg-[#d32f2f] text-18 color-[#fff] op-[.9999]" :class="{ textImgAnimation: isActive }"
                >
                  了解详情
                </div>
              </div>
            </div>
          </SwiperSlide>
          <!-- 自定义导航箭头 -->
          <div class="absolute left-0 top-[45%] z-10 h-60 w-24 f-c cursor-pointer bg-[rgba(0,0,0,.3)] color-[#d32f2f]" :class="{ 'left-20 h-80 w-40': isPCDevice }">
            <div class="i-iconamoon:arrow-left-2-thin h-36 w-36" @click="goToPrevBannerSlide" />
          </div>
          <div
            class="absolute right-0 top-[45%] z-10 h-60 w-24 f-c cursor-pointer bg-[rgba(0,0,0,.3)] color-[#d32f2f]"
            :class="{ 'right-20 h-80 w-40': isPCDevice }"
          >
            <div class="i-iconamoon:arrow-right-2-thin h-36 w-36" @click="goToNextBannerSlide" />
          </div>
        </Swiper>
      </div>
      <div
        class="mobileGameContainer mt-45"
        :class="{ 'w-full text-center m-auto relative px-40 min-w-1440 max-w-1560 ': isPCDevice }"
      >
        <div class="gameTitle mb-15 f-s pl-20" :class="{ ' w-full max-w-1560 pl-[0]! ': isPCDevice }">
          <div class="text-22" :class="{ 'text-30': isPCDevice }">
            <span class="color-[#333]">{{ t('message.game') }}</span>
          </div>
          <div v-if="isPCDevice" class="ml-12 f-c cursor-pointer text-18 color-[#d32f2f]" @click="navigatieToGameList">
            <span>查看所有游戏</span>
            <div class="i-iconamoon:arrow-right-2 ml-4 h-20 w-20" style="color: #e21818;" />
          </div>
          <div v-if="!isPCDevice" class="i-iconamoon:arrow-right-2 ml-16 h-20 w-20" style="color: #e21818;" @click="navigatieToGameList" />
          <!-- 跳转到游戏列表 -->
        </div>
        <div
          v-if="!isPCDevice"
          class="scrollbar-hidden mobileGameList w-full overflow-x-auto overflow-y-hidden whitespace-nowrap pb-30 text-left"
        >
          <div
            v-for="gameCardItem in gameCardList" :key="gameCardItem.title" class="relative ml-20 inline-block h-full w-47.2vw cursor-pointer"
            @click="navigatieToGameDetail"
          >
            <div class="relative h-66.133vw w-full">
              <img :src="gameCardItem.bgImage" class="h-full w-full" alt="">
              <div
                class="mobileGameCardDesc absolute bottom-0 left-0 z-0 h-26.133vw w-full text-center text-16 color-[#fff] leading-26.133vw"
              >
                {{ gameCardItem.title }}
              </div>
            </div>
            <div class="gameLogo relative mx-auto h-70 w-70 op-[.999] -mt-30">
              <img
                :src="gameCardItem.logoImage" alt=""
                class="gameLogoBlur absolute bottom-10 left-10 h-50 w-50 rounded-15 -z-2"
              >
              <img :src="gameCardItem.logoImage" alt="" class="h-60 w-60 rounded-15 op-[.99999]">
            </div>
          </div>
        </div>
        <div v-if="isPCDevice" class="relative">
          <div class="relative mb-100 w-full">
            <Swiper :slides-per-view="4" :space-between="20" @swiper="onSwiper" @slide-change="onSlideChange">
              <SwiperSlide v-for="(slide, index) in gameCardList" :key="index">
                <div class="gameCardParentHover relative w-full cursor-pointer pb-48" @click="navigatieToGameDetail">
                  <div class="relative h-454 overflow-hidden">
                    <img :src="slide.bgImage" :alt="slide.title" class="block w-full">
                    <div class="gameCardPCDesc absolute bottom-0 z-0 h-228 w-full f-e flex-col color-[#fff]">
                      <div class="gameTitlePCShadow overflow-hidden text-ellipsis whitespace-nowrap text-24">
                        {{ slide.title }}
                      </div>
                      <div class="gameTitlePCDesc mb-80 mt-12 overflow-hidden text-ellipsis text-14 leading-18">
                        {{ slide.title }}
                      </div>
                    </div>
                  </div>
                  <div class="relative mx-auto h-100 w-100 -mt-50">
                    <img
                      :src="slide.logoImage"
                      class="gameLogoBlur absolute left-5 top-10 h-90 w-90 rounded-25 op-[.999] -z-1" alt=""
                    >
                    <img :src="slide.logoImage" class="h-full w-full rounded-25 op-[.999]" alt="">
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div
              class="swiperArrowShadow absolute left-0 top-[40%] z-100 h-40 w-40 f-c cursor-pointer rounded-[50%] bg-[#fff] color-[#666]"
              :class="{ 'op-0': isFirstSlide }" @click="goToPrevSlide"
            >
              <div class="i-iconamoon:arrow-left-2-thin h-24 w-24" />
            </div>
            <div
              class="swiperArrowShadow absolute right-0 top-[40%] z-100 h-40 w-40 f-c cursor-pointer rounded-[50%] bg-[#fff] color-[#666]"
              :class="{ 'op-0': isLastSlide }" @click="goToNextSlide"
            >
              <div class="i-iconamoon:arrow-right-2-thin h-24 w-24" />
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
  <FooterContainer />
</template>

<style lang="less" scoped>
:deep(.el-select__placeholder) {
  color: #fff
}

:deep(.el-select__wrapper) {
  background-color: #000000;
  box-shadow: none;
}

:deep(.el-select__caret) {
  color: #ffffff;
  /* 修改下拉标签颜色 */
}

/* 去掉边框 */
:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: none;
}

:deep(.el-select-dropdown__item.is-selected) {
  color: #000;
  background-color: #e6f7ff
}

:deep(.el-select__popper.el-popper) {
border: none;
box-shadow: none
}

:deep(.el-select-dropdown) {
position: absolute;
/* 设置下拉框为绝对定位 */
top: -5px;
/* 删除空隙*/
z-index: 1000;
/* 确保下拉框在其他元素之上 */
background: #fff;
}

:deep(.el-popper__arrow) {
display: none;
/* 隐藏小三角图标 */
}

:deep(.el-carousel__arrow) {
width: 20px;
/* 宽度 */
height: 60px;
/* 高度 */
color: #d32f2f;
/* 箭头颜色 */
background-color: rgba(0, 0, 0, .3);
/* 箭头背景色 */
border-radius: 0px
}

// 切换箭头大小修改
:deep(.el-icon) {
width: 20px;
height: 20px;
}

:deep(.el-icon svg) {
width: 20px;
height: 20px;
}
.el-menu--horizontal.el-menu {
  border-bottom: none;
}

.el-menu--horizontal {
  --el-menu-horizontal-height: 50px;
}

:deep(.el-carousel__arrow--right) {
  right: 0px
}

:deep(.el-carousel__arrow--left) {
  left: 0px
}

.mobileGameCardDesc {
  background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, .8));
  text-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.gameLogoBlur {
  -webkit-filter: blur(17px);
  filter: blur(17px);
}

.gameTitleTransform {
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.el-carousel__item--card {
  width: 340px
}

.gameTitlePCShadow {
  text-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.gameTitlePCDesc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.gameCardPCDesc {
  padding: 0 25px;
  opacity: 0;
  background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(#000));
  background-image: linear-gradient(180deg, transparent, #000);
}

.gameCardParentHover:hover .gameCardPCDesc {
  opacity: 1;
  -webkit-transition: all .5s;
  transition: all .5s;
}

.bannrImgAnimation {
     -webkit-animation: fadeIn___PLlz 3s linear ;
     animation: fadeIn___PLlz 3s linear ;

}
@keyframes fadeIn___PLlz {
  0% {
    transform: translateX(1%);
  }
  100% {
    transform: translateX(0); /* 向左移动20px */
  }
}

.textImgAnimation {
  -webkit-animation: desc___3b3R8 1s linear forwards;
  animation: desc___3b3R8 1s linear forwards;
}
@keyframes desc___3b3R8 {
  0% {
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
