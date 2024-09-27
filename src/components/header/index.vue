<script setup lang="ts">
import { useRoute } from 'vue-router'
import { isPCDevice } from '@/utils/flexible'
import { type LocaleKey, setLocale, t } from '@/language/i18n'

interface NavbarItem {
  name: string
  path: string
}
// 导航栏

const navbarItems = ref<NavbarItem[]>([
  { name: 'message.home', path: '/gameHome' },
  { name: 'message.game', path: '/gameList' },
  { name: 'message.purchurse', path: '/payHub' },
])
const activeNavbarItem = ref('')
function setActiveNavbarItem(name: string) {
  activeNavbarItem.value = name
}
const isMenuVisible = ref(false)
function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value
}
function closeMenu() {
  isMenuVisible.value = false
}
function initializeNavbarItem() {
  const currentRoute = useRoute().name // 获取当前路由名称
  if (currentRoute === 'gameHome') {
    activeNavbarItem.value = 'message.home'
  }
  else if (currentRoute === 'gameList') {
    activeNavbarItem.value = 'message.game'
  }
  else if (currentRoute === 'payHub') {
    activeNavbarItem.value = 'message.purchurse'
  }
}

initializeNavbarItem()

const selectedLanguage = ref('zh-cn')
onMounted(() => {
  const storedLanguage = localStorage.getItem('lang')
  if (storedLanguage) {
    selectedLanguage.value = storedLanguage // 从 LocalStorage 获取值
  }
})

// 路由跳转后 定位到顶部
onMounted(() => {
  window.scrollTo(0, 0)
})

// 切换语言栏
const isLanguageVisible = ref(false)
function changeLanguageVisible() {
  isLanguageVisible.value = !isLanguageVisible.value
}
interface languageOption {
  value: string
  label: string
}
const languageOptions: languageOption[] = [
  {
    value: 'zh-cn',
    label: '中文',
  },
  {
    value: 'en',
    label: '英文',
  },
]
const selectedLanguageLabel = computed(() => {
  return languageOptions.find(item => item.value === selectedLanguage.value)?.label
})
const localeKeys: LocaleKey[] = ['zh-cn', 'en', 'ja'] // 假设的有效语言数组

function changeLanguage(language: string) {
  selectedLanguage.value = language
  if (isLocaleKey(language)) {
    setLocale(language) // 直接传入，因为已经验证过
  }
  else {
    console.error('不支持的语言')
  }
}

function isLocaleKey(language: string): language is LocaleKey {
  return localeKeys.includes(language as LocaleKey)
}
</script>

<template>
  <div
    class="fixed left-0 top-0 z-1000 h-80 w-[100vw] bg-[#222c37] text-center p-[0]!"
  >
    <div class="flex items-center pl-26 pr-17" :class="{ 'px-0': isPCDevice }">
      <div v-if="!isPCDevice" class="h-80 f-c" @click="toggleMenu">
        <!-- <div v-if="!isMenuVisible" class="i-ooui:menu h-24 w-24" style="color: white;" />
        <div v-else class="i-material-symbols:close h-24 w-24" style="color: white;" /> -->
        <div class="relative h-45 w-72">
          <img class="absolute left-0 h-full w-full" src="@/assets/icons/List.png" alt="">
          <img class="absolute left-0 h-full w-full" src="@/assets/icons/Back.png" alt="">
        </div>
      </div>
      <div class="h-52 w-full f-c cursor-pointer" :class="{ 'w-[200px]! ml-34 mt-9 mb-19 ': isPCDevice }">
        <img
          class="block h-full w-200" src="@/assets/icons/99-logo.png"
          alt=""
        >
      </div>
      <div v-if="isPCDevice" class="w-full f-c color-[#fff]">
        <router-link
          v-for="navbaritem in navbarItems" :key="navbaritem.name" :to="navbaritem.path"
          class="mx-[1vw] text-25 text-color-[#fff] leading-25 no-underline"
          :class="{ 'text-[#FF6A00]! font-bold': activeNavbarItem === navbaritem.name }"
          @click="setActiveNavbarItem(navbaritem.name)"
        >
          {{ t(navbaritem.name) }}
        </router-link>
      </div>
      <div v-if="isPCDevice" class="PClanguage mr-27 f-b text-18 color-[#fff]">
        <div class="f-c">
          <!-- <div class="w-100 overflow-auto overflow-unset">
            Save to Desktop
          </div>
          <div class="i-mingcute:download-line h-[46px] w-[46px]" style="color: white;" /> -->
          <img src="@/assets/icons/download.png" alt="">
        </div>
      </div>
      <div class="mobileLanguage flex cursor-pointer items-center" @click="changeLanguageVisible">
        <div class="relative mr-15 whitespace-nowrap text-30 color-[#FFFFFF]">
          {{ selectedLanguageLabel }}
          <div v-show="isLanguageVisible" class="absolute top-30 w-100 f-c flex-col bg-[#222C37] pb-20 text-30 color-[#fff] -left-20">
            <div v-for="language in languageOptions" :key="language.value" class="mt-16 px-20" :class="{ 'color-[#FF6A00]': selectedLanguage === language.value }" @click="changeLanguage(language.value)">
              {{ language.label }}
            </div>
          </div>
        </div>
        <img v-if="!isPCDevice" src="@/assets/icons/dropDownArrow.png" class="h-30 w-30" alt="">
        <img v-else src="@/assets/icons/global-icon.png" class="h-38 w-38" alt="">
      </div>
    </div>

    <div v-show="isMenuVisible" class="linkMask fixed bottom-0 left-0 right-0 top-0 z-10" @click="closeMenu" />
    <div v-show="isMenuVisible" class="fixed left-0 top-80 z-1000 h-[100%] w-[62.5vw] bg-[#222C37] text-30 color-[#fff]">
      <div class="w-full flex flex-col items-start px-26">
        <router-link
          v-for="navbaritem in navbarItems" :key="navbaritem.name" :to="navbaritem.path"
          class="w-full f-s text-color-[#fff] no-underline"
          :class="{ 'text-[#FF6A00]! font-bold': activeNavbarItem === navbaritem.name }"
          @click="setActiveNavbarItem(navbaritem.name)"
        >
          <div class="pb-19 pt-43 text-30">
            {{ t(navbaritem.name) }}
          </div>
        </router-link>
      </div>
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
  padding-right: 0;
  background-color: #222c37;
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
// 隐藏语言下拉图标
:deep(.el-select__suffix) {
display: none;
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
