import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementKoLocale from 'element-ui/lib/locale/lang/ko'// element-ui lang
import elementJpLocale from 'element-ui/lib/locale/lang/ja'// element-ui lang
import enLocale from './en'
import koLocale from './ko'
import jaLocale from './ja'
import { Common } from '@/common/constants'

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

let language = 'ko'
const languageCookie = Cookies.get('language')
if ([Common.JP_CODE, Common.KR_CODE, Common.EN_CODE, Common.JA_CODE, Common.KO_CODE].indexOf(languageCookie) > -1) {
  language = languageCookie
  if (language === Common.KR_CODE) {
    language = Common.KO_CODE
  }
  if (language === Common.JP_CODE) {
    language = Common.JA_CODE
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | ko | ja | kr | jp
  locale: language,
  // set locale messages
  messages
})

export default i18n
