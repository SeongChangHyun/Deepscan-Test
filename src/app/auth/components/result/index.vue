<template>
  <div class="activation-container">
    <div
      class="activation-form"
    >
      <div class="logo-box">
        <img src="../../resources/logo.png" class="logo-image">
      </div>

      <div class="text-title">
        <hr class="login-horizontal">
        <div :class="'signin-text-2'">{{ this.$t(resultConfig.title) }}</div>
      </div>

      <div class="content text-center">
        <div v-html="getText(resultConfig.content)" />
      </div>

      <div class="verification-btn">
        <el-button
          type="info"
          class="w-100 rounded-0"
          @click.native.prevent="resultConfig.actionBtn"
        >{{ this.$t(resultConfig.buttonText) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResultForm',
  computed: {
    ...mapGetters([
      'resultConfig'
    ])
  },
  created() {
    if (this.resultConfig.title === '' && this.resultConfig.content === '') {
      this.$router.push({ path: 'login' })
    }
  },
  methods: {
    getText(key) {
      return this.$t(key).replace('\n', '<br>')
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './result.scss'
</style>
