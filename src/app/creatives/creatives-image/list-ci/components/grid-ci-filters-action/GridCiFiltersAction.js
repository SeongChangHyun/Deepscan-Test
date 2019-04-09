import CampaignGroup from '@/components/ReportingGridFilter/campaign-group'
import CampaignCustomColumnReport from '@/components/ReportingGridFilter/campaign-custom-column-report'
import CampaignSegment from '@/components/ReportingGridFilter/campaign-segment'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { CreativeConstant } from '@/common/constants'

export default {
  name: 'FiltersAction',
  components: { CampaignGroup, AutocompleteSearch, CampaignCustomColumnReport, CampaignSegment },
  props: {
    onSelectSize: Function,
    onSelectStatus: Function,
    onResetFilter: Function,
    onSearchResult: Function,
    filterBySizeOptions: Array,
    searchSource: Array
  },
  data: function() {
    return {
      filterByStatusOptions: [
        {
          value: CreativeConstant.CI_STATUS.ALL.toLowerCase(),
          label: CreativeConstant.CI_STATUS.ALL
        },
        {
          value: CreativeConstant.CI_STATUS.AWAIT.toLowerCase(),
          label: CreativeConstant.CI_STATUS.AWAIT
        },
        {
          value: CreativeConstant.CI_STATUS.DISABLE.toLowerCase(),
          label: CreativeConstant.CI_STATUS.DISABLE
        },
        {
          value: CreativeConstant.CI_STATUS.ENABLE.toLowerCase(),
          label: CreativeConstant.CI_STATUS.ENABLE
        },
        {
          value: CreativeConstant.CI_STATUS.STOP.toLowerCase(),
          label: CreativeConstant.CI_STATUS.STOP
        }
      ],
      filterBySizeSeleted: 'all',
      filterByStatusSelected: CreativeConstant.CI_STATUS.ALL.toLowerCase(),
      keyExpr: 'data.key',
      displayExpr: 'data.detail.name'
    }
  },
  methods: {
    onReset(event) {
      this.filterBySizeSeleted = 'all'
      this.filterByStatusSelected = 'all'
      this.onResetFilter(event)
    }
  }
}
