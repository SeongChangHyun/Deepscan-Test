<template>
  <div>
    <input id="menu" v-model="sidebar.opened" type="checkbox" @click="toggleClick">
    <label for="menu" class="icon">
      <div class="menu" />
    </label>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Hamburger',
  props: {
    toggleClick: {
      type: Function,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  }
}
</script>
