import { Common, CreativeConstant } from '@/common/constants'
import { some } from 'lodash'
import UploadImage from '@/components/UploadImage'
import DetailOptions from '@/components/DetailOptions'

export default {
  name: 'Animation',
  components: { UploadImage, DetailOptions },
  data() {
    return {
      collapseAnimation: ['collapseAnimatedSetting', 'collapseDetailOptions', 'collapseAdvancedOptions'],
      formData: {
        clickUrlWeb: '',
        checkUrlWeb: '',
        clickUrlAndroid: '',
        checkUrlAndroid: '',
        clickUrlIOS: '',
        checkUrlIOS: '',
        clickUrlPage: '',
        checkUrlPage: '',
        htmlTag: '',
        description: '',
        backgroundColor: Common.DEFAULT_COLOR_PCIKER,
        typesOfAnimated: CreativeConstant.animatedTypes[0],
        borderColor: Common.DEFAULT_COLOR_PCIKER,
        borderType: CreativeConstant.borderColors[0],
        motionSpeeds: CreativeConstant.motionSpeed[0],
        playStopTerm: CreativeConstant.playStopTerms[0],
        progressBarStyle: CreativeConstant.progressBarStyles[0],
        progressPosition: CreativeConstant.progressPositions[0],
        progressBarSize: CreativeConstant.progressBarSizes[0]
      },
      showAnimatedSetting: true,
      showDetailOptions: true,
      showAdvancedOptions: true,
      creativeName: '',
      fileName: '',
      uploadHighResolution: false,
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
      imageAcceptTypes: CreativeConstant.ANIMATED_IMAGE_ACCEPT_TYPES,
      imagesPerRow: 3,
      rules: {
        backgroundColor: [
          { required: true, message: 'Please input background', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getImagesAcceptSizes() {
      return this.uploadHighResolution ? CreativeConstant.ANIMATED_IMAGE_ACCEPT_SIZES_RESOLUTION : CreativeConstant.IMAGE_ACEPT_SIZES
    },
    clickUploadFile() {
      document.getElementById(this.uploadElementId).click()
    },
    deleteImageDefaultCi(id) {
      const idx = this.importedImages.map(img => img.id).indexOf(id)
      this.importedImages.splice(idx, 1)
    },
    uploadHandler(image) {
      this.importedImages.push(image)
    },
    onUploadError(errorCodes) {
      this.$message({
        message: errorCodes.map(code => this.$t(`creatives.ci.MSG_${code}`)).join(','),
        type: 'error'
      })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    onUploadFile(event) {
      const files = event.target.files
      if (!files) {
        return
      }
      const filesLength = files.length
      if (filesLength < 1) {
        return
      }
      let showErrorImage = true
      for (let i = 0; i < filesLength; i++) {
        this.getBase64(files[i]).then(
          data => {
            const img = document.createElement('img')
            img.onload = () => {
              const imageSize = {
                width: img.naturalWidth || img.width,
                height: img.naturalHeight || img.height
              }
              if (some(CreativeConstant.IMAGE_ACEPT_SIZES, imageSize)) {
                const image = {
                  id: i,
                  src: data,
                  filename: files[i].name
                }
                if (this.importedImages.length >= 1) {
                  this.fileName += ';'
                }
                this.importedImages.push(image)

                this.fileName += files[i].name
              } else {
                if (showErrorImage) {
                  this.$message({
                    message: this.$t('creatives.creativeManagement..createCreative.fixedBanner.errorImageMessage'),
                    type: 'error'
                  })
                }
                showErrorImage = false
              }
            }
            img.src = data
          }
        )
      }
    },
    deleteImage(id) {
      const newImportedImages = []
      this.importedImages.forEach(item => {
        if (item.id !== id) {
          newImportedImages.push(item)
        }
      })
      this.importedImages = newImportedImages
    },
    getCreativeNamePrefix() {
      const date = new Date()
      return String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDay())
    },
    changeDetailOptions(detailOptions) {
      this.detailOptions = detailOptions
    }
  }
}
