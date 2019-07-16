import { isValidURL, convertToCamel } from '@/utils/creative'
import { CreativeConstant } from '@/common/constants'

export const DetailOptionMixin = {
  data() {
    return {
      rules: {
        url: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impression_check_url: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impressionCheckUrl: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        app_deeplink_android: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        appDeeplinkAndroid: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impression_check_app_deeplink_android: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impressionCheckAppDeeplinkAndroid: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        app_deeplink_apple: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        appDeeplinkApple: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impression_check_app_deeplink_apple: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impressionCheckAppDeeplinkApple: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        app_mobile_url: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        appMobileUrl: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impression_check_app_mobile_url: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        impressionCheckAppMobileUrl: [
          { validator: this.validateUrl, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateUrl(rule, value, callback) {
      if (!value) {
        return callback()
      }
      if (!isValidURL(value)) {
        const fieldLabel = this.getFieldName(rule.field)
        const message = this.$t(`creatives.creativeManagement.createCreative.createAds.nativeAds.${fieldLabel}`) + ' ' +
        this.$t('creatives.creativeManagement.createCreative.createAds.nativeAds.invalidUrlFormat')
        return callback(new Error(message))
      }
      callback()
    },
    getFieldName(fieldName) {
      const camelName = convertToCamel(fieldName)
      const result = CreativeConstant.DETAIL_OPTIONS_NATIVE.filter((item) => {
        return fieldName === item.field || camelName === item.field
      })
      if (result.length > 0) {
        return result[0].title
      }
      return ''
    }
  }
}
