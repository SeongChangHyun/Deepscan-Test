<template>
  <div class="errPage-container">
    <el-col :xs="24" :sm="8" :md="8" :lg="8" class="auth-left-block p-4">
      <div class="logo-background">
        <img src="../../../assets/images/logo-white.png" class="logo-image">
      </div>
      <table class="introduction">
        <td class="text-title">
          <div class="title">{{ $t('generalAuth.title') }}</div>
          <div class="description">{{ $t('generalAuth.description') }}</div>
        </td>
      </table>
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" class="auth-right-block">
      <div id="auth-content" class="auth-content">
        <router-view v-if="renderComponent" />
      </div>
    </el-col>
  </div>
</template>

<script>
import Page403 from './Page403'
export default Page403
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './403.scss';
</style>
