<template>
  <div class="reset-password">
    <component :is="currentTabComponent" />
  </div>
</template>

<script>
import resetPasswordController from './ResetPassword'
export default resetPasswordController
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './resetPassword.scss'
</style>
