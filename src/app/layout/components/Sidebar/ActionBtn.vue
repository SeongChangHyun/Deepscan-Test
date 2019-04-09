<template>
  <div class="d-flex justify-content-between">
    <div class="icon-action">
      <svg-icon icon-class="notification" />
    </div>
    <div class="icon-action">
      <svg-icon icon-class="info-sign" />
    </div>
    <div class="icon-action">
      <svg-icon icon-class="question" />
    </div>
    <div :title="$t('navbar.logout')" class="icon-action">
      <svg-icon icon-class="logout" @click="logout" />
    </div>
  </div>
</template>

<script>
import { Common } from '@/common/constants'

export default {
  data() {
    return {
      Common
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>
