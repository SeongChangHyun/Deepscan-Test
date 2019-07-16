import CampaignGroup from '@/components/ReportingGridFilter/campaign-group'
import CampaignCustomColumnReport from '@/components/ReportingGridFilter/campaign-custom-column-report'
import CampaignSegment from '@/components/ReportingGridFilter/campaign-segment'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { mockListCampaign } from '@/mock/data/targeting-reports'
import { targetingReports } from '@/common/constants'

export default {
  name: 'StatisticsAction',
  components: { CampaignGroup, AutocompleteSearch, CampaignCustomColumnReport, CampaignSegment },
  props: {
    onSelectItemFilter: Function
  },
  data: function() {
    return {
      keyExpr: 'data.key',
      displayExpr: 'data.detail.name',
      customColumnReports: [],
      segments: [],
      listTargeting: targetingReports.listTargeting,
      selectedTargeting: targetingReports.listTargeting[0],
      listCampaign: mockListCampaign,
      selectedCampaign: mockListCampaign[0].id,
      listTargetingType: targetingReports.listTargetingType,
      selectedTargetingType: [...targetingReports.listTargetingType].filter(v => !v.label).map(v => v.value)
    }
  },
  methods: {
  }
}
