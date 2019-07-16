import CampaignGroup from '@/components/ReportingGridFilter/campaign-group'
import CampaignCustomColumnReport from '@/components/ReportingGridFilter/campaign-custom-column-report'
import CampaignSegment from '@/components/ReportingGridFilter/campaign-segment'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { mockListCampaign } from '@/mock/data/targeting-reports'
import { Common, targetingReports } from '@/common/constants'

export default {
  name: 'StatisticsAction',
  components: { CampaignGroup, AutocompleteSearch, CampaignCustomColumnReport, CampaignSegment },
  props: {
    filterParams: {},
    onSelectItemFilter: Function
  },
  data: function() {
    return {
      keyExpr: 'data.key',
      displayExpr: 'data.detail.name',
      customColumnReports: [],
      segments: [],
      listTargeting: targetingReports.listTargetingTimeTypes,
      selectedTargeting: targetingReports.listTargetingTimeTypes[0],
      listCampaign: mockListCampaign,
      selectedCampaign: mockListCampaign[0].id,
      listTargetingType: targetingReports.listTargetingTypeValues,
      selectedTargetingType: [...targetingReports.listTargetingTypeValues].filter(v => !v.label).map(v => v.value)
    }
  },
  methods: {
    onApplyFilter() {
      this.filterParams.campaign_id = this.selectedCampaign
      this.filterParams.group_by = this.selectedTargeting
      this.filterParams.time_periods = []
      this.filterParams.weekdays = []
      this.selectedTargetingType.forEach(item => {
        if (Common.WEEKDAYS.indexOf(item) !== -1) {
          this.filterParams.weekdays.push(item)
        } else {
          this.filterParams.time_periods.push(item)
        }
      })
      this.onSelectItemFilter(this.filterParams)
    }
  }
}
