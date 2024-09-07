<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { isPCDevice } from '@/utils/flexible'
// 定义 props
const props = defineProps<{
  title: string
  image: string
}>()

const router = useRouter()
function navigateToDetail() {
  router.push(`/gameDetail/${props.title}`) // 使用 props.title 作为参数
}
</script>

<template>
  <div
    class="relative mt-13 min-w-165 w-[calc((100%-10px)/2)] flex flex-col rounded-16 shadow-md lg:w-[calc((100%-48px)/4)] md:w-[calc((100%-24px)/3)]"
    :class="{ gameCardMobile: isPCDevice }"
  >
    <div class="h-100 overflow-hidden rounded-t-16">
      <img :src="image" alt="" class="h-120 w-[110%] translate-x-[-5%] translate-y-[-15px] transform object-cover filter-blur-8">
    </div>
    <div class="gameItemWrap" :class="{ gameItemWrapMobile: isPCDevice }">
      <div class="text-center -mt-35">
        <img :src="image" alt="Game Image" class="h-65 w-65 rounded-16" :class="{ gameIconMobile: isPCDevice }">
        <div class="gameItemName" :class="{ gameItemNameMobile: isPCDevice }">
          {{ title }}
        </div>
      </div>
      <div class="flex flex-wrap" :class="{ btnWrapMobile: isPCDevice }">
        <div
          class="relative h-36 w-full f-b flex-1 cursor-pointer rounded-31 bg-red-500 px-10 py-0 text-center text-14 color-[#fff] leading-14 opacity-100"
          :class="{ gameItemBtnMobile: isPCDevice }"
          @click="navigateToDetail"
        >
          <span class="w-full flex-1 text-center text-14 leading-14">立即进入</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gameCard {
  position: relative;
  display: flex;
  margin-top: 13px;
  min-width: 165px;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  -webkit-margin-end: var(--flex-gap);
  margin-inline-end: var(--flex-gap);
  flex-direction: column;
}
.gameCardMobile {
  @apply mt-20;
}

.game-card:hover {
  transform: scale(1.05);
}

.gameItemWrap {
  position: relative;
  display: flex;
  padding: 0 15px 15px;
  margin-top: -29px;
  width: 100%;
  background: #fff;
  border-radius: 12px 12px 16px 16px;
  flex-direction: column;
}

.gameItemWrapMobile {
  padding: 0 10px 10px;
  margin-top: -23px;
}

.gameIconMobile {
  width: 70px;
  height: 70px;
}

.gameItemName {
  overflow: hidden;
  margin-top: 9px;
  margin-bottom: 11px;
  width: 100%;
  height: 28px;
  font-size: 16px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333333;
  flex: 1 1;
  font-weight: bolder;
  line-height: 24px;
}

.gameItemNameMobile {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 22px;
  line-height: 24px;
}

.btnWrapMobile {
  margin-top: auto;
}

.gameItemBtnMobile {
  height: 40px;
  border-radius: 31px;
}
</style>
