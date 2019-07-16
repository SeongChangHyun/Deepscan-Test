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
      autoUpload: false,
      titleSelect: CreativeConstant.UPDATE_CREATIVE.TITLE_SELECT,
      priceSelect: CreativeConstant.UPDATE_CREATIVE.PRICE_SELECT,
      option1Select: CreativeConstant.UPDATE_CREATIVE.OPTION1_SELECT,
      option2Select: CreativeConstant.UPDATE_CREATIVE.OPTION2_SELECT
    }
  },
  computed: {
    rules() {
      const formRules = {
        baseDynamicFormBorderColors: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, trigger: 'blur' }
        ],
        baseDynamicFormInternalBackgroundColor: [
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
        ],
        baseDynamicFormCTAColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3'), trigger: 'blur' }
        ],
        baseDynamicFormSelectedBorderColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3'), trigger: 'blur' }
        ],
        baseDynamicFormSelectedBackgroundColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3'), trigger: 'blur' }
        ],
        baseDynamicFormOption1Color: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3'), trigger: 'blur' }
        ],
        baseDynamicFormOption2Color: [
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
      this.$store.dispatch(`creative/updateDynamicCreative`, this.creative)
    }
  }

}
