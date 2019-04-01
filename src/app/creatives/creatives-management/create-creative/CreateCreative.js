import FixedBanner from './components/fixed-banner'
import CreativeType from './components/creative-type'
import { mockCreativeTypes } from './mockData'
import { CreativeConstant } from '@/common/constants'
import * as creativeApiService from '../../services/apiServices'

export default {
  name: 'CreateCreativeController',
  components: { FixedBanner, CreativeType },
  data() {
    return {
      creativeConstant: CreativeConstant,
      creativeTypes: mockCreativeTypes,
      selectedType: 'banner'
    }
  },
  methods: {
    onSelectedType(type) {
      this.selectedType = type
    },
    actionBack() {
      this.$router.push({ path: '/creatives/creative' })
    },
    actionSave() {
      switch (this.selectedType) {
        case CreativeConstant.CREATIVE_BANNER_TYPE:
          creativeApiService.createFixedBanner(this.$refs.fixedBanner.formData).then((response) => {
            if (response.data) {
              // TO DO: handle create fixed banner server response
            }
          })
          break
        default:
          break
      }
    }
  }
}
