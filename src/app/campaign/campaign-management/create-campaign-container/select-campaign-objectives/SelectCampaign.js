import CardCampaignGoal from './components/CardCampaignGoal'
import CardCampaignTargetingType from './components/CardCampaignTargetingType'
import { targetingTypeList, campaignGoalList } from '../campaignConfig.json'
import { mapState } from 'vuex'
import { CampaignManagementConstants } from '@/common/constants'

export default {
  components: {
    CardCampaignGoal,
    CardCampaignTargetingType
  },
  data() {
    return {
      campaignGoalList: Object.values(campaignGoalList)
    }
  },
  watch: {
    activeTargetingType: function(val) {
      if (this.activeTrackingTag) {
        this.$store.dispatch('campaign/setTrackingTag')
      }
      if (this.activeIndustry) {
        this.$store.dispatch('campaign/setIndustry')
      }
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'industryValue']),

    activeCampaignGoal() {
      return this.dataCreateCampaign.campaignGoal
    },

    activeTargetingType() {
      return this.dataCreateCampaign.targetingType
    },

    targetingTypeList() {
      const key = this.activeCampaignGoal
      if (!key) return []
      return [...campaignGoalList[key].targetingTypeRules].map(v => targetingTypeList[v])
    },

    activeTrackingTag() {
      const keyCampaignGoal = this.activeCampaignGoal
      const keyTargetingType = this.activeTargetingType
      return targetingTypeList[keyTargetingType] && targetingTypeList[keyTargetingType].trackingTag && targetingTypeList[keyTargetingType].trackingTag.includes(keyCampaignGoal)
    },

    activeIndustry() {
      const keyCampaignGoal = this.activeCampaignGoal
      const keyTargetingType = this.activeTargetingType
      return targetingTypeList[keyTargetingType] && targetingTypeList[keyTargetingType].industry && targetingTypeList[keyTargetingType].industry.includes(keyCampaignGoal)
    },

    isTrackingTag() {
      return this.dataCreateCampaign.isTrackingTag
    },

    activeBtnNext() {
      const keyCampaignGoal = this.activeCampaignGoal
      const keyTargetingType = this.activeTargetingType
      if (this.activeTrackingTag) return this.isTrackingTag
      return keyCampaignGoal && keyTargetingType
    }
  },
  methods: {
    onNext() {
      this.$store.dispatch('campaign/nextStep', CampaignManagementConstants.STEP_CREATE_CAMPAIGN)
      this.$router.push('/campaign/create-campaign/configure-campaign')
    },
    onCancel() {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        campaignGoal: '',
        targetingType: ''
      })
    }
  }
}
