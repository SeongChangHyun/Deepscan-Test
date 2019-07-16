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
      isShowAnimatedAndDetail: true,
      isShowAdvancedOptions: false,
      isShowPromotionImageOptions: false,
      isCallToFunction: true,
      autoUpload: false
    }
  },
  computed: {
    rules() {
      const formRules = {
        baseDynamicFormCTAColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, trigger: 'blur' }
        ],
        baseDynamicFormTitleColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3'), trigger: 'blur' }
        ],
        baseDynamicFormPriceColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3'), trigger: 'blur' }
        ]
      }
      if (this.editMode.baseDynamicFormClickUrlWebEditMode) {
        formRules.baseDynamicFormClickUrlWeb = [
          { validator: this.validateUrl, trigger: 'blur' }
        ]
      }
      return formRules
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
      this.$store.dispatch(`creative/updateDynamicCreative`, this.creative)
    }
  }

}
