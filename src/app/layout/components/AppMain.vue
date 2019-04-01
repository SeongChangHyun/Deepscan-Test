<template>
  <el-scrollbar class="app-main" wrap-class="scrollbar-wrapper">
    <div class="line-blue" />
    <div class="main-content">
      <page-information />
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key"/>
        </keep-alive>
      </transition>
    </div>
  </el-scrollbar>
</template>

<script>
import PageInformation from './PageInformation'

export default {
  name: 'AppMain',
  components: {
    PageInformation
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
