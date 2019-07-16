import FixedBanner from './components/fixed-banner'
import Animation from './components/animation'
import CreativeType from './components/creative-type'
import { CreativeConstant, SUCCESS } from '@/common/constants'
import NativeAds from './components/native-ads'
import VideoAds from './components/video-ads'
import DynamicAds from './components/dynamic-ads'
import { Message } from 'element-ui'

export default {
  name: 'CreateCreativeController',
  components: { FixedBanner, CreativeType, Animation, NativeAds, VideoAds, DynamicAds },
  data() {
    return {
      creativeConstant: CreativeConstant,
      creativeTypes: CreativeConstant.CREATIVE_TYPE,
      selectedType: CreativeConstant.CREATIVE_BANNER_TYPE,
      currentComponent: 'FixedBanner'
    }
  },
  methods: {
    onSelectedType(type) {
      this.selectedType = type
      switch (type) {
        case CreativeConstant.CREATIVE_BANNER_TYPE: {
          this.currentComponent = 'FixedBanner'
          break
        }
        case CreativeConstant.CREATIVE_ANIMATED_TYPE: {
          this.currentComponent = 'Animation'
          break
        }
        case CreativeConstant.CREATIVE_NATIVE_TYPE: {
          this.currentComponent = 'NativeAds'
          break
        }
        case CreativeConstant.CREATIVE_VIDEO_TYPE: {
          this.currentComponent = 'VideoAds'
          break
        }
        case CreativeConstant.CREATIVE_DYNAMIC_TYPE: {
          this.currentComponent = 'DynamicAds'
          break
        }
        default: {
          this.currentComponent = null
        }
      }
    },
    actionBack() {
      this.$router.push({ path: '/creatives/creative' })
    },
    actionSave() {
      this.$refs.creativeComponent.$refs.nativeForm.validate((valid) => {
        if (valid) {
          this.actionSubmit()
        } else {
          return false
        }
      })
    },
    actionSubmit() {
      const params = {
        formData: this.$refs.creativeComponent.formData,
        type: this.selectedType
      }
      this.$store.dispatch('creative/createCreative', params)
        .then(response => {
          if (response.result === SUCCESS) {
            this.$message.success(this.$t('creatives.creativeManagement.createCreative.fixedBanner.createCreativeSuccess'))
            this.$router.go(-1)
          } else {
            Message({
              message: response.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            if (error.response.data) {
              let errorData = error.response.data
              if (typeof errorData === 'string') {
                errorData = JSON.parse(errorData)
              }
              if (errorData.message) {
                Message({
                  message: errorData.message,
                  type: 'error',
                  duration: 5 * 1000
                })
              } else if (errorData.detail) {
                Message({
                  message: errorData.detail,
                  type: 'error',
                  duration: 5 * 1000
                })
              } else {
                Message({
                  message: this.$t('api.status400'),
                  type: 'error',
                  duration: 5 * 1000
                })
              }
            }
          }
        })
    }
  }
}
