import moment from 'moment'
import UploadImage from '@/components/UploadImage'
import DetailOptions from '@/components/DetailOptions'
import { CreativeConstant } from '@/common/constants'

export default {
  name: 'CreateCiController',
  components: { UploadImage, DetailOptions },
  data() {
    return {
      prefix: '',
      errorMessages: [],
      imageAcceptTypes: CreativeConstant.CI_IMAGE_ACCEPT_TYPES,
      defaultCiData: {
        uploadElementId: 'upload-default-ci',
        imagesPerRow: 3,
        importedImages: [],
        fileName: '',
        uploadHighResolution: false,
        showDetailOptions: true,
        showAdvancedOptions: true,
        detailOptions: [
          { id: 1, key: 'clickUrlWeb', title: 'clickURLTitle', description: 'desktopMobileDescription', allowEdit: false, value: '' },
          { id: 2, key: 'checkUrlWeb', title: 'impressionCheckURLTitle', description: 'desktopMobileDescription', allowEdit: false, value: '' },
          { id: 3, key: 'clickUrlAndroid', title: 'clickURLTitle', description: 'androidAppDescription', allowEdit: false, value: '' },
          { id: 4, key: 'checkUrlAndroid', title: 'impressionCheckURLTitle', description: 'androidAppDescription', allowEdit: false, value: '' },
          { id: 5, key: 'clickUrlIOS', title: 'clickURLTitle', description: 'iosAppDescription', allowEdit: false, value: '' },
          { id: 6, key: 'checkUrlIOS', title: 'impressionCheckURLTitle', description: 'iosAppDescription', allowEdit: false, value: '' },
          { id: 7, key: 'clickUrlPage', title: 'clickURLTitle', description: 'pageLinkDescription', allowEdit: false, value: '' },
          { id: 8, key: 'checkUrlPage', title: 'impressionCheckURLTitle', description: 'pageLinkDescription', allowEdit: false, value: '' }
        ],
        advancedOptions: {
          rollingInterval: '',
          backgroundColor: '#000000'
        },
        allowEditAdvancedRollingInterval: false,
        allowEditAdvancedBackground: false
      },
      rollingCiData: {
        uploadElementId: 'upload-rolling-ci',
        imagesPerRow: 3,
        importedImages: [],
        fileName: '',
        uploadHighResolution: false,
        showDetailOptions: true,
        detailOptions: [
          { id: 1, key: 'clickUrlWeb', title: 'clickURLTitle', description: 'desktopMobileDescription', allowEdit: false, value: '' },
          { id: 2, key: 'checkUrlWeb', title: 'impressionCheckURLTitle', description: 'desktopMobileDescription', allowEdit: false, value: '' },
          { id: 3, key: 'clickUrlAndroid', title: 'clickURLTitle', description: 'androidAppDescription', allowEdit: false, value: '' },
          { id: 4, key: 'checkUrlAndroid', title: 'impressionCheckURLTitle', description: 'androidAppDescription', allowEdit: false, value: '' },
          { id: 5, key: 'clickUrlIOS', title: 'clickURLTitle', description: 'iosAppDescription', allowEdit: false, value: '' },
          { id: 6, key: 'checkUrlIOS', title: 'impressionCheckURLTitle', description: 'iosAppDescription', allowEdit: false, value: '' },
          { id: 7, key: 'clickUrlPage', title: 'clickURLTitle', description: 'pageLinkDescription', allowEdit: false, value: '' },
          { id: 8, key: 'checkUrlPage', title: 'impressionCheckURLTitle', description: 'pageLinkDescription', allowEdit: false, value: '' }
        ]
      }
    }
  },
  computed: {
    createdCis() {
      return this.$store.state.creative.createdCis
    },
    imageAcceptSizesDefaultCi() {
      return this.defaultCiData.uploadHighResolution ? CreativeConstant.CI_IMAGE_ACCEPT_SIZES_HIGH_RESOLUTION : CreativeConstant.CI_IMAGE_ACCEPT_SIZES_NORMAL
    },
    imageAcceptSizesRollingCi() {
      return this.rollingCiData.uploadHighResolution ? CreativeConstant.CI_IMAGE_ACCEPT_SIZES_HIGH_RESOLUTION : CreativeConstant.CI_IMAGE_ACCEPT_SIZES_NORMAL
    },
    listCiObjectsToSave() {
      let cIObj = {}
      // add filename
      cIObj.fileName = this.defaultCiData.fileName
      cIObj.rollingFileName = this.rollingCiData.fileName

      // add detail options
      cIObj.options = {}
      cIObj.rollingOptions = {}
      this.defaultCiData.detailOptions.forEach(option => {
        cIObj.options[option.key] = option.value
      })
      this.rollingCiData.detailOptions.forEach(option => {
        cIObj.rollingOptions[option.key] = option.value
      })

      // add advanced options
      cIObj = {
        ...cIObj,
        ...this.defaultCiData.advancedOptions
      }

      // default images and rolling images matching
      const result = []
      this.defaultCiData.importedImages.forEach(image => {
        let hasMatchingRollingImage = false
        this.rollingCiData.importedImages.forEach(rollingImage => {
          if (image.size === rollingImage.size) {
            hasMatchingRollingImage = true
            result.push({
              ...cIObj,
              imageUrl: image.src,
              imageSize: `${image.size.width}x${image.size.height}`,
              rollingImageUrl: rollingImage.url,
              rollingSize: `${rollingImage.size.width}x${rollingImage.size.height}`
            })
          }
        })
        if (!hasMatchingRollingImage) {
          result.push({
            ...cIObj,
            imageUrl: image.src,
            imageSize: `${image.size.width}x${image.size.height}`
          })
        }
      })

      return result
    }
  },
  mounted() {
    this.getPrefix()
  },
  watch: {
    createdCis(newValue, oldValue) {
      this.$message({
        message: this.$t('creatives.ci.MSG_9'),
        type: 'success'
      })
      if (newValue !== oldValue) {
        this.$router.push({ path: '/creatives/list-ci' })
      }
    }
  },
  methods: {
    // Default CI
    changeDetailOptionsFormDataDefaultCi(detailOptions) {
      this.defaultCiData.detailOptions = detailOptions
    },
    clickUploadFileDefaultCi() {
      document.getElementById(this.defaultCiData.uploadElementId).click()
    },
    uploadHandlerDefaultCi(image) {
      this.defaultCiData.importedImages.push(image)
    },
    deleteImageDefaultCi(id) {
      const idx = this.defaultCiData.importedImages.map(img => img.id).indexOf(id)
      this.defaultCiData.importedImages.splice(idx, 1)
    },
    onSelectedType(type) {
      this.selectedType = type
    },

    showOptionsArea(type) {
      if (type === CreativeConstant.OPTIONS_TYPE_DETAIL) {
        this.defaultCiData.showDetailOptions = !this.defaultCiData.showDetailOptions
      }
      if (type === CreativeConstant.OPTIONS_TYPE_ADVANCED) {
        this.defaultCiData.showAdvancedOptions = !this.defaultCiData.showAdvancedOptions
      }
    },

    // Rolling CI
    changeDetailOptionsFormDataRollingCi(detailOptions) {
      this.rollingCiData.detailOptions = detailOptions
    },
    clickUploadFileRollingCi() {
      document.getElementById(this.rollingCiData.uploadElementId).click()
    },
    uploadHandlerRollingCi(image) {
      this.rollingCiData.importedImages.push(image)
    },
    deleteImageRollingCi(id) {
      const idx = this.rollingCiData.importedImages.map(img => img.id).indexOf(id)
      this.rollingCiData.importedImages.splice(idx, 1)
    },

    // common
    getPrefix() {
      this.prefix = `${moment().format(CreativeConstant.CI_CREATE_FILE_NAME_PREFIX_FORMAT)}_`
    },
    // validations
    isValidWebUrl(field, url) {
      this.errorMessages.push(`${field} ${this.$t('creatives.ci.MSG_2')}`)
      return url.startsWith(CreativeConstant.HTTP_PREFIX) || url.startsWith(CreativeConstant.HTTPS_PREFIX)
    },
    validateUrl(ci) {
      if (ci.options && ci.options.clickUrlWeb && ci.options.clickUrlWeb !== '') {
        return this.isValidWebUrl('clickUrlWeb', ci.options.clickUrlWeb)
      }
      if (ci.options && ci.options.clickUrlPage && ci.options.clickUrlPage !== '') {
        return this.isValidWebUrl('clickUrlPage', ci.options.clickUrlPage)
      }
      if (ci.rollingOptions && ci.rollingOptions.clickUrlWeb && ci.rollingOptions.clickUrlWeb !== '') {
        return this.isValidWebUrl('clickUrlWeb', ci.rollingOptions.clickUrlWeb)
      }
      if (ci.rollingOptions && ci.rollingOptions.clickUrlPage && ci.rollingOptions.clickUrlPage !== '') {
        return this.isValidWebUrl('clickUrlPage', ci.rollingOptions.clickUrlPage)
      }
      return true
    },
    validateColor({ backgroundColor }) {
      const isValid = backgroundColor.match(CreativeConstant.CI_BACKGROUND_COLOR_REGEX)
      if (!isValid) {
        this.errorMessages.push(`${backgroundColor} ${this.$t('creatives.ci.MSG_3')}`)
        return false
      }
      return true
    },
    actionSave() {
      const isValid = this.listCiObjectsToSave.every(ci => this.validateUrl(ci) && this.validateColor(ci))
      if (!isValid) {
        this.$message({
          message: this.errorMessages,
          type: 'error'
        })
        this.errorMessages = []
        return
      }
      this.errorMessages = []
      this.$store.dispatch('creative/createCreativeImages', this.listCiObjectsToSave)
    },
    actionBack() {
      this.$router.push({ path: '/creatives/list-ci' })
    },
    onUploadError(errorCodes) {
      this.$message({
        message: errorCodes.map(code => this.$t(`creatives.ci.MSG_${code}`)).join(','),
        type: 'error'
      })
    }
  }
}
