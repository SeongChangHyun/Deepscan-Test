<template>
  <div class="d-flex">
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
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    logout() {
      if (typeof window.formIsChanged === 'undefined' || !window.formIsChanged) {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      } else {
        this.$dialog.destroy()
        this.$dialog.confirm(this.$t('confirmRouteLeaveMessage'), {
          customClass: 'confirmation-dialog'
        })
          .then((dialog) => {
            window.onbeforeunload = null
            this.$store.dispatch('LogOut').then(() => {
              location.reload()// In order to re-instantiate the vue-router object to avoid bugs
            })
          })
          .catch(() => {
            this.$dialog.destroy()
          })
      }
    }
  }
}
</script>
