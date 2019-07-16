import { Common, CreativeConstant } from '@/common/constants'
import DetailOptions from '@/components/DetailOptions'
import UploadImage from '@/components/UploadImage'
import { ModelBanner } from '../../ModelBanner'
import { DetailOptionMixin } from '../../DetailOptionMixin'
import moment from 'moment'

export default {
  name: 'FixedBanner',
  components: { DetailOptions, UploadImage },
  mixins: [DetailOptionMixin],
  data() {
    return {
      currentDate: moment().format(Common.FORMAT_DATE_YYMMDD),
      collapseFixedBanner: ['collapseDetailOptions', 'collapseAdvancedOptions'],
      CreativeConstant,
      formData: ModelBanner,
      showAdvancedOptions: true,
      fileName: '',
      uploadHighResolution: false,
      detailOptions: CreativeConstant.detailOptions,
      importedImages: [],
      allowEditAdvancedTag: false,
      allowEditAdvancedDescription: false,
      allowEditAdvancedBackground: false,
      uploadElementId: 'upload-banner-file',
      imageAcceptTypes: CreativeConstant.IMAGE_ACCEPT_TYPES,
      imageAcceptSizesDefault: this.getImagesAcceptSizes(),
      imagesPerRow: 3,
      rules: {
        backgroundColor: [
          { required: true, message: 'Please input background', trigger: 'blur' },
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
      return this.uploadHighResolution ? CreativeConstant.BANNER_IMAGE_ACCEPT_SIZES_RESOLUTION : CreativeConstant.BANNER_IMAGE_ACCEPT_SIZES_NORMAL
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
