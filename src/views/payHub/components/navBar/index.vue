<script lang="ts" setup>
import { isMobile } from '@/utils/flexible'
</script>

<template>
  <nav class="fixed left-0 top-0 z-10 flex h-80 w-full items-center justify-between bg-white p-4 shadow-md" :class="{ navBarMobile: isMobile }">
    <div class="flex items-center">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-30 w-30 mr-8" />
      <h1 class="text-16 font-bold">99支付中心</h1>
    </div>
    <div class="mr-8 flex items-center">
      <button class="mr-4 flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        保存至桌面
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navBarMobile {
  height: 44px;
}
</style>
