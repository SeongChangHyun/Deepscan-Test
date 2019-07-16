import Cookies from 'js-cookie'
import { Common } from '@/common/constants'

export default {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: Common.PC,
  language: Cookies.get('language') || 'ko',
  size: Cookies.get('size') || 'medium',
  fontName: Common[`${Cookies.get('language') ? Cookies.get('language').toUpperCase() : 'KO'}_FONT`]
}
