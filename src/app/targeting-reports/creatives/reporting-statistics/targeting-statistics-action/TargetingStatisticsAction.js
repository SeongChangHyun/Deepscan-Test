import CampaignGroup from '@/components/ReportingGridFilter/campaign-group'
import CampaignCustomColumnReport from '@/components/ReportingGridFilter/campaign-custom-column-report'
import CampaignSegment from '@/components/ReportingGridFilter/campaign-segment'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { mockListCampaign, mockListItem, mockListGroupFilter } from '@/mock/data/targeting-reports'
import { reportingType, REPORTING_TYPE_API } from '@/common/constants'
export default {
  name: 'StatisticsAction',
  components: { CampaignGroup, AutocompleteSearch, CampaignCustomColumnReport, CampaignSegment },
  props: {
    onSelectItemFilter: Function
  },
  data: function() {
    return {
      reportingType: reportingType,
      reportType: REPORTING_TYPE_API.PERFORMANCE_REPORT,
      keyExpr: 'data.key',
      displayExpr: 'data.detail.name',
      customColumnReports: [],
      segments: [],
      listGroupFilter: mockListGroupFilter,
      selectedGroup: mockListGroupFilter[0].name,
      listItem: mockListItem,
      listCampaign: mockListCampaign,
      selectedCampaign: mockListCampaign[0].id,
      selectedItem: mockListItem[0].name
    }
  },
  methods: {
    onSelectItem(data, type) {
      this.onSelectItemFilter(data, type)
    }
  }
}
