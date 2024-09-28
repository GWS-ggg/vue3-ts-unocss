<script setup lang="ts">
import { isPCDevice } from '@/utils/flexible'
</script>

<template>
  <div class="mt-80">
    <div class="relative h-auto w-full overflow-hidden object-cover">
      <img
        v-if="!isPCDevice"
        src="@/assets/images/payHub/store_banner.png"
        alt="Header"
        class="h-200 w-full"
      >
      <img
        v-if="isPCDevice"
        src="@/assets/images/payHub/pc_banner.png"
        alt="Header"
        class="h-300 w-full"
      >
      <img
        v-if="isPCDevice"
        class="absolute left-183 top-65 h-106 w-402"
        src="@/assets/icons/99-logo.png"
        alt=""
      >
      <div
        v-if="isPCDevice"
        class="absolute left-183 top-216 text-50 color-[#ED6504]"
      >
        Secure and convenient
      </div>
    </div>
  </div>
</template>
