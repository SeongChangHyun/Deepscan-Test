import { CreativeConstant } from '@/common/constants'
import BaseEditDynamicAds from '../base-edit-dynamic-ads'
export default {
  name: 'UpdateCreativeController',
  extends: BaseEditDynamicAds,
  data() {
    return {
      backgroundLabel: CreativeConstant.UPDATE_CREATIVE.BACKGROUND_LABEL,
      isShowAnimatedAndDetail: false,
      isShowAdvancedOptions: false,
      isShowPromotionImageOptions: false,
      color: CreativeConstant.UPDATE_CREATIVE.DEFAULT_COLOR,
      motionSpeed: CreativeConstant.UPDATE_CREATIVE.MOTION_SPEED,
      lineColors: CreativeConstant.UPDATE_CREATIVE.LINE_COLORS,
      autoUpload: false
    }
  },

  computed: {
    rules() {
      const formRules = {
        baseDynamicFormCallToAction: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' }
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
        baseDynamicFormExternalBackgroundColor: [
          { required: true, message: this.genI18nErrorMessage('MSG_1'), trigger: 'blur' },
          { validator: this.validateColor, message: this.genI18nErrorMessage('MSG_3'), trigger: 'blur' }
        ]
      }
      if (this.editMode.baseDynamicFormClickUrlWebEditMode) {
        formRules.baseDynamicFormClickUrlWeb = [
          { required: true, validator: this.validateUrl, trigger: 'blur' }
        ]
      }
      if (this.editMode.baseDynamicFormImpressionCheckUrlWebEditMode) {
        formRules.baseDynamicFormImpressionCheckUrlWeb = [
          { required: true, validator: this.validateUrl, trigger: 'blur' }
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
    },
    getUploadBGImageFileName(file) {
      this.formData.baseDynamicFormBackgroundImage = file.name
    },
    getUploadPromotionImageFileName(file) {
      this.formData.baseDynamicFormPromotionImage = file.name
    }
  }
}
