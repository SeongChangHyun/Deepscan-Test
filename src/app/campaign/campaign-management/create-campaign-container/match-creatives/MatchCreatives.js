import FixedBanner from '@/app/creatives/creatives-management/create-creative/components/fixed-banner'
import Animation from '@/app/creatives/creatives-management/create-creative/components/animation'
import CreativeType from '@/app/creatives/creatives-management/create-creative/components/creative-type'
import { CreativeConstant, CampaignManagementConstants } from '@/common/constants'
import NativeAds from '@/app/creatives/creatives-management/create-creative/components/native-ads'
import VideoAds from '@/app/creatives/creatives-management/create-creative/components/video-ads'
import DynamicAds from '@/app/creatives/creatives-management/create-creative/components/dynamic-ads'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'dataMatCreatives'])
  },
  created() {
    if (!this.dataCreateCampaign.targetingType) this.$router.replace('/campaign/create-campaign/select-campaign-objectives')
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
    onBack() {
      this.$store.dispatch('campaign/nextStep', CampaignManagementConstants.STEP_CREATE_CAMPAIGN)
      this.$router.push('/campaign/create-campaign/configure-campaign')
    },
    onSave() {
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

          break

        case CreativeConstant.CREATIVE_ANIMATED_TYPE:

          break

        case CreativeConstant.CREATIVE_DYNAMIC_TYPE:

          break

        case CreativeConstant.CREATIVE_NATIVE_TYPE:

          break

        case CreativeConstant.CREATIVE_VIDEO_TYPE:

          break

        default:
          break
      }
    }
  }
}
