<template>
  <div class="gameCard" :class="{ gameCardMobile: isMobile }" style="--flex-count: 4; --flex-gap: 20px; margin-inline-end: 0px">
    <div class="h-100 rounded-t-16 overflow-hidden">
      <img :src="image" alt="" class="h-120 filter-blur-8 w-[110%] translate-x-[-5%] translate-y-[-15px] transform object-cover" />
    </div>
    <div class="gameItemWrap" :class="{ gameItemWrapMobile: isMobile }">
      <div class="-mt-35 text-center">
        <img :src="image" alt="Game Image" class="rounded-16 w-70 h-70" :class="{ gameIconMobile: isMobile }" />
        <div class="gameItemName" :class="{ gameItemNameMobile: isMobile }">{{ title }}</div>
      </div>
      <div class="flex flex-wrap" :class="{ btnWrapMobile: isMobile }">
        <div
          class="color-[#fff] text-14 leading-14 f-b rounded-20 relative h-40 w-full flex-1 cursor-pointer bg-red-500 px-10 py-0 text-center opacity-100"
          :class="{ gameItemBtnMobile: isMobile }"
          @click="navigateToDetail"
        >
          <span class="leading-14 text-14 w-full flex-1 text-center">立即进入</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { isMobile } from '@/utils/flexible'
// 定义 props
const props = defineProps<{
  title: string
  image: string
}>()

const router = useRouter()
const navigateToDetail = () => {
  router.push(`/gameDetail/${props.title}`) // 使用 props.title 作为参数
}
</script>

<style scoped>
.gameCard {
  position: relative;
  display: flex;
  margin-top: 30px;
  width: calc((100% - var(--flex-gap) * (var(--flex-count) - 1)) / var(--flex-count));
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  -webkit-margin-end: var(--flex-gap);
  margin-inline-end: var(--flex-gap);
  flex-direction: column;
}
.gameCardMobile {
  @apply mt-13;
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
  width: 65px;
  height: 65px;
}

.gameItemName {
  overflow: hidden;
  margin-top: 9px;
  margin-bottom: 11px;
  width: 100%;
  height: 28px;
  font-size: 20px;
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
  font-size: 16px;
  line-height: 20px;
}

.btnWrapMobile {
  margin-top: auto;
}

.gameItemBtnMobile {
  height: 36px;
  font-size: 14px;
  line-height: 14px;
  border-radius: 31px;
}
</style>
