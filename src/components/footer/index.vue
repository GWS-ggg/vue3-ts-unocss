<script setup lang="ts">
import { useRoute } from 'vue-router'
import { isPCDevice } from '@/utils/flexible'

// 支付页面页脚有变化
const route = useRoute()
const isPayPage = ref(false)
watchEffect(() => {
  if (route.path === '/payHub' || route.path === '/payDetail') {
    isPayPage.value = true
  }
  else {
    isPayPage.value = false
  }
})
</script>

<template>
  <div v-if="isPayPage" class="h-220 w-750 f-c flex flex-col bg-[#222C37] text-[#fff] p-[0]!" :class="{ 'w-[1920px]!': isPCDevice }">
    <div class="flex">
      <div class="flex flex-col" :class="{ 'flex-row!': isPCDevice }">
        <div class="mr-30 mt-20 h-61 f-s" :class="{ 'mr-[95px]!': isPCDevice }">
          <div class="mr-16 flex">
            <img class="h-61 w-61" src="@/assets/icons/security.png" alt="">
          </div>
          <div>
            <div class="text-20 leading-30" :class="{ 'text-30': isPCDevice }">
              Secure
            </div>
            <div class="text-15 leading-30" :class="{ 'text-20': isPCDevice }">
              Offical Payment Center
            </div>
          </div>
        </div>
        <div class="mr-30 mt-20 h-61 f-s" :class="{ 'mr-[95px]!': isPCDevice }">
          <div class="mr-16 flex">
            <img class="h-61 w-61" src="@/assets/icons/affordablity.png" alt="">
          </div>
          <div>
            <div class="text-20 leading-30" :class="{ 'text-30': isPCDevice }">
              Premium value
            </div>
            <div class="text-15 leading-30" :class="{ 'text-20': isPCDevice }">
              Lucrative bonuses and rebate events
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col" :class="{ 'flex-row!': isPCDevice }">
        <div class="mr-30 mt-20 h-61 f-s" :class="{ 'mr-[95px]!': isPCDevice }">
          <div class="mr-16 flex">
            <img class="h-61 w-61" src="@/assets/icons/convenience.png" alt="">
          </div>
          <div>
            <div class="text-20 leading-30" :class="{ 'text-30': isPCDevice }">
              Convenient
            </div>
            <div class="text-15 leading-30" :class="{ 'text-20': isPCDevice }">
              Multiple purchases with one tap
            </div>
          </div>
        </div>
        <div class="mr-30 mt-20 h-61 f-s" :class="{ 'mr-[95px]!': isPCDevice }">
          <div class="mr-16 flex">
            <img class="h-61 w-61" src="@/assets/icons/efficiency.png" alt="">
          </div>
          <div>
            <div class="text-20 leading-30" :class="{ 'text-30': isPCDevice }">
              Fast
            </div>
            <div class="text-15 leading-30" :class="{ 'text-20': isPCDevice }">
              Delay-free arrival after purchasing
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-30 h-13 w-692 f-c" :class="{ 'w-[1771px]! h-[34px]!': isPCDevice }">
      <img class="h-full w-full" src="@/assets/images/detail/star.png" alt="">
    </div>
  </div>

  <div class="h-262 w-750 p-[0]!" :class="{ 'w-[1920px]!': isPCDevice }">
    <div class="relative h-full w-full bg-[#222C37] px-20 text-center">
      <div class="flex flex-col items-center op-[.99999]">
        <img class="mb-57 mt-26 h-71 w-267" src="@/assets/icons/99-logo.png" alt="">
        <div class="flex text-24 color-[#fff] no-underline" :class="{ 'text-30': isPCDevice }">
          <div class="flex flex-col items-end" :class="{ 'flex-row!': isPCDevice }">
            <a href="#" class="no-click-effect mb-30 mr-25">ABOUT US</a>
            <a href="#" class="no-click-effect mb-30 mr-25">PRIVACY POLICY</a>
          </div>
          <div class="flex flex-col items-start" :class="{ 'flex-row!': isPCDevice }">
            <a href="#" class="no-click-effect mb-30 mr-25">SERVICE</a>
            <a href="#" class="no-click-effect mb-30 mr-25">CONTACT US</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-click-effect {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 继承父元素的颜色 */
}

.no-click-effect:visited {
  color: inherit; /* 去掉点击后的颜色变化 */
}
</style>
