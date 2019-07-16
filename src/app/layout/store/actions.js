import { layoutMutationTypes } from './mutationTypes'
export default {
  toggleSideBar({ commit }) {
    commit(layoutMutationTypes.TOGGLE_SIDEBAR)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit(layoutMutationTypes.CLOSE_SIDEBAR, withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit(layoutMutationTypes.TOGGLE_DEVICE, device)
  },
  setLanguage({ commit }, lang) {
    commit(layoutMutationTypes.SET_LANGUAGE, lang)
  },
  setFontName({ commit }, lang) {
    commit(layoutMutationTypes.SET_FONT_NAME, lang)
  },
  setSize({ commit }, size) {
    commit(layoutMutationTypes.SET_SIZE, size)
  }
}
