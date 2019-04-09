import Cookies from 'js-cookie'
import { Common } from '@/common/constants'

export default {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: Common.PC,
  language: Cookies.get('language') || 'en',
  size: Cookies.get('size') || 'medium',
  fontName: Common.EN_FONT
}
