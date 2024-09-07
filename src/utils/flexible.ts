// import { useWindowSize } from '@vueuse/core'

// const { width } = useWindowSize()

// export const isMobile = computed(() => {
//   return width.value < MOBILE_DEVICE_WIDTH
// })

export const isPCDevice = computed(() => {
  // 检查是否包含移动设备的标识
  return !/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent)
})
