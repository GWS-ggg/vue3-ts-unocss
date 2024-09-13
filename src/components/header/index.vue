<script setup lang="ts">
import { isPCDevice } from '@/utils/flexible'

interface NavbarItem {
  name: string
  path: string
}
// 导航栏
const navbarItems = ref<NavbarItem[]>([
  { name: '首页', path: '/gameHome' },
  { name: '游戏', path: '/gameList' },
  { name: '支付中心', path: '/payhub' },
])
const activeNavbarItem = ref('首页')
function setActiveNavbarItem(name: string) {
  activeNavbarItem.value = name
}
const isMenuVisible = ref(false)
function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value
}

const selectedLanguage = ref('zh-cn')

const LanguageOptions = [
  {
    value: 'zh-cn',
    label: '中文',
  },
  {
    value: 'en',
    label: '英文',
  },
]
</script>

<template>
  <el-header
    class="fixed left-0 top-0 z-1000 w-[100vw] bg-[#000000] text-center p-[0]!"
    :height="isPCDevice ? '60px' : '50px'"
  >
    <div class="h-full flex items-center px-20" :class="{ 'px-40': isPCDevice }">
      <div v-if="!isPCDevice" @click="toggleMenu">
        <div v-if="!isMenuVisible" class="i-ooui:menu h-24 w-24" style="color: white;" />
        <div v-else class="i-material-symbols:close h-24 w-24" style="color: white;" />
      </div>
      <div class="h-30 w-full cursor-pointer" :class="{ 'h-34  w-[120px]!': isPCDevice }">
        <img
          class="h-full" src="https://lilithimage.lilithcdn.com/official-web-lilith/lilith-logo_cn%403x.png"
          alt=""
        >
      </div>
      <div v-if="isPCDevice" class="w-full f-c color-[#fff]">
        <router-link
          v-for="navbaritem in navbarItems" :key="navbaritem.name" :to="navbaritem.path"
          class="mx-[1vw] text-19 text-color-[#fff] leading-20 no-underline"
          :class="{ 'text-red-500 font-bold': activeNavbarItem === navbaritem.name }"
          @click="setActiveNavbarItem(navbaritem.name)"
        >
          {{ navbaritem.name }}
        </router-link>
      </div>
      <div class="color-[#fff]">
        <el-select
          v-model="selectedLanguage" placeholder="Select" style="width: 80px" class="custom-select"
          :teleported="false"
        >
          <el-option
            v-for="item in LanguageOptions" :key="item.value" :label="item.label" :value="item.value"
            class="custonm-option"
          />
        </el-select>
      </div>
    </div>
  </el-header>
  <div v-show="isMenuVisible" class="absolute left-0 top-50 z-1000 h-[100%] w-[70vh] bg-black color-[#fff]">
    <div class="px-20">
      <router-link
        v-for="navbaritem in navbarItems" :key="navbaritem.name" :to="navbaritem.path"
        class="b-b-1 b-b-[hsla(0,0%,100%,.15)] b-b-solid text-color-[#fff] no-underline"
        :class="{ 'text-red-500 font-bold': activeNavbarItem === navbaritem.name }"
        @click="setActiveNavbarItem(navbaritem.name)"
      >
        <div class="py-20 text-16">
          {{ navbaritem.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="less">
.custom-select {

position: relative;

:deep(.el-select__placeholder) {
  color: #fff
}

:deep(.el-select__wrapper) {
  background-color: #000000;
  box-shadow: none;
}

:deep(.el-select__caret) {
  color: #ffffff;
  /* 修改下拉标签颜色 */
}

/* 去掉边框 */
:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: none;
}

:deep(.el-select-dropdown__item.is-selected) {
  color: #000;
  background-color: #e6f7ff
}

}

:deep(.el-select__popper.el-popper) {
border: none;
box-shadow: none
}

:deep(.el-select-dropdown) {
position: absolute;
/* 设置下拉框为绝对定位 */
top: -5px;
/* 删除空隙*/
z-index: 1000;
/* 确保下拉框在其他元素之上 */
background: #fff;
}

:deep(.el-popper__arrow) {
display: none;
/* 隐藏小三角图标 */
}

:deep(.el-carousel__arrow) {
width: 20px;
/* 宽度 */
height: 60px;
/* 高度 */
color: #d32f2f;
/* 箭头颜色 */
background-color: rgba(0, 0, 0, .3);
/* 箭头背景色 */
border-radius: 0px
}

// 切换箭头大小修改
:deep(.el-icon) {
width: 20px;
height: 20px;
}

:deep(.el-icon svg) {
width: 20px;
height: 20px;
}
</style>
