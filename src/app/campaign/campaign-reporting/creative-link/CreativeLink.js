import { CreativeConstant, CreativeLink } from '@/common/constants'
import AutocompleteSearch from '@/components/AutocompleteSearch'
export default {
  name: 'CreativeLink',
  components: { AutocompleteSearch },
  data() {
    return {
      creatives: [
        {
          creative_id: '2942173',
          status: 'paused',
          banner_name: 'Creative 1',
          creative_type: 'dynamic',
          size: '100 x 120',
          url: 'http://ossn.vn/wp-content/themes/ossn/images/no-image-slide.png',
          background_color: '#ff0000',
          linked_campaign_cnt: 10,
          inspection_status: 'on hold'
        },
        {
          creative_id: '2942174',
          status: 'paused',
          banner_name: 'Creative 2',
          creative_type: 'video_contents',
          size: '1 x 1',
          url: 'http://ossn.vn/wp-content/themes/ossn/images/no-image-slide.png',
          background_color: '#0000FF',
          linked_campaign_cnt: 10,
          inspection_status: 'on hold'
        },
        {
          creative_id: '2942175',
          status: 'paused',
          banner_name: 'Creative 3',
          creative_type: 'video_contents',
          size: '1 x 1',
          url: 'http://ossn.vn/wp-content/themes/ossn/images/no-image-slide.png',
          background_color: '#0000FF',
          linked_campaign_cnt: 10,
          inspection_status: 'on hold'
        }
      ],
      campaigns: [
        {
          id: '1',
          goalName: 'Branding 1',
          status: 'stop',
          type: 'Lead targeting',
          name: '180313 - campaign d',
          createdDate: '2019.04.05 09:13'
        },
        {
          id: '2',
          goalName: 'Branding 2',
          status: 'stop',
          type: 'Lead targeting',
          name: '180313 - campaign c',
          createdDate: '2019.04.05 09:13'
        },
        {
          id: '3',
          goalName: 'Branding 3',
          status: 'stop',
          type: 'Lead targeting',
          name: '180313 - campaign a',
          createdDate: '2019.04.05 09:13'
        },
        {
          id: '4',
          goalName: 'Branding 4',
          status: 'stop',
          type: 'Lead targeting',
          name: '180313 - campaign z',
          createdDate: '2019.04.05 09:13'
        },
        {
          id: '5',
          goalName: 'Branding 5',
          status: 'stop',
          type: 'Lead targeting',
          name: '180313 - campaign h',
          createdDate: '2019.04.05 09:13'
        }
      ],
      columns: CreativeLink.IMAGE_SIZES,
      linkedMatrix: [
        {
          name: 'dynamic',
          '120x600': true,
          '160x600': false,
          '200x200': true,
          '250x250': true,
          '300x250': true,
          '320x50': true,
          '320x100': true,
          '320x480': true,
          '728x90': true,
          flexible: true
        },
        {
          name: 'video',
          '120x600': true,
          '160x600': false,
          '200x200': true,
          '250x250': true,
          '300x250': true,
          '320x50': false,
          '320x100': true,
          '320x480': true,
          '728x90': true,
          flexible: true
        }
      ],
      campaign: {
        goalName: 'Branding',
        type: 'Lead targeting',
        adGroupName: 'Iherb 2018',
        name: '180313 - campaign'
      },
      selectedCampaigns: [],
      searchCreativeSource: [],
      searchCampaignSource: [],
      filterByStatusOptions: [],
      keyExpr: '',
      displayExpr: '',
      filterByStatusSelected: '',
      dialogVisible: false
    }
  },
  methods: {
    handleCreativeSelectionChange() {},
    handleCampaignSelectionChange(collection) {
      this.selectedCampaigns = collection.map(c => c.id)
    },
    linkWithCampaign() {
      if (this.selectedCampaigns.length === 0) {
        this.$message({
          type: 'error',
          message: this.$t('creativeLink.messageNoCampaignSelected')
        })
      } else {
        this.selectedCampaigns = []
        this.dialogVisible = false
      }
    },
    onSearchCreativeResult() {},
    onSearchCampaignResult() {},
    onSelectStatus() {},
    handleClose() {
      this.dialogVisible = false
    },
    goToLinkCreativesWithACampaign() {
      this.dialogVisible = true
    },
    getStatusStyle(status) {
      switch (status.toLowerCase()) {
        case CreativeConstant.CREATIVE_STATUS.ACTIVE.toLowerCase():
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.ACTIVE }
        case CreativeConstant.CREATIVE_STATUS.STAND_BY.toLowerCase():
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.STAND_BY }
        case CreativeConstant.CREATIVE_STATUS.PAUSED.toLowerCase():
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.PAUSED }
        case CreativeConstant.CREATIVE_STATUS.DISABLED.toLowerCase():
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.DISABLED }
      }
    }
  }
}
