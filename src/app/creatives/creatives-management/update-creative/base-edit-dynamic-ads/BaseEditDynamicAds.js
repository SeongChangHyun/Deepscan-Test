import { CommonValidations } from '@/common/constants'

/**
 * All properties are set prefix baseDynamicForm, and will be replaced all when we have standard form data from backend team
 */
export default {
  name: 'BaseEditDynamicAdsController',
  props: {
    creative: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        baseDynamicFormName: this.creative.banner_name || '',
        baseDynamicFormSize: this.creative.size || '',
        baseDynamicFormTheme: this.creative.theme || '',
        baseDynamicFormPrefix: this.creative.bannername_prefix || '',
        baseDynamicFormMotionType: this.creative.motion_type || '',
        baseDynamicFormMotionSpeed: this.creative.motion_speed || '',
        baseDynamicFormMotionInterval: this.creative.motion_interval || '',
        baseDynamicFormCallToAction: this.creative.call_to_action || '',
        baseDynamicFormInternalBackgroundColor: this.creative.internal_background_color || '',
        baseDynamicFormLabel: this.creative.label || '',
        baseDynamicFormTitleFont: typeof this.creative.option === 'object' ? (this.creative.option.title_pt || '') : '',
        baseDynamicFormTitleColor: typeof this.creative.option === 'object' ? (this.creative.option.title_color || '') : '',
        baseDynamicFormTitleSize: typeof this.creative.option === 'object' ? (this.creative.option.title_size || '') : '',
        baseDynamicFormTitleBold: typeof this.creative.option === 'object' ? (this.creative.option.title_bold || false) : false,
        baseDynamicFormPriceFont: typeof this.creative.option === 'object' ? (this.creative.option.price_pt || '') : '',
        baseDynamicFormPriceColor: typeof this.creative.option === 'object' ? (this.creative.option.price_color || '') : '',
        baseDynamicFormPriceSize: typeof this.creative.option === 'object' ? (this.creative.option.price_size || '') : '',
        baseDynamicFormPriceBold: typeof this.creative.option === 'object' ? (this.creative.option.price_bold || false) : false,
        baseDynamicFormPriceInformationRepresent: typeof this.creative.option === 'object' ? (this.creative.option.price_information_represent || '') : '',
        baseDynamicFormCTAFont: typeof this.creative.option === 'object' ? (this.creative.option.cta_font || '') : '',
        baseDynamicFormCTAColor: typeof this.creative.option === 'object' ? (this.creative.option.cta_color || '') : '',
        baseDynamicFormCTASize: typeof this.creative.option === 'object' ? (this.creative.option.cta_size || '') : '',
        baseDynamicFormCTABold: typeof this.creative.option === 'object' ? (this.creative.option.cta_bold || false) : false,
        baseDynamicFormOption1Font: typeof this.creative.option === 'object' ? (this.creative.option.option1_font || '') : '',
        baseDynamicFormOption1Color: typeof this.creative.option === 'object' ? (this.creative.option.option1_font || '') : '',
        baseDynamicFormOption1Size: typeof this.creative.option === 'object' ? (this.creative.option.option1_size || '') : '',
        baseDynamicFormOption1Bold: typeof this.creative.option === 'object' ? (this.creative.option.option1_bold || '') : '',
        baseDynamicFormOption2Font: typeof this.creative.option === 'object' ? (this.creative.option.option2_font || '') : '',
        baseDynamicFormOption2Color: typeof this.creative.option === 'object' ? (this.creative.option.option2_color || '') : '',
        baseDynamicFormOption2Size: typeof this.creative.option === 'object' ? (this.creative.option.option2_size || '') : '',
        baseDynamicFormOption2Bold: typeof this.creative.option === 'object' ? (this.creative.option.option2_bold || '') : '',
        baseDynamicFormApplyChange: this.creative.apply_change || false,
        baseDynamicFormBackgroundImage: typeof this.creative.option === 'object' ? (this.creative.option.background_color || '') : '',
        baseDynamicFormExternalBackgroundColor: typeof this.creative.option === 'object' ? (this.creative.option.external_background_color || '') : '',
        baseDynamicFormPromotionImage: this.creative.promotion_image || '',
        baseDynamicFormBorderColors: typeof this.creative.option === 'object' ? (this.creative.option.border_color || '') : '',
        baseDynamicFormSelectedBorderColor: typeof this.creative.option === 'object' ? (this.creative.option.selected_border_color || '') : '',
        baseDynamicFormSelectedBackgroundColor: typeof this.creative.option === 'object' ? (this.creative.option.selected_background_color || '') : '',
        baseDynamicFormDividingLineColor: typeof this.creative.option === 'object' ? (this.creative.option.line_color || '') : '',
        baseDynamicFormClickUrlWeb: this.creative.url || '',
        baseDynamicFormImpressionCheckUrlWeb: this.creative.impression_check_url || '',
        baseDynamicFormClickUrlAndroidApp: this.creative.app_deeplink_android || '',
        baseDynamicFormImpressionCheckClickUrlAndroid: this.creative.impression_check_app_deeplink_android || '',
        baseDynamicFormClickUrlIosApp: this.creative.app_deeplink_apple || '',
        baseDynamicFormImpressionCheckClickUrlIosApp: this.creative.impression_check_app_deeplink_apple || '',
        baseDynamicFormClickUrlEventPage: this.creative.app_mobile_url || '',
        baseDynamicFormImpressionCheckClickUrlEventPage: this.creative.impression_check_app_mobile_url || ''
      },
      editMode: {
        baseDynamicFormBackgroundImageEditMode: false,
        baseDynamicFormExternalBackgroundColorEditMode: false,
        baseDynamicFormPromotionImageEditMode: false,
        baseDynamicFormBorderColorsEditMode: false,
        baseDynamicFormSelectedBorderColorEditMode: false,
        baseDynamicFormSelectedBackgroundColorEditMode: false,
        baseDynamicFormDividingLineColorEditMode: false,
        baseDynamicFormClickUrlWebEditMode: false,
        baseDynamicFormImpressionCheckUrlWebEditMode: false,
        baseDynamicFormClickUrlAndroidAppEditMode: false,
        baseDynamicFormImpressionCheckClickUrlAndroidEditMode: false,
        baseDynamicFormClickUrlIosAppEditMode: false,
        baseDynamicFormImpressionCheckClickUrlIosAppEditMode: false,
        baseDynamicFormClickUrlEventPageEditMode: false,
        baseDynamicFormImpressionCheckClickUrlEventPageEditMode: false
      }
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `creatives.creativeManagement.updateCreative.${params}`
      )
    },
    genI18nErrorMessage(params) {
      return this.$t(`creatives.ci.${params}`)
    },
    validateColor(rule, backgroundColor, callback) {
      if (backgroundColor.match(CommonValidations.COLOR)) {
        callback()
      } else {
        callback(new Error(this.genI18nErrorMessage('MSG_3')))
      }
    },
    validateUrl(rule, url, callback) {
      if (url === '' || url.startsWith(CommonValidations.HTTP_PREFIX) || url.startsWith(CommonValidations.HTTPS_PREFIX)) {
        callback()
      } else {
        callback(new Error(this.genI18nErrorMessage('MSG_2')))
      }
    }
  }
}
