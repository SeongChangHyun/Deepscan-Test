<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device===Common.MOBILE&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <navbar/>
    <div class="main-container">
      <sidebar class="sidebar-container"/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { Common } from '@/common/constants'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      Common
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.layout.sidebar
    },
    device() {
      return this.$store.state.layout.device
    },
    classObj() {
      return {
        hideSidebar: !this.$store.state.layout.sidebar.opened,
        openSidebar: this.$store.state.layout.sidebar.opened,
        withoutAnimation: this.$store.state.layout.sidebar.withoutAnimation,
        mobile: this.$store.state.layout.device === this.Common.MOBILE
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: $headerHight;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
