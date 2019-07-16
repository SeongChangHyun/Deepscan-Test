import moment from 'moment'
import { Common, CreativeConstant } from '@/common/constants'
import { DetailOption } from '../../ModelNative'
import { getFileNameImage } from '@/utils/creative'
import { DetailOptionMixin } from '../../DetailOptionMixin'

export default {
  mixins: [DetailOptionMixin],
  props: {
    isMatchCampaign: {
      type: Boolean,
      default: false
    },
    typeCreative: {
      type: String,
      default: CreativeConstant.CAMPAIGN_TYPE.WEB_CAMPAIGN
    },
    appInformation: {
      type: Object,
      default() {
        return {
          ios: {
            appId: '',
            countryId: ''
          },
          android: {
            appId: '',
            countryId: ''
          }
        }
      }
    }
  },
  data() {
    const validateStartStar = (rule, value, callback) => {
      if (value === '') {
        return callback()
      }
      const parseValue = parseInt(value)
      if (isNaN(parseValue)) {
        callback(new Error(this.genI18n('startRatingRequired')))
      } else {
        if (value < 1 || value > 5) {
          callback(new Error(this.genI18n('startRatingRequired')))
        }
      }
    }
    return {
      currentDate: moment().format(Common.FORMAT_DATE_YYMMDD),
      collapseNativeAds: [],
      creativeConstant: CreativeConstant,
      formData: DetailOption,
      rules: {
        adHeadline: [
          { required: true, message: this.genI18n('titleRequired'), trigger: 'blur' }
        ],
        adBody: [
          { required: true, message: this.genI18n('mainTextRequired'), trigger: 'blur' }
        ],
        campaignImage: [
          { required: true, message: this.genI18n('campaignImageRequired'), trigger: 'blur' }
        ],
        logoImage: [
          { required: true, message: this.genI18n('appIconImageRequired'), trigger: 'blur' }
        ],
        callToAction: [
          { required: true, message: this.genI18n('callToActionRequired'), trigger: 'blur' }
        ],
        bannerName: [
          { required: true, message: this.genI18n('branchNameRequired'), trigger: 'blur' }
        ],
        starRating: [
          { validator: validateStartStar, trigger: 'blur' }
        ]
      },
      creativeName: '',
      appIdAndroid: 0,
      appIdIos: 0
    }
  },
  created() {
    this.formData.campaign_type = this.typeCreative
  },
  watch: {
    creativeName: function(val) {
      this.formData.bannerName = this.currentDate + '_' + val
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `creatives.creativeManagement.createCreative.createAds.nativeAds.${params}`
      )
    },
    submitForm() {
      this.$refs.nativeForm.validate((valid) => {
        if (valid) {
          this.$emit('submit-creative-form')
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.nativeForm.resetFields()
    },
    changeCampaignType(isResetAll = true) {
      if (isResetAll) {
        this.resetForm()
        return
      }
      // const currentCampaignType = this.formData.campaign_type
      // this.resetForm()
      // this.formData.campaign_type = currentCampaignType
    },
    uploadCampaignImage(file) {
      this.formData.campaignImage = file.raw
      this.$refs.nativeForm.validateField('campaignImage')
    },
    handleRemoveCampaignImage() {
      this.formData.campaignImage = ''
    },
    uploadCiImage(file) {
      this.formData.logoImage = file.raw
      this.$refs.nativeForm.validateField('logoImage')
    },
    handleRemoveCiImage(file) {
      this.formData.logoImage = ''
    },
    getFileNameImage(imageName) {
      return getFileNameImage(imageName)
    }
  }
}
