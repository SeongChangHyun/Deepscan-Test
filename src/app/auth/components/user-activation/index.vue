<template>
  <div class="activation-container">
    <div
      class="activation-form el-col-md-8 el-col-sm-12 el-col-20 mx-auto mt-5 text-center float-none"
    >
      <div class="title-container mt-4">
        <h3 class="title">{{ $t('activation.title') }}</h3>
      </div>

      <div class="title-sub-title my-4">
        <div
          class="sub-title px-3 m-auto"
        >{{ isActivated ? $t('activation.subTitleActivedEmail') : $t('activation.subTitleOutdateEmail') }}</div>
        <hr>
      </div>

      <div class="content mt-5">
        <div
          class="content-text"
        >{{ isActivated ? $t('activation.msgActivedEmail') : $t('activation.msgOutdateEmail') }}</div>
        <div v-show="!isActivated" class="content-text">{{ $t('activation.msgInstruction') }}</div>
      </div>

      <el-button
        :loading="isLoading"
        type="info"
        class="btn-login my-3 w-100 rounded-0"
        @click.native.prevent="handleActivation"
      >{{ isActivated ? $t('activation.btnBackToSignUp') : $t('activation.btnSendVerificationAgain') }}</el-button>
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
