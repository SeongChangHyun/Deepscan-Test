import moment from 'moment'
import { Common, CreativeConstant } from '@/common/constants'
import { DetailOption } from '../../model'
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
        callback()
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
      collapseVideoAds: [],
      creativeConstant: CreativeConstant,
      formData: DetailOption,
      rules: {
        ad_headline: [
          { required: true, message: this.genI18n('titleRequired'), trigger: 'blur' }
        ],
        app_name: [
          { required: true, message: this.genI18n('appNameRequired'), trigger: 'blur' }
        ],
        ad_body: [
          { required: true, message: this.genI18n('mainTextRequired'), trigger: 'blur' }
        ],
        video_file_name: [
          { required: true, message: this.genI18n('videoFileRequired'), trigger: 'blur' }
        ],
        app_icon_image: [
          { required: true, message: this.genI18n('appIconImageRequired'), trigger: 'blur' }
        ],
        call_to_action: [
          { required: true, message: this.genI18n('callToActionRequired'), trigger: 'blur' }
        ],
        brand_name: [
          { required: true, message: this.genI18n('branchNameRequired'), trigger: 'blur' }
        ],
        star_rating: [
          { validator: validateStartStar, trigger: 'blur' }
        ]
      },
      appIdAndroid: 0,
      appIdIos: 0
    }
  },
  created() {
    this.formData.campaign_type = this.typeCreative
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
    changeCampaignType() {
      this.resetForm()
    },
    uploadVideoImage(file) {
      this.formData.video_file_name = file.name
    },
    uploadWaterMarkImage(file) {
      this.formData.watermark_image = file.name
    },
    uploadCiImage(file) {
      this.formData.ci_image = file.name
    },
    uploadAppIconImage(file) {
      this.formData.app_icon_image = file.name
    },
    handleRemoveVideo(file) {
      this.formData.video_file_name = ''
    },
    handleRemoveWatermarkImage(file) {
      this.formData.watermark_image = ''
    },
    handleRemoveAppIconImage(file) {
      this.formData.app_icon_image = ''
    },
    handleRemoveCiImage(file) {
      this.formData.ci_image = ''
    }
  }
}
