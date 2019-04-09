<template>
  <div class="auth-card">
    <div
      class="auth-card__form el-col-md-8 el-col-sm-12 el-col-20 mx-auto mt-15vh text-center float-none"
    >
      <div class="title-container mt-4">
        <h3 class="title">{{ $t('resetPwd.title') }}</h3>
      </div>

      <div class="title-sub-title my-4">
        <div
          class="sub-title px-3 m-auto"
        >{{ !hasExpired ? $t('resetPwd.confirmCodeTitle') : $t('resetPwd.subTitle') }}</div>
        <hr>
      </div>
      <el-form
        v-if="!hasExpired"
        ref="rsPwdForm"
        :model="rsPwdForm"
        :rules="rsPwdRules"
        class="rsPwd-form"
        auto-complete="on"
        label-position="left"
      >

        <el-form-item prop="password" class="mt-3">
          <el-input
            v-model="rsPwdForm.password"
            :placeholder="$t('register.password')"
            name="password"
            type="password"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="passwordRpt" class="mt-3">
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
          class="btn-rsPwd w-100 rounded-0 el-button-info mb-4"
          @click.native.prevent="onRsPwd"
        >{{ $t('resetPwd.btnRsPwd') }}</el-button>
      </el-form>

      <div v-if="hasExpired" class="title-sub-title my-3">
        <div
          class="sub-title px-3 m-auto"
        >{{ $t('resetPwd.msgExpired') }}</div>
      </div>

      <el-button
        v-if="hasExpired"
        :loading="isLoading"
        type="info"
        class="btn-rsPwd w-100 rounded-0 el-button-info mb-4"
        @click.native.prevent="goTo('/login')"
      >{{ $t('resetPwd.btnBackConfirmForm') }}</el-button>
    </div>
  </div>
</template>

<script>
import resetFormController from './ResetForm'
export default resetFormController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './resetForm.scss'
</style>
