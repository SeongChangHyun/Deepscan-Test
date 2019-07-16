<template>
  <div v-if="renderComponent && isFirstCheck" class="activation-container">
    <div
      class="activation-form"
    >
      <div class="logo-box">
        <img src="../../resources/logo.png" class="logo-image">
      </div>

      <div class="text-title">
        <hr class="login-horizontal">
        <div class="signin-text">{{ isActivated ? $t('activation.subTitleActiveEmail') : $t('activation.subTitleOutdateEmail') }}</div>
      </div>

      <div class="content content-text">
        <div v-html="getText(isActivated ? $t('activation.msgActiveEmail') : $t('activation.msgOutdateEmail'))" />
      </div>

      <div class="verification-btn">
        <el-button
          :disabled="isDisabled"
          type="info"
          class="w-100 rounded-0"
          @click.native.prevent="handleActivation"
        >{{ isActivated ? $t('activation.btnBackToSignUp') : $t('activation.btnSendVerificationAgain') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import activationController from './Activation'
export default activationController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './activation.scss'
</style>
