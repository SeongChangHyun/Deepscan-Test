<template>
  <div class="app-main">
    <div class="line-blue">
      <user-information class="user-information-mobile"/>
    </div>
    <div class="main-content">
      <page-information />
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key"/>
        </keep-alive>
      </transition>
      <footer-form />
    </div>
  </div>
</template>

<script>
import PageInformation from './PageInformation'
import UserInformation from './Sidebar/UserInformation'
import FooterForm from './Footer'

export default {
  name: 'AppMain',
  components: {
    PageInformation, UserInformation, FooterForm
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
