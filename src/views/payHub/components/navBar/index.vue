<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { isPCDevice } from '@/utils/flexible'
import { t } from '@/language/i18n'

//  桌面快捷方式
// function createShortcut() {
//   const url = window.location.href // 获取当前页面的 URL
//   const title = document.title // 获取当前页面的标题

//   // 创建一个临时链接元素
//   const link = document.createElement('a')
//   link.href = url
//   link.download = title // 设置下载的文件名

//   // 触发点击事件
//   document.body.appendChild(link)
//   link.click()
//   document.body.removeChild(link)
// }

const menuVisible = ref(false)
function handleMenuVisible() {
  menuVisible.value = !menuVisible.value
}

const router = useRouter()
const route = useRoute()
function navigationToPayHub() {
  // 再次点击首页
  menuVisible.value = false
  router.push('/payHub')
}
const gameDetailVisible = ref(false)
watchEffect(() => {
  if (route.path !== '/payHub') {
    gameDetailVisible.value = true
  }
})
</script>

<template>
  <div class="fixed left-0 top-0 z-10 h-44 w-full flex items-center justify-between bg-white px-15 shadow-md" :class="{ navHeightPc: isPCDevice }">
    <div v-if="!isPCDevice" class="h-24 w-126 flex items-center" @click="handleMenuVisible">
      <img src="@/assets/images/mobileLogo.png" alt="Logo" class="w-full">
    </div>
    <div v-if="isPCDevice" class="h-45 w-198">
      <img src="@/assets/images/PClogo.png" class="w-full" alt="">
    </div>
    <div v-if="isPCDevice" class="ml-20 w-full f-s text-17 color-[#333]">
      <div class="cursor-pointer pb-10 pt-11" :class="{ 'border-[#d32f2f] border-b-3 pt-8  border-solid  ': !gameDetailVisible }" @click="navigationToPayHub">
        {{ t('message.home') }}
      </div>
      <div v-show="gameDetailVisible" class="ml-20 cursor-pointer border-b-3 border-[#d32f2f] border-solid pb-10 pt-8">
        {{ t('message.gameDetail') }}
      </div>
    </div>
    <div class="mr-8 max-w-150 min-w-110 flex items-center">
      <button class="mr-4 flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        保存至桌面
      </button>
    </div>
  </div>
  <div v-show="menuVisible" class="mobileTabsWrap fixed left-0 top-44 z-10 h-[calc(100vh-44px)] w-[100vw] bg-[rgba(255,255,255,.8)] color-[#333333]">
    <div class="active h-68 w-full f-c border-b border-b-[rgba(0,0,0,.2)] border-solid text-20 font-medium leading-28" :class="{ 'border-[#d32f2f] color-[#d32f2f] ': !gameDetailVisible }" @click="navigationToPayHub">
      {{ t('message.home') }}
    </div>
    <div v-show="gameDetailVisible" class="h-68 w-full f-c border-b border-[#d32f2f] border-solid text-20 color-[#d32f2f] font-medium leading-28" @click="handleMenuVisible">
      {{ t('message.gameDetail') }}
    </div>
  </div>
</template>

<style scoped>
div {
  -webkit-tap-highlight-color: transparent; /* 移除点击高亮效果 */
  user-select: none; /* 禁止文本选中 */
}

.navHeightPc {
  padding: 0 40px;
  height: 80px;
}
.mobileTabsWrap {
    transition: all 1s;
    -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
}
</style>
