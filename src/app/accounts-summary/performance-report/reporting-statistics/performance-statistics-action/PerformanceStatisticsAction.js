import CampaignGroup from '@/components/ReportingGridFilter/campaign-group'
import CampaignCustomColumnReport from '@/components/ReportingGridFilter/campaign-custom-column-report'
import CampaignSegment from '@/components/ReportingGridFilter/campaign-segment'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { Common, reportingType, REPORTING_TYPE_API } from '@/common/constants'

export default {
  name: 'StatisticsAction',
  components: { CampaignGroup, AutocompleteSearch, CampaignCustomColumnReport, CampaignSegment },
  props: {
    onSelectItemFilter: Function
  },
  data: function() {
    return {
      reportingType: reportingType,
      rows: Common.Rows,
      selectedRows: Common.DEFAULT_REPORT_FILTER.LIMIT,
      reportType: REPORTING_TYPE_API.PERFORMANCE_REPORT
    }
  },
  methods: {
    onSelectItem(data, type) {
      this.onSelectItemFilter(data, type)
    }
  }
}
