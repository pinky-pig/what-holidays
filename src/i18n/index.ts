import { createI18n } from 'vue-i18n'
import en from './en'
import cn from './cn'

export enum Locale {
  CN = 'zh',
  EN = 'en',
}

/**
 * 有两种语言，中文和英文。
 * 判断当前语言模式，优先本地语言。
 * 当前 area 是中国的时候，展示中文，否则展示英文
 */
const messages = { en, cn }

const [locale, fallbackLocale] = /^cn\b/.test(window.navigator.language)
  ? [Locale.CN, Locale.EN]
  : [Locale.EN, Locale.CN]

export const i18n = createI18n({
  locale,
  fallbackLocale,
  messages,
})

export const t = i18n.global.t
