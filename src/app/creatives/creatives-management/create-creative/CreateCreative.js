import FixedBanner from './components/fixed-banner'
import Animation from './components/animation'
import CreativeType from './components/creative-type'
import { mockCreativeTypes } from './mockData'
import { CreativeConstant } from '@/common/constants'
import * as creativeApiService from '../../services/apiServices'
import NativeAds from './components/native-ads'
import VideoAds from './components/video-ads'

export default {
  name: 'CreateCreativeController',
  components: { FixedBanner, CreativeType, Animation, NativeAds, VideoAds },
  data() {
    return {
      creativeConstant: CreativeConstant,
      creativeTypes: mockCreativeTypes,
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
      switch (this.selectedType) {
        case CreativeConstant.CREATIVE_BANNER_TYPE:
          creativeApiService.createFixedBanner(this.$refs.creativeComponent.formData).then((response) => {
            if (response.data) {
              // TO DO: handle create fixed banner server response
            }
          })
          break

        case CreativeConstant.CREATIVE_ANIMATED_TYPE:
          creativeApiService.createFixedBanner(this.$refs.creativeComponent.formData).then((response) => {
            if (response.data) {
              // TO DO: handle create fixed banner server response
            }
          })
          break

        case CreativeConstant.CREATIVE_DYNAMIC_TYPE:
          creativeApiService.createFixedBanner(this.$refs.creativeComponent.formData).then((response) => {
            if (response.data) {
              // TO DO: handle create fixed banner server response
            }
          })
          break

        case CreativeConstant.CREATIVE_NATIVE_TYPE:
          creativeApiService.createNativeAds(this.$refs.creativeComponent.formData).then((response) => {
            // TO DO: handle create native ads server response
          })
          break

        case CreativeConstant.CREATIVE_VIDEO_TYPE:
          creativeApiService.createVideoAds(this.$refs.creativeComponent.formData).then((response) => {
            // TO DO: handle create video ads server response
          })
          break

        default:
          break
      }
    }
  }
}
