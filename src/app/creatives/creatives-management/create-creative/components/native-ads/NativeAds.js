import moment from 'moment'
import { CreativeConstant } from '@/common/constants'
import { DetailOption } from '../../model'

export default {
  data() {
    return {
      currentDate: moment().format('YY-MM-DD'),
      webCampaignValue: CreativeConstant.CAMPAIGN_TYPE.WEB_CAMPAIGN,
      appCampaignValue: CreativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN,
      isShowDetailOptions: false,
      creativeConstant: CreativeConstant,
      formData: DetailOption,
      rules: {
        ad_headline: [
          { required: true, message: 'Please input title', trigger: 'blur' }
        ],
        app_name: [
          { required: true, message: 'Please input app name', trigger: 'blur' }
        ],
        ad_body: [
          { required: true, message: 'Please input main text', trigger: 'blur' }
        ],
        campaign_image: [
          { required: true, message: 'Please input campaign image', trigger: 'blur' }
        ],
        app_icon_image: [
          { required: true, message: 'Please input app icon image', trigger: 'blur' }
        ],
        call_to_action: [
          { required: true, message: 'Please input call to action', trigger: 'blur' }
        ],
        brand_name: [
          { required: true, message: 'Please input brand name', trigger: 'blur' }
        ]
      }
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
    changeCampaignType() {
      this.resetForm()
    },
    uploadCampaignImage(file) {
      this.formData.campaign_image = file.name
    },
    uploadCiImage(file) {
      this.formData.ci_image = file.name
    },
    uploadAppIconImage(file) {
      this.formData.app_icon_image = file.name
    }
  }
}
