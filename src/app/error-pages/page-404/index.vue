<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img :src="err404" class="pic-404__parent" alt="404">
        <img :src="err404cloud" class="pic-404__child left" alt="404">
        <img :src="err404cloud" class="pic-404__child mid" alt="404">
        <img :src="err404cloud" class="pic-404__child right" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">Page Not Found</div>
        <router-link to="/" class="bullshit__return-home">Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Page404 from './Page404'
export default Page404
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './404.scss';
</style>
