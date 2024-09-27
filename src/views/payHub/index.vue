<script lang="ts" setup>
import GameCard from './components/gameCard/index.vue'
import HeaderContainer from '@/components/header/index.vue'
import { isPCDevice } from '@/utils/flexible'
import FooterContainer from '@/components/footer/index.vue'

const games = ref([
  { title: '剑与远征：启程', image: '/src/assets/images/pic1.webp' },
  { title: '小冰冰传奇（怀旧服）', image: '/src/assets/images/pic2.webp' },
  { title: '万国觉醒', image: '/src/assets/images/pic3.webp' },
  { title: '战火勋章', image: '/src/assets/images/pic4.webp' },
  { title: '战火勋章', image: '/src/assets/images/pic4.webp' },
  { title: '战火勋章', image: '/src/assets/images/pic4.webp' },
  { title: '战火勋章', image: '/src/assets/images/pic4.webp' },
])

watchEffect(() => {
  console.log('old', isPCDevice.value)
})
</script>

<template>
  <div class="scrollbarWidth box-border h-[100vh] w-[100vw] overflow-x-hidden overflow-y-auto bg-[#f4f4f4]">
    <HeaderContainer />
    <div class="mt-80">
      <div class="relative h-auto w-full overflow-hidden object-cover">
        <img v-if="!isPCDevice" src="@/assets/images/payHub/store_banner.png" alt="Header" class="w-full">
        <img v-if="isPCDevice" src="@/assets/images/payHub/pc_banner.png" alt="Header" class="w-full">
        <img v-if="isPCDevice" class="absolute left-183 top-65 h-106 w-402" src="@/assets/icons/99-logo.png" alt="">
        <div v-if="isPCDevice" class="absolute left-183 top-216 text-50 color-[#ED6504]">
          Secure and convenient
        </div>
      </div>
      <div class="relative mx-auto my-0 max-w-1460 flex bg-[#f5f5f5] p-0">
        <div
          class="mb-40 min-h-270 min-w-375 w-full flex flex-col justify-start rounded-20 bg-[#fff] px-15 -mt-20"
          xl=" px-30  ms-auto me-auto   "
          :class="{ gameListContainerMobile: isPCDevice }"
        >
          <div class="w-full flex flex-wrap justify-start gap-10" lg="gap-16">
            <GameCard v-for="game in games" :key="game.title" :title="game.title" :image="game.image" />
          </div>
        </div>
      </div>
    </div>
    <FooterContainer />
  </div>
</template>

<style scoped>
.scrollbarWidth {
  scrollbar-width: none;
}

.gameListContainerMobile {
  @apply bg-#fff px-30 -mt-36 pb-20 pt-0;
}

.gameTitle {
  @apply text-20 leading-16 mt-22 mb-11;
}

.imageMarginTop {
  margin-top: 80px;
}
</style>
