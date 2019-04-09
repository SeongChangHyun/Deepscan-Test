import store from '@/store'
import { Common } from '@/common/constants'

const { body } = document
const WIDTH = 768
const RATIO = 3

export default {
  watch: {
    $route(route) {
      if (this.device === Common.MOBILE && this.sidebar.opened) {
        store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch(Common.TOGGLE_ACTION, Common.MOBILE)
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch(Common.TOGGLE_ACTION, isMobile ? Common.MOBILE : Common.PC)

        if (isMobile) {
          store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
