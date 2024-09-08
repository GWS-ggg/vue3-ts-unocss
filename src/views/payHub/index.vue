<script lang="ts" setup>
import GameCard from './components/gameCard/index.vue'
import NavBar from './components/navBar/index.vue'
import { isPCDevice } from '@/utils/flexible'

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
    <NavBar />
    <div class="mt-44" :class="{ imageMarginTop: isPCDevice }">
      <div class="relative h-auto w-full overflow-hidden object-cover">
        <img src="@/assets/images/home.jpg" alt="Header" class="w-full">
      </div>
      <div class="max-m-1460 relative mx-auto my-0 flex bg-[#f5f5f5] p-0">
        <div
          class="mb-40 min-h-270 min-w-375 w-full flex flex-col justify-start rounded-20 bg-[#fff] px-15 -mt-20"
          xl="max-w-1200 px-30  ms-auto me-auto   "
          :class="{ gameListContainerMobile: isPCDevice }"
        >
          <div class="pl-1.5 pt-20 text-16 text-[#000] font-medium leading-16" :class="{ gameTitle: isPCDevice }">
            全部游戏
          </div>
          <div class="w-full flex flex-wrap justify-start gap-10" lg="gap-16">
            <GameCard v-for="game in games" :key="game.title" :title="game.title" :image="game.image" />
          </div>
        </div>
      </div>
    </div>
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
