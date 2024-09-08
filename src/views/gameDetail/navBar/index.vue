<script lang="ts" setup>
import { isPCDevice } from '@/utils/flexible'

//  桌面快捷方式
function createShortcut() {
  const url = window.location.href // 获取当前页面的 URL
  const title = document.title // 获取当前页面的标题

  // 创建一个临时链接元素
  const link = document.createElement('a')
  link.href = url
  link.download = title // 设置下载的文件名

  // 触发点击事件
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <nav class="fixed left-0 top-0 z-10 h-44 w-full flex items-center justify-between bg-white p-4 shadow-md" :class="{ navHeightPc: isPCDevice }">
    <div class="flex items-center">
      <img src="@/assets/images/logo.png" alt="Logo" class="mr-8 h-30 w-30">
      <h1 class="text-16 font-bold">
        99支付中心
      </h1>
    </div>
    <div class="mr-8 flex items-center">
      <button class="mr-4 flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-700" @click="createShortcut">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        保存至桌面
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navHeightPc {
  height: 80px;
}
</style>
