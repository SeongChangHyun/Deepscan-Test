<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="logo-box">
        <img src="../../resources/logo.png" class="logo-image">
      </div>

      <div class="text-title">
        <hr class="login-horizontal">
        <div class="signin-text">{{ $t('login.signIn') }}</div>
      </div>

      <el-form-item prop="email" class="form-item text-validate">
        <el-input
          v-model="loginForm.email"
          :placeholder="$t('login.email')"
          name="email"
          type="text"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password" class="form-item password text-validate">
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-form-item class="form-item signin">
        <el-button
          :loading="loading"
          type="info"
          @click.native.prevent="handleLogin"
        >{{ $t('login.logIn') }}</el-button>
      </el-form-item>

      <div class="reset-pw-text">
        <a class="reset-pwd" @click="goToResetPwd">{{ $t('login.resetPwd') }}</a>
      </div>

      <div class="text-title">
        <hr class="login-horizontal">
        <div class="or-text">{{ $t('login.or') }}</div>
      </div>

      <el-form-item class="form-item register">
        <el-button
          :loading="loading"
          type="info"
          @click.native.prevent="goToRegister"
        >{{ $t('login.register') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import loginController from './Login'
export default loginController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./login.scss";
</style>
