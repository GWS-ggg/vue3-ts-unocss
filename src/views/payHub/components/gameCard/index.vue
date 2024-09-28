<script lang="ts" setup>
import { useRouter } from 'vue-router'

// 定义 props
const props = defineProps<{
  title: string
  image: string
}>()
const router = useRouter()
function navigateToDetail() {
  router.push({
    path: `/payDetail/${props.title}`,
    query: {
      appid: '512225141159476',
    },
  })
}
</script>

<template>
  <div
    class="relative mt-23 h-340 w-340 flex flex-col rounded-16 text-24 shadow-md"
    lg="mt-50 h-275 w-275 text-18"
  >
    <div class="h-[50%] overflow-hidden rounded-t-16">
      <img
        :src="image"
        alt=""
        class="h-full w-full object-cover filter-blur-9"
      >
    </div>
    <div class="relative h-[60%] w-full flex flex-col rounded-16 px-15 pb-15">
      <div
        class="text-center -mt-34"
        lg="-mt-31"
      >
        <img
          :src="image"
          alt="Game Image"
          class="h-68 w-68 rounded-16"
          lg="h-62 w-62"
        >
      </div>
      <div
        class="mt-30 whitespace-nowrap text-center font-bold"
        lg="mt-20"
      >
        {{ title }}
      </div>
      <div
        class="relative mt-30 w-full f-c cursor-pointer rounded-54 bg-[#ED6504] px-10 text-center color-[#fff]"
        lg="mt-20"
        @click="navigateToDetail"
      >
        <div
          class="h-54 f-c"
          lg="h-54"
        >
          立即进入
        </div>
        <div
          class="i-solar:alt-arrow-right-line-duotone absolute right-10 h-25 w-25"
          style="color: white;"
        />
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
  font-size: clamp(16px,20px,20px);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333333;
  flex: 1 1;
  font-weight: bolder;
  line-height: 24px;
}

.gameItemNamePC {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 25px;

}

.btnWrapMobile {
  margin-top: auto;
}

.gameItemBtnMobile {
  height: 40px;
  border-radius: 31px;
}
.norem-minFontSize{
  font-size: clamp(14px,0.2rem,0.2rem);
}
</style>
