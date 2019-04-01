<template>
  <div id="app" :style="{ fontFamily: fontName, fontSize: size }">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App',
  computed: {
    fontName() {
      return this.$store.getters.fontName
    },
    size() {
      return this.$store.getters.size
    }
  }
}
</script>
