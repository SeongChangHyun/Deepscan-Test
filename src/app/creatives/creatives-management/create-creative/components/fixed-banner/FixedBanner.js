import { Common, CreativeConstant } from '@/common/constants'
import { some } from 'lodash'
import DetailOptions from '@/components/DetailOptions'

export default {
  name: 'FixedBanner',
  components: { DetailOptions },
  data() {
    return {
      collapseFixedBanner: ['collapseDetailOptions', 'collapseAdvancedOptions'],
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
        backgroundColor: Common.DEFAULT_COLOR_PCIKER
      },
      showDetailOptions: true,
      showAdvancedOptions: true,
      creativeName: '',
      fileName: '',
      uploadHighResolution: false,
      detailOptions: CreativeConstant.detailOptions,
      importedImages: [],
      allowEditAdvancedTag: true,
      allowEditAdvancedDescription: true,
      allowEditAdvancedBackground: true
    }
  },
  methods: {
    showOptionsArea(type) {
      if (type === CreativeConstant.OPTIONS_TYPE_DETAIL) {
        this.showDetailOptions = !this.showDetailOptions
      }
      if (type === CreativeConstant.OPTIONS_TYPE_ADVANCED) {
        this.showAdvancedOptions = !this.showAdvancedOptions
      }
    },
    clickUploadFile() {
      document.getElementById('upload-file').click()
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
