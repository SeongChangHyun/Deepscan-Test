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
    ...mapState('campaign', ['stepActive'])
  },
  created() {
  }

}
