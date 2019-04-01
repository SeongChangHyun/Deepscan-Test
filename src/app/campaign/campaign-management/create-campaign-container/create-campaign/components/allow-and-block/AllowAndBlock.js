import { mapState } from 'vuex'
export default {
  props: {
    langKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: '1d',
      allowItem: '',
      blockItem: '',
      allowList: [],
      blockList: []
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.${this.langKey} .${params}`
      )
    },
    addItem(type = 'block') {
      if (type === 'allow') {
        this.allowList.push(this.allowItem)
        return
      }
      this.blockList.push(this.blockItem)
    },
    deleteItem(type = 'block', index) {
      if (type === 'allow') {
        this.allowList.splice(index, 1)
        return
      }
      this.blockList.splice(index, 1)
    },
    deleteAllItem(type = 'block') {
      if (type === 'allow') {
        this.allowList = []
        return
      }
      this.blockList = []
    }
  }
}
