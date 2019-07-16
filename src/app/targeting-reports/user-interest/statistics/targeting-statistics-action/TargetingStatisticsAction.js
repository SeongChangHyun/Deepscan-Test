import { mockListCampaign } from '@/mock/data/targeting-reports'
import DropdownCampaigns from './dropdown-campaigns'

export default {
  name: 'StatisticsAction',
  components: { DropdownCampaigns },
  data() {
    return {
      campaigns: [],
      rowSelected: '30 rows',
      listRow: [{ key: '30 rows', value: 30 }, { key: '20 rows', value: 20 }, { key: '10 rows', value: 10 }],
      listCampaign: mockListCampaign,
      selectedCampaign: mockListCampaign[0].id
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `targetingReports.campaignName.${params}`
      )
    },
    onSelectNumRow(value) {
      this.$emit('select-num-row', value)
    },
    downloadReport() {
      this.$emit('download-report')
    },
    onSelectCampaign(campaign_id) {
      this.$emit('select-campaign', campaign_id)
    }
  },
  created() {
    this.$store.dispatch('targeting/getListCampaign', { is_default: true, callback: (error, response) => {
      if (error) {
        return this.handleError(error.message)
      }
      this.campaigns = response
    } })
  }
}
