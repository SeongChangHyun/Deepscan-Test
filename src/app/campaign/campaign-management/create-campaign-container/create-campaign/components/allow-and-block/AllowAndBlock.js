import { CampaignManagementConstants } from '@/common/constants'
export default {
  props: {
    langKey: {
      type: String,
      required: true
    },
    verifyData: {
      type: Function,
      required: true
    },
    onUpload: {
      type: Function
    }

  },
  data() {
    return {
      allowItem: '',
      blockItem: '',
      allowList: [],
      blockList: []
    }
  },
  watch: {
    allowList: {
      handler: function(val) {
        this.$emit('on-change', CampaignManagementConstants.VERIFY_TYPE.ALLOW.toUpperCase(), val)
      },
      deep: true
    },
    blockList: {
      handler: function(val) {
        this.$emit('on-change', CampaignManagementConstants.VERIFY_TYPE.BLOCK.toUpperCase(), val)
      },
      deep: true
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.${this.langKey}.${params}`
      )
    },
    addItem: async function(type = CampaignManagementConstants.VERIFY_TYPE.BLOCK) {
      const value = this[`${type}Item`]
      if (!value) return
      const domains = value.split(',')
      this[`${type}Item`] = ''
      try {
        const items = await this.verifyData(domains)
        this[`${type}List`] = [...this[`${type}List`], ...items.target_keywords.map(item => {
          return {
            name: item.keyword,
            stat_result: item.stat_count
          }
        })]
      } catch (error) {
        this.$message({
          type: 'error',
          message: this.genI18n('verifyError')
        })
      }
    },
    deleteItem(type = CampaignManagementConstants.VERIFY_TYPE.BLOCK, index) {
      if (type === CampaignManagementConstants.VERIFY_TYPE.ALLOW) {
        this.allowList.splice(index, 1)
        return
      }
      this.blockList.splice(index, 1)
    },
    deleteAllItem(type = CampaignManagementConstants.VERIFY_TYPE.BLOCK) {
      if (type === CampaignManagementConstants.VERIFY_TYPE.ALLOW) {
        this.allowList = []
        return
      }
      this.blockList = []
    }
  }
}
