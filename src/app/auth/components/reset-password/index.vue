<template>
  <div class="reset-password">
    <component v-if="renderComponent" :is="currentTabComponent" />
  </div>
</template>

<script>
import resetPasswordController from './ResetPassword'
export default resetPasswordController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './resetPassword.scss'
</style>
