import { mockOptions, mockDetailOptions } from './mockData'
import { CreativeConstant } from '@/common/constants'
import { some } from 'lodash'

export default {
  name: 'FixedBanner',
  data() {
    return {
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
        backgroudColor: mockOptions[0].value
      },
      showDetailOptions: true,
      showAdvancedOptions: true,
      fileName: '',
      uploadHighResolution: false,
      detailOptions: mockDetailOptions,
      selectOptions: mockOptions,
      importedImages: [],
      allowEditAdvancedTag: false,
      allowEditAdvancedDescription: false,
      allowEditAdvancedBackground: false
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
                    message: this.$t('creatives.creativeManagement.creatCreative.FixedBanner.errorImageMessage'),
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
    }
  }
}
