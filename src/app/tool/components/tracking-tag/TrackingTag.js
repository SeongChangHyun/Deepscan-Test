import { trackingTag } from '@/common/constants'
import CustomTag from './components/custom-tag'
import TagGuide from './components/tag-guide'
import CollectInformation from './components/collect-information'
import StateSummary from './components/state-summary'
import { mapGetters } from 'vuex'

export default {
  name: 'TrackingTag',
  components: { CustomTag, CollectInformation, StateSummary, TagGuide },
  data() {
    return {
      trackingTagTypes: trackingTag.type,
      activeType: trackingTag.type.stateSummary
    }
  },
  computed: {
    ...mapGetters('tool', [
      'listData'
    ])
  },
  created() {
    this.$store.dispatch('tool/getAllTrackingTags')
  }
}
