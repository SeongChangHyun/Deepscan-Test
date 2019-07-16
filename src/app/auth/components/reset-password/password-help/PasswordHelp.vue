<template>
  <div class="password-help">
    <el-form
      ref="rsPwdForm"
      :model="rsPwdForm"
      :rules="rsPwdRules"
      class="rsPwd-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="logo-box">
        <img src="../../../resources/logo.png" class="logo-image">
      </div>

      <div class="text-title">
        <hr class="login-horizontal">
        <div class="signin-text">{{ $t('resetPwd.subTitle') }}</div>
      </div>

      <el-form-item prop="email" class="input-email text-validate">
        <el-input
          v-model="rsPwdForm.email"
          :placeholder="$t('resetPwd.hintEmail')"
          name="email"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item class="input-email reset-pw">
        <el-button
          :loading="isLoading"
          type="info"
          @click.native.prevent="onRsPwd"
        >{{ $t('resetPwd.btnRsPwd') }}</el-button>
      </el-form-item>

      <div class="text-title">
        <el-form-item>
          <hr class="login-horizontal">
          <div class="or-text">{{ $t('resetPwd.orText') }}</div>
        </el-form-item>
      </div>

      <el-form-item class="input-email return-login">
        <el-button
          :loading="isLoading"
          type="info"
          @click.native.prevent="goTo('/login')"
        >{{ $t('resetPwd.btnBack') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import passwordHelpController from './PasswordHelp'
export default passwordHelpController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./passwordHelp.scss";
</style>
