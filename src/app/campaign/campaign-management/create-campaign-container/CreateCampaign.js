import SelectCampaign from './select-campaign-objectives'
import CreateCampaign from './create-campaign'
import MatchCreatives from './match-creatives'
import { mapState } from 'vuex'
import { CampaignManagementConstants } from '@/common/constants'

export default {
  components: { SelectCampaign, CreateCampaign, MatchCreatives },
  data() {
    return {
      CampaignManagementConstants
    }
  },
  computed: {
    ...mapState('campaign', ['stepActive']),
    language() {
      return this.$store.getters.language
    }
  },
  watch: {
    language: {
      handler: function() {
      }
    }
  },
  created() {
    window.onbeforeunload = (event) => {
      if (`${window.location.hash}`.includes('/campaign/create-campaign/configure-campaign')) {
        event.returnValue = 'Write'
      }
    }
  }
}
