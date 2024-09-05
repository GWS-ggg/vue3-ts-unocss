<script lang="ts" setup>
import GameCard from './components/gameCard/index.vue'
import NavBar from './components/navBar/index.vue'
import { isMobile } from '@/utils/flexible'
const games = ref([
  { title: '剑与远征：启程', image: '/src/assets/images/pic1.webp' },
  { title: '小冰冰传奇（怀旧服）', image: '/src/assets/images/pic2.webp' },
  { title: '万国觉醒', image: '/src/assets/images/pic3.webp' },
  { title: '战火勋章', image: '/src/assets/images/pic4.webp' },
  { title: '战火勋章', image: '/src/assets/images/pic4.webp' },
  { title: '战火勋章', image: '/src/assets/images/pic4.webp' },
])

watchEffect(() => {
  console.log(isMobile.value)
})
</script>

<template>
  <div class="scrollbarWidth box-border h-[100vh] w-[100vw] overflow-y-auto overflow-x-hidden bg-[#f4f4f4]">
    <NavBar />
    <div class="mt-80 min-h-[calc(100vh-288px)]" :class="{ imageMarginTop: isMobile }">
      <div class="relative h-0 w-full overflow-hidden pb-[15.625%]">
        <img src="@/assets/images/home.jpg" alt="Header" class="w-full" />
      </div>
      <div class="max-h-1460 relative mx-auto my-0 flex p-0">
        <div
          class="rounded-20 min-h-270 min-w-450 -mt-36 mb-40 flex w-full flex-col justify-start bg-[#fff]"
          xl="w-1040 pl-20   ms-auto me-auto   "
          :class="{ gameListContainerMobile: isMobile }"
        >
          <div class="mb-[-6px] mt-6 pl-1.5 text-[20px] font-medium leading-[20px] text-[#000]" :class="{ gameTitle: isMobile }">全部游戏</div>
          <div class="flex w-full flex-wrap justify-start gap-12">
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
  @apply px-15 bg-#f5f5f5 min-w-unset -mt-20 pb-20 pt-0;
}

.gameTitle {
  @apply text-16 leading-16 mt-22 mb-11;
}

.imageMarginTop {
  margin-top: 40px;
}
</style>
