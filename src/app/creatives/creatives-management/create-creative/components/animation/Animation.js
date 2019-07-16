import { CreativeConstant, Common } from '@/common/constants'
import UploadImage from '@/components/UploadImage'
import DetailOptions from '@/components/DetailOptions'
import { ModelBanner } from '../../ModelBanner'
import moment from 'moment'
import { DetailOptionMixin } from '../../DetailOptionMixin'

export default {
  name: 'Animation',
  components: { UploadImage, DetailOptions },
  mixins: [DetailOptionMixin],
  data() {
    return {
      currentDate: moment().format(Common.FORMAT_DATE_YYMMDD),
      collapseAnimation: ['collapseAnimatedSetting', 'collapseDetailOptions', 'collapseAdvancedOptions'],
      CreativeConstant,
      formData: ModelBanner,
      showAnimatedSetting: true,
      showDetailOptions: true,
      showAdvancedOptions: true,
      fileName: '',
      listAnimatedTypes: CreativeConstant.animatedTypes,
      listBorderTypes: CreativeConstant.borderColors,
      listMotionSpeeds: CreativeConstant.motionSpeed,
      listPlayStopTerm: CreativeConstant.playStopTerms,
      listProgressBarStyles: CreativeConstant.progressBarStyles,
      listProgressPositions: CreativeConstant.progressPositions,
      listProgressBarSizes: CreativeConstant.progressBarSizes,
      detailOptions: CreativeConstant.detailOptions,
      importedImages: [],
      allowEditAdvancedTag: false,
      allowEditAdvancedDescription: false,
      allowEditAdvancedBackground: false,
      uploadElementId: 'upload-animated-file',
      imageAcceptSizesDefault: this.getImagesAcceptSizes(),
      imageAcceptTypes: CreativeConstant.IMAGE_ACCEPT_TYPES,
      imagesPerRow: 3,
      rules: {
        outer_color_1: [
          { required: true, message: this.$t('creatives.creativeManagement.createCreative.inputBackgroundRequired'), trigger: 'blur' },
          { pattern: Common.BACKGROUND_PATTERN, message: this.$t('creatives.creativeManagement.createCreative.validateColorMessage'), trigger: 'blur' }
        ]
      },
      creativeName: ''
    }
  },
  watch: {
    creativeName: function(val) {
      this.formData.banner_name = this.currentDate + '_' + val
    }
  },
  methods: {
    genOptionI18n(params) {
      return this.$t(
        `creatives.creativeManagement.createCreative.createAds.nativeAds.${params}`
      )
    },
    getImagesAcceptSizes() {
      return this.uploadHighResolution ? CreativeConstant.ANIMATED_IMAGE_ACCEPT_SIZES_RESOLUTION : CreativeConstant.ANIMATED_IMAGE_ACCEPT_SIZES_NORMAL
    },
    clickUploadFile() {
      document.getElementById(this.uploadElementId).click()
    },
    deleteImageDefaultCi(id) {
      const idx = this.importedImages.map(img => img.id).indexOf(id)
      this.importedImages.splice(idx, 1)
    },
    uploadHandler(images) {
      const data = new FormData()
      images.forEach((item) => {
        data.append('fileNames', item.originFile)
      })
      this.$store.dispatch('creative/createCreativeUploadImages', data)
        .then(response => {
          this.importedImages = this.importedImages.concat(images)
          this.formData.tmp_file_list = this.formData.tmp_file_list.concat(response.tmp_files)
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    onUploadError(errorCodes) {
      this.$message({
        message: errorCodes.map(code => this.$t(`creatives.ci.MSG_${code}`)).join(','),
        type: 'error'
      })
    },
    changeDetailOptions(detailOptions) {
      this.detailOptions = detailOptions
    }
  }
}
