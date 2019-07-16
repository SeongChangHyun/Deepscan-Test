<template>
  <div id="app" :style="{ fontFamily: fontName, fontSize: size }" :class="[width < Common.DEVICE_WIDTH.MOBILE ? 'mobile' : 'desktop', $store.getters.language]">
    <router-view/>
  </div>
</template>

<script>
import { Common } from '@/common/constants'
export default{
  name: 'App',
  data() {
    return {
      Common,
      height: 0,
      width: 0,
      isMobile: false
    }
  },
  computed: {
    fontName() {
      return this.$store.getters.fontName
    },
    size() {
      return this.$store.getters.size
    }
  },
  created() {
    global.router = this.$router
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    window.onhashchange = (e) => {
      this.$router.push({ path: window.location.hash.substr(1) })
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    }
  }
}
</script>
