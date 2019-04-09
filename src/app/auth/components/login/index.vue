<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>

      <div class="title-sub-title">
        <div class="sub-title">{{ $t('login.signIn') }}</div>
        <hr>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
        <el-input
          v-model="loginForm.email"
          :placeholder="$t('login.email')"
          name="email"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="info"
        class="btn-login"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}</el-button>

      <div class="text-right">
        <a class="reset-pwd" @click="goToResetPwd">{{ $t('login.resetPwd') }}</a>
      </div>

      <div class="title-sub-title">
        <div class="sub-title">{{ $t('login.or') }}</div>
        <hr>
      </div>

      <el-button
        :loading="loading"
        type="info"
        class="btn-login mb-4"
        @click.native.prevent="goToRegister"
      >{{ $t('login.register') }}</el-button>
    </el-form>
  </div>
</template>

<script>
import loginController from './Login'
export default loginController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './login.scss';
</style>
