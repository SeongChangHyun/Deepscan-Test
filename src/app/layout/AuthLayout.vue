<template>
  <el-row>
    <div :style="styleAuthLayout" :title="$t('navbar.changeLang')" class="change-lang text-right float-right">
      <el-dropdown :class="{'mt-18px': $store.state.layout.device === Common.MOBILE }" trigger="click" class="lang-select" @command="handleSetLanguage">
        <div class="label-lang">
          <div v-if="language===Common.KO_CODE || language===Common.KR_CODE">
            <svg-icon icon-class="south-korea" />
            <span v-if="$store.state.layout.device !== Common.MOBILE" class="px-2">{{ $t('navbar.koLang') }}</span>
            <i class="el-icon-arrow-down" />
          </div>
          <div v-if="language===Common.EN_CODE">
            <svg-icon icon-class="united-states" />
            <span v-if="$store.state.layout.device !== Common.MOBILE" class="px-2">{{ $t('navbar.enLang') }}</span>
            <i class="el-icon-arrow-down" />
          </div>
          <div v-if="language===Common.JA_CODE || language===Common.JP_CODE">
            <svg-icon icon-class="japan" />
            <span v-if="$store.state.layout.device !== Common.MOBILE" class="px-2">{{ $t('navbar.jaLang') }}</span>
            <i class="el-icon-arrow-down" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="language===Common.KO_CODE || language===Common.KR_CODE" command="ko">
            <svg-icon icon-class="south-korea" />
            <span>{{ $t('navbar.koLang') }}</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="language===Common.EN_CODE" command="en">
            <svg-icon icon-class="united-states" />
            <span>{{ $t('navbar.enLang') }}</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="language===Common.JA_CODE || language===Common.JP_CODE" command="ja">
            <svg-icon icon-class="japan" />
            <span>{{ $t('navbar.jaLang') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-col :xs="24" :sm="8" :md="8" :lg="8" class="auth-left-block p-4">
      <div class="logo-background">
        <img src="../../assets/images/logo-white.png" class="logo-image">
      </div>
      <table class="introduction">
        <td class="text-title">
          <div class="title">{{ $t('generalAuth.title') }}</div>
          <div class="description">{{ $t('generalAuth.description') }}</div>
        </td>
      </table>
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" class="auth-right-block">
      <div id="auth-content" class="auth-content">
        <router-view v-if="renderComponent" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { Common, Auth } from '@/common/constants'

export default {
  data() {
    return {
      styleAuthLayout: {},
      renderComponent: true,
      Common,
      Auth
    }
  },
  computed: {
    language() {
      this.forceReRender()
      return this.$store.getters.language
    }
  },
  watch: {
    language: {
      handler: function() {}
    }
  },
  mounted() {
    document.getElementById('auth-content').addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const el = document.getElementById('auth-content')
      const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop, el.scrollTop)
      this.styleAuthLayout = { 'margin-top': `calc(20px - ${scrollTop - 20}px)` }
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$store.dispatch('setFontName', lang)
      this.$message({
        message: this.$t('navbar.changeLangSuccessful'),
        type: 'success',
        duration: 5000
      })
    },
    forceReRender() {
      this.renderComponent = false
      this.$nextTick(() => {
        this.renderComponent = true
      })
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./auth-layout.scss";
</style>
