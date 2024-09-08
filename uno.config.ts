// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import UnocssIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetUno(),
    // unocss 默认rem，转成px
    presetRemToPx({
      baseFontSize: 4, // 基准字体大小  官方的默认预设16（1单位 = 0.25rem）所以这里为4 为1：1
    }),
    // 属性化预设
    presetAttributify(),
    presetIcons({
      // 图标默认样式
      extraProperties: {
        display: 'inline-block',
        height: '1em',
        width: '1em',
      },
      /* options */
    }),
    UnocssIcons(),

  ],
  shortcuts: {
    'f-b': 'flex justify-between items-center',
    'f-c': 'flex justify-center items-center',
    'f-s': 'flex justify-start items-center',
    'f-e': 'flex justify-end items-center',
    'text-overflow': 'truncate',
    'wh-full': 'w-full h-full',
    'b-s': 'border border-solid border-[#f6f6f6]',
  },
  rules: [],
  transformers: [transformerDirectives()],
})
