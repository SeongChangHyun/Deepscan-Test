import moment from 'moment'
// import { CreativeConstant } from '@/common/constants'

export default {
  data() {
    return {
      currentDate: moment().format('YY-MM-DD'),
      formData: {
        ci_ids: '',
        feed: '',
        logoCI: [],
        theme: []
      },
      rules: {

      },
      listFeed: [
        { id: '1', name: 'Qoo10_JPY' },
        { id: '2', name: 'Qoo10_KRW' }
      ],
      listLogoCI: [
        { id: '1', name: '51x50' },
        { id: '2', name: '83x30' }
      ],
      listTheme: [
        { id: '1', name: 'Theme 1' },
        { id: '2', name: 'Theme 2' }
      ]
    }
  },
  created() {
    this.formData.campaign_type = this.typeCreative
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `creatives.creativeManagement.createCreative.createAds.dynamicAds.${params}`
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
    onSelectAllTheme() {
      this.formData.theme = [...this.listTheme].map(v => {
        return v.id
      })
    },
    onClickPreview(item) {

    }
  }
}
