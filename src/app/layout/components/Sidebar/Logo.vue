
<template>
  <div class="logo" @click="gotoHomePage" />
</template>

<script>
export default {
  methods: {
    gotoHomePage() {
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>
