<template>
  <div class="password-help">
    <div
      class="password-help__form el-col-md-8 el-col-sm-12 el-col-20 mx-auto mt-15vh text-center float-none"
    >
      <el-form
        ref="rsPwdForm"
        :model="rsPwdForm"
        :rules="rsPwdRules"
        class="rsPwd-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container mt-4">
          <h3 class="title">{{ $t('resetPwd.title') }}</h3>
        </div>

        <div class="title-sub-title my-4">
          <div
            class="sub-title px-3 m-auto"
          >{{ $t('resetPwd.subTitle') }}</div>
          <hr>
        </div>

        <el-form-item prop="email">
          <el-input
            v-model="rsPwdForm.email"
            :placeholder="$t('resetPwd.hintEmail')"
            name="email"
            type="text"
            auto-complete="on"
          />
        </el-form-item>

        <el-button
          :loading="isLoading"
          type="info"
          class="btn-rsPwd w-100 rounded-0 el-button-info"
          @click.native.prevent="onRsPwd"
        >{{ $t('resetPwd.btnRsPwd') }}</el-button>

        <div class="title-sub-title my-3">
          <div
            class="sub-title px-3 m-auto"
          >{{ $t('resetPwd.orText') }}</div>
          <hr>
        </div>

        <el-button
          :loading="isLoading"
          type="info"
          class="btn-rsPwd w-100 rounded-0 el-button-info mb-4"
          @click.native.prevent="goTo('/login')"
        >{{ $t('resetPwd.btnBack') }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import passwordHelpController from './PasswordHelp'
export default passwordHelpController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './passwordHelp.scss'
</style>
