<script setup lang="ts">
import { ref } from 'vue'

interface Slide {
  image: string
  title: string
}

interface Game {
  image: string
  title: string
}

const slides = ref<Slide[]>([
  { image: '/src/assets/images/gamelist1.jpg', title: '战火勋章' },
  { image: '/src/assets/images/gamelist2.jpg', title: '另一游戏' },
])

const games = ref<Game[]>([
  { image: '/src/assets/images/game3_files/1_cn.png', title: '游戏1' },
  { image: '/src/assets/images/game3_files/2_cn.png', title: '游戏2' },
  { image: '/src/assets/images/game3_files/3_cn.png', title: '游戏3' },
])

const activeIndex = ref(0)

function next() {
  activeIndex.value = (activeIndex.value + 1) % slides.value.length
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length
}
</script>

<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="flex items-center justify-between bg-black p-4 text-white">
      <div class="flex items-center">
        <img src="/src/assets/images/logo.png" alt="Logo" class="mr-4 h-8">
        <ul class="flex space-x-8">
          <li>首页</li>
          <li>游戏</li>
          <li>动态</li>
          <li>企业责任</li>
          <li>关于</li>
          <li>加入我们</li>
        </ul>
      </div>
      <div class="flex space-x-4">
        <span>会员</span>
        <span>中文</span>
      </div>
    </nav>

    <!-- Carousel -->
    <div class="relative">
      <div class="carousel">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-item"
          :class="{ active: index === activeIndex }"
        >
          <img :src="slide.image" alt="" class="h-80 w-full object-cover">
          <div class="absolute inset-0 flex items-center justify-center text-2xl text-white font-bold">
            {{ slide.title }}
          </div>
        </div>
      </div>
      <button class="absolute left-0 top-1/2" @click="prev">
        ‹
      </button>
      <button class="absolute right-0 top-1/2" @click="next">
        ›
      </button>
    </div>

    <!-- Game Recommendation List -->
    <div class="p-4">
      <h2 class="mb-4 text-xl font-bold">
        游戏推荐
      </h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(game, index) in games" :key="index" class="shadow-lg">
          <img :src="game.image" alt="" class="h-48 w-full object-cover">
          <div class="p-2 text-center">
            <h3 class="font-semibold">
              {{ game.title }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.carousel-item {
  display: none;
}
.carousel-item.active {
  display: block;
}
/* For demo */
:deep(.slick-slide) {
  overflow: hidden;
  height: 160px;
  text-align: center;
  background: #364d79;
  line-height: 160px;
}

:deep(.slick-arrow.custom-slick-arrow) {
  z-index: 1;
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  transition: ease all 0.3s;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
