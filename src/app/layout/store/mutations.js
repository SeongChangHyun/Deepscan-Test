import Cookies from 'js-cookie'
import { Common } from '@/common/constants'
import { layoutMutationTypes } from './mutationTypes'
export default {
  [layoutMutationTypes.TOGGLE_SIDEBAR]: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  [layoutMutationTypes.CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [layoutMutationTypes.TOGGLE_DEVICE]: (state, device) => {
    state.device = device
  },
  [layoutMutationTypes.SET_LANGUAGE]: (state, lang) => {
    state.language = lang
    Cookies.set('language', lang)
  },
  [layoutMutationTypes.SET_FONT_NAME]: (state, lang) => {
    state.fontName = getFontName(lang)
  },
  [layoutMutationTypes.SET_SIZE]: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

export function getFontName(lang) {
  switch (lang) {
    case Common.JA_CODE:
      return Common.JA_FONT
    case Common.KO_CODE:
      return Common.KO_FONT
    default:
      return Common.EN_FONT
  }
}
