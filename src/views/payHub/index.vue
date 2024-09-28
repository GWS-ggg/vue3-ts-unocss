<script lang="ts" setup>
import GameCard from './components/gameCard/index.vue'
import BannerImage from './components/bannerImage/index.vue'
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
    <BannerImage />
    <div
      class="relative mx-auto my-0 w-750 flex bg-[#f5f5f5] p-0"
      lg="w-1200"
    >
      <div
        class="mb-40 w-full flex flex-col justify-start rounded-20 bg-[#fff] -mt-20"
        lg="-mt-36"
      >
        <div
          class="mx-auto w-full flex flex-wrap justify-start gap-15 px-27.5"
          lg="gap-12 px-32 "
        >
          <GameCard
            v-for="game in games"
            :key="game.title"
            :title="game.title"
            :image="game.image"
          />
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
