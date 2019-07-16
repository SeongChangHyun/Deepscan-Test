import { mapGetters } from 'vuex'
export default {
  name: 'IndexApi',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('user', [
    ])
  }
}
