<script setup lang="ts">
import HeaderContainer from '@/components/header/index.vue'
import FooterContainer from '@/components/footer/index.vue'
import { isPCDevice } from '@/utils/flexible'

interface GameCard {
  bgImage: string
  title: string
  description: string
  logoImage: string
  avaterImage: string
}
const gameCardList = ref<GameCard[]>([
  { bgImage: '/src/assets/images/Lilith Games_files/AFK-bg.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/AFK-logo-cn.png', avaterImage: '/src/assets/images/Lilith Games_files/AFK-avater-cn.png' },
  { bgImage: '/src/assets/images/Lilith Games_files/xgame_01.jpg', title: '众神派对', description: '电音幻想风都市神话RPG', logoImage: '/src/assets/images/Lilith Games_files/logo_01.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_02.jpg' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/logo_02.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_03.png' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/logo_02.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_03.png' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/logo_02.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_03.png' },
  { bgImage: '/src/assets/images/Lilith Games_files/column_home_01.jpg', title: '剑与远征：启程', description: '由你，唤醒魔法旷野', logoImage: '/src/assets/images/Lilith Games_files/logo_02.png', avaterImage: '/src/assets/images/Lilith Games_files/icon_03.png' },
])
</script>

<template>
  <div class="max h-full w-[100vw] bg-[#fff] pt-50" :class="{ 'pt-60': isPCDevice }">
    <HeaderContainer />
    <div class="w-[100vw] text-center">
      <div class="relative h-37.333vw w-[100vw] bg-[#10090d] px-22 pt-10.667vw text-align-left color-[#fff]" :class="{ gameBannerContainer: isPCDevice }">
        <div class="bannerImgTransfrom absolute left-[50%] top-0 z-0 h-full w-full op-[.48]" :class="{ 'w-[1920]!': isPCDevice }">
          <img v-if="!isPCDevice" src="@/assets/images/Lilith Games_files/m_3_banner.png" alt="" h-full w-full>
          <img v-if="isPCDevice" src="@/assets/images/Lilith Games_files/ad_games_inner.jpg" alt="" h-full w-full>
        </div>
        <div class="mt-12 text-24 font-bold leading-29 op-[0.9999]" :class="{ 'text-64 leading-65': isPCDevice }">
          OUR GAMES
        </div>
        <div class="text-12 op-[.7]" :class="{ 'text-20': isPCDevice }">
          为全世界玩家创造前所未有的游戏体验
        </div>
      </div>
      <div class="m-auto w-full px-20 pb-20 pt-30" :class="{ 'min-w-1440 max-w-1560 px-40 pt-50 pb-39': isPCDevice }">
        <div v-for="(gameCard, index) in gameCardList" :key="gameCard.title" class="gameCardShadow mb-30 h-57.6vw w-full flex cursor-pointer bg-[#eee]" :class="{ 'gameCardPC': isPCDevice, 'mr-60': index % 2 === 0 && isPCDevice }" :style="{ backgroundImage: `url('${gameCard.bgImage}')`, backgroundSize: '100%' }">
          <div
            class="gameCardIntro relative inline-block h-full text-left align-top"
            :class="{ 'w-230 py-30 pl-30  ': isPCDevice,
                      'w-[32vw] py-[4vw] pl-[4vw] ': !isPCDevice }"
          >
            <div class="overflow-hidden" :class="{ 'w-110 h-110': isPCDevice, 'h-[16vw] w-[16vw]': !isPCDevice }">
              <img :src="gameCard.avaterImage" class="h-full w-full" alt="" :class="{ 'rounded-22': isPCDevice, 'rounded-3.2vw': !isPCDevice }">
            </div>
            <div class="w-full break-all color-[#333]" :class="{ 'text-28 leading-34 mt-20 mb-6': isPCDevice, 'mb-4 mt-12 leading-23 text-18': !isPCDevice }">
              {{ gameCard.title }}
            </div>
            <div class="pr-10 color-[#666]" :class="{ 'text-14 leading-17': isPCDevice, 'leading-15 text-11': !isPCDevice }">
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
.gameBannerContainer {
  padding-top: 85px;
  padding-right: 0;
  padding-left: 0;
  height: 270px;
  text-align: center;
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
</style>
