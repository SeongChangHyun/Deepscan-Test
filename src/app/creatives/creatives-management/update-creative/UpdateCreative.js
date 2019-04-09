import { mapState } from 'vuex'
import { CreativeConstant } from '@/common/constants'
export default {
  name: 'UpdateCreativeController',
  data() {
    return {
      applyChange: false,
      defaultURL: 'www.defaultURL.com',
      motion_types: CreativeConstant.UPDATE_CREATIVE.MOTION_TYPES,
      motion_speed: CreativeConstant.UPDATE_CREATIVE.MOTION_SPEED,
      motion_interval: CreativeConstant.UPDATE_CREATIVE.MOTION_INTERVAL,
      background_label: CreativeConstant.UPDATE_CREATIVE.BACKGROUND_LABEL,
      showBGImage: false,
      showExtendBGColor: false,
      showPromotionImage: false,
      showClickUrlWeb: false,
      showImpressionCheckUrl: false,
      showClickUrlAndroidApp: false,
      showImpressionCheckClickUrlAndroid: false,
      showClickUrlIosApp: false,
      showImpressionCheckClickUrlIos: false,
      showClickUrlEventPage: false,
      showImpressionCheckClickUrlEventPage: false,
      motion_type_value: '',
      motion_speed_value: [],
      motion_interval_value: [],
      isShowAnimatedAndDetail: true,
      color: '#000000',
      background_label_value: '',
      title_size: 12,
      bold_checked: true
    }
  },
  computed: {
    ...mapState('creative', ['creative'])
  },
  watched: {
    creative: {

    }
  },
  methods: {
    showAnimatedAndDetail() {
      this.isShowAnimatedAndDetail = !this.isShowAnimatedAndDetail
    },
    onSave() {
      this.$store.dispatch(`creative/updateDynamicCreative`, this.creative)
    }
  },
  created() {
    this.$store.dispatch(`creative/getCreative`)
  }
}
