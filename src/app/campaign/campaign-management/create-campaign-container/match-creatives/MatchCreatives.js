import {
  targetingTypeList
} from '../campaignConfig.json'
import { mapState } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
      targetingTypeList
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])

  },
  methods: {
    onNext() {

    },
    onCancel() {

    }
  }
}
