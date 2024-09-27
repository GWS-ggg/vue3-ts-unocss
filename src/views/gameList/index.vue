<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperClass } from 'swiper/types'
import { useRouter } from 'vue-router'
import HeaderContainer from '@/components/header/index.vue'
import FooterContainer from '@/components/footer/index.vue'
import { isPCDevice } from '@/utils/flexible'
import { t } from '@/language/i18n'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

interface GameCard {
  bgImage: string
  title: string
  description: string
  logoImage: string
  avaterImage: string
}
const gameCardList = ref<GameCard[]>([
  { bgImage: '/src/assets/images/game_list/AFK_opt-2_P5.png', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/AFK-logo-cn.png', avaterImage: '/src/assets/images/Lilith Games_files/AFK-avater-cn.png' },
  { bgImage: '/src/assets/images/Lilith Games_files/xgame_01.jpg', title: '众神派对', description: '电音幻想风都市神话RPG', logoImage: '/src/assets/images/Lilith Games_files/logo_01.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_02.jpg' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/logo_02.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_03.png' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/logo_02.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_03.png' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/logo_02.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_03.png' },

])

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

// 路由跳转
const router = useRouter()
// 跳转到游戏详情页面
function navigatieToGameDetail() {
  router.push('/gameDetail')
}
</script>

<template>
  <div class="max mt-80 h-full w-[100vw] bg-[#fff]">
    <HeaderContainer />
    <div class="w-[100vw] text-center text-left">
      <div v-if="isPCDevice" class="relative h-300 w-1920 f-c flex-col text-align-left color-[#fff]">
        <div class="bannerImgTransfrom absolute left-[50%] top-0 z-0 h-full w-full">
          <img src="@/assets/images/game_list/game_banner.png" alt="" h-full w-full>
        </div>
        <div class="absolute top-21">
          <div><img class="h-100 w-400" src="@/assets/icons/99-logo.png" alt=""></div>
          <div class="mt-21 text-center text-50 color-[#ED6504] font-bold leading-40 op-[0.9999]">
            {{ t('message.ourGames') }}
          </div>
        </div>
      </div>
      <div v-if="!isPCDevice" class="m-auto mt-43 w-full px-29 pb-20 pt-30" :class="{ 'min-w-1440 max-w-1560 px-40 pt-50 pb-39': isPCDevice }">
        <div v-for="(gameCard, index) in gameCardList" :key="gameCard.title" class="gameCardShadow mb-30 h-57.6vw w-full flex cursor-pointer bg-[#eee]" :class="{ 'gameCardPC': isPCDevice, 'mr-60': index % 2 === 0 && isPCDevice }" :style="{ backgroundImage: `url('${gameCard.bgImage}')`, backgroundSize: '100%' }">
          <div
            class="gameCardIntro relative inline-block h-full text-left align-top"
            :class="{ 'w-230 py-30 pl-30  ': isPCDevice,
                      'w-[32vw] py-[4vw] pl-[4vw] ': !isPCDevice }"
          >
            <div class="overflow-hidden" :class="{ 'w-110 h-110': isPCDevice, 'h-[16vw] w-[16vw]': !isPCDevice }">
              <img :src="gameCard.avaterImage" class="h-full w-full" alt="" :class="{ 'rounded-22': isPCDevice, 'rounded-3.2vw': !isPCDevice }">
            </div>
            <div class="w-full break-all color-[#333]" :class="{ 'text-28 leading-34 mt-20 mb-6': isPCDevice, 'mb-4 mt-12 leading-23 text-26': !isPCDevice }">
              {{ gameCard.title }}
            </div>
            <div class="mt-20 pr-10 color-[#666]" :class="{ 'text-14 leading-17': isPCDevice, 'leading-15 text-18': !isPCDevice }">
              {{ gameCard.description }}
            </div>
            <div v-if="isPCDevice" class="gameCardExplore">
              探索
            </div>
          </div>
          <div class="relative inline-block text-right align-top" :class="{ 'w-420 h-420': isPCDevice, ' w-57.333vw h-full': !isPCDevice }" :style="{ backgroundImage: `url('${gameCard.bgImage}')`, backgroundSize: '100%' }">
            <img :src="gameCard.logoImage" alt="" class="object-contain" :class="{ 'w-165 h-90 mt-330': isPCDevice, 'mt-45.333vw h-46 w-84': !isPCDevice }">
          </div>
        </div>
      </div>
      <div v-if="isPCDevice" class="relative mb-40 ml-74 mr-58 mt-77">
        <div class="relative w-full">
          <Swiper :slides-per-view="2" :space-between="80" @swiper="onSwiper" @slide-change="onSlideChange">
            <SwiperSlide v-for="(slide, index) in gameCardList" :key="index">
              <div class="relative w-full cursor-pointer" @click="navigatieToGameDetail">
                <div class="boxShadow relative h-643 overflow-hidden">
                  <img :src="slide.bgImage" :alt="slide.title" class="block w-full">
                  <div class="absolute left-0 top-0 z-0 h-full w-405 bg-[#fff] bg-op-90 color-[#222C37]">
                    <div class="ml-39 mt-50">
                      <div class="h-180 w-180 overflow-hidden rounded-20">
                        <img :src="slide.avaterImage" class="h-full w-full" alt="">
                      </div>
                      <div class="mt-40 overflow-hidden text-ellipsis whitespace-nowrap text-30 font-bold">
                        {{ slide.title }}
                      </div>
                      <div class="mt-40 overflow-hidden text-ellipsis whitespace-nowrap text-26">
                        {{ slide.description }}
                      </div>
                    </div>

                    <!-- <div class="gameTitlePCDesc mb-80 mt-12 overflow-hidden text-ellipsis text-14 leading-18">
                        {{ slide.title }}
                      </div> -->
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div
            class="absolute top-[40%] z-100 f-c cursor-pointer -left-60"
            :class="{ 'op-0': isFirstSlide }" @click="goToPrevSlide"
          >
            <div>
              <img class="h-60 w-80" src="@/assets/icons/left.png" alt="">
            </div>
          </div>
          <div
            class="absolute top-[40%] z-100 f-c cursor-pointer -right-60"
            :class="{ 'op-0': isLastSlide }" @click="goToNextSlide"
          >
            <div>
              <img class="h-60 w-80" src="@/assets/icons/right.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterContainer />
  </div>
</template>

<style scoped lang="less">
.bannerImgTransfrom{
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.gameCardIntro {
  background: hsla(0, 0%, 100%, .9);
  -webkit-flex: 1 1;
  flex: 1 1;
}

.gameCardShadow {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
}
.gameCardPC {
    display: inline-block;
    margin-bottom: 60px;
  width: 650px;
    height: 420px;
    vertical-align: top;
}
.gameCardExplore {
    position: absolute;
    bottom: 30px;
    left: 30px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
  width: 80px;
    height: 26px;
    font-size: 12px;
    color: #666;
    border: 1px solid #999;
    border-radius: 13px;
    -ms-flex-pack: center;
    -ms-flex-align: center;
    font-weight: 700;
}
.boxShadow{
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
}
</style>
