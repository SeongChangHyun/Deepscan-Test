import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementKoLocale from 'element-ui/lib/locale/lang/ko'// element-ui lang
import elementJpLocale from 'element-ui/lib/locale/lang/ja'// element-ui lang
import enLocale from './en'
import koLocale from './ko'
import jaLocale from './ja'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  ko: {
    ...koLocale,
    ...elementKoLocale
  },
  ja: {
    ...jaLocale,
    ...elementJpLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | ko | ja
  locale: Cookies.get('language') || 'en',
  // set locale messages
  messages
})

export default i18n
