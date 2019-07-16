<template>
  <div class="auth-card">
    <div class="reset-form">

      <div class="logo-box">
        <img src="../../../resources/logo.png" class="logo-image">
      </div>

      <div class="text-title">
        <hr class="login-horizontal">
        <div :class=" !hasExpired ? 'signin-text-1' : 'signin-text-2' ">{{ !hasExpired ? $t('resetPwd.confirmCodeTitle') : $t('resetPwd.subTitle') }}</div>
      </div>

      <el-form
        v-if="!hasExpired"
        ref="rsPwdForm"
        :model="rsPwdForm"
        :rules="rsPwdRules"
        class="rsPwd-form mb-3"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="password" class="text-validate mb-10px">
          <el-input
            v-model="rsPwdForm.password"
            :placeholder="$t('register.password')"
            name="password"
            type="password"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="passwordRpt" class="text-validate mb-20px">
          <el-input
            v-model="rsPwdForm.passwordRpt"
            :placeholder="$t('register.passwordRpt')"
            name="passwordRpt"
            type="password"
            auto-complete="on"
          />
        </el-form-item>

        <el-button
          :loading="isLoading"
          type="info"
          @click.native.prevent="onRsPwd"
        >{{ $t('resetPwd.btnChangePwd') }}</el-button>
      </el-form>

      <div v-if="hasExpired" class="my-3">
        <div class="sub-title m-auto text-center" v-html="getText(tokenInvalid)" />
      </div>

      <div v-if="hasExpired" class="back-to-login">
        <el-button
          :loading="isLoading"
          type="info"
          @click.native.prevent="resentGetToken"
        >{{ $t(`resetPwd.${tokenInvalid ? 'btnBackLogin' : 'btnBackConfirmForm'}`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import resetFormController from './ResetForm'
export default resetFormController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./resetForm.scss";
</style>
