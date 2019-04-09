export default {
  name: 'Sample',
  computed: {
    data() {
      return this.$store.getters.data
    }
  }
}
