import { CreativeConstant } from '@/common/constants'
import BaseEditDynamicAds from '../base-edit-dynamic-ads'
export default {
  name: 'UpdateCreativeController',
  extends: BaseEditDynamicAds,
  data() {
    return {
      motionTypes: CreativeConstant.UPDATE_CREATIVE.MOTION_TYPES,
      motionSpeed: CreativeConstant.UPDATE_CREATIVE.MOTION_SPEED,
      motionInterval: CreativeConstant.UPDATE_CREATIVE.MOTION_INTERVAL,
      backgroundLabel: CreativeConstant.UPDATE_CREATIVE.BACKGROUND_LABEL,
      isShowAnimatedAndDetail: false,
      isShowAdvancedOptions: false,
      isShowPromotionImageOptions: false,
      isCallToFunction: true,
      autoUpload: false
    }
  },

  computed: {
    rules() {
      return {
        baseDynamicFormInternalBackgroundColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1') },
          { validator: this.validateColor }
        ],
        baseDynamicFormTitleColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1') },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3') }
        ],
        baseDynamicFormPriceColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1') },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3') }
        ],
        baseDynamicFormClickUrlWeb: [
          { validator: this.validateUrl }
        ],
        baseDynamicFormImpressionCheckUrlWeb: [
          { validator: this.validateUrl }
        ]
      }
    }
  },

  watched: {
    creative: {

    }
  },
  methods: {
    showAnimatedAndDetail() {
      this.isShowAnimatedAndDetail = !this.isShowAnimatedAndDetail
    },
    showAdvancedOptions() {
      this.isShowAdvancedOptions = !this.isShowAdvancedOptions
    },
    showPromotionImageOptions() {
      this.isShowPromotionImageOptions = !this.isShowPromotionImageOptions
    },
    onSave() {
      this.$refs['updateDynamicBatch1Form'].validate((valid) => {
        if (valid) {
          this.$store.dispatch(`creative/updateDynamicCreative`, this.creative)
        } else {
          return false
        }
      })
    }
  }

}
