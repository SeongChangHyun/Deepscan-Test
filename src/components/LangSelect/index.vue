<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='ko'" command="ko">{{ this.$t('navbar.koLang') }}</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">{{ this.$t('navbar.enLang') }}</el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja'" command="ja">{{ this.$t('navbar.jaLang') }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.state.layout.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$store.dispatch('setFontName', lang)
      this.$message({
        message: this.$t('navbar.changeLangSuccessful'),
        type: 'success'
      })
    }
  }
}
</script>
