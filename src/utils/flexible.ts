import { MOBILE_DEVICE_WIDTH } from '@/constants/index'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

export const isMobile = computed(() => {
  return width.value < MOBILE_DEVICE_WIDTH
})

