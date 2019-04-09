import CampaignGroup from '@/components/ReportingGridFilter/campaign-group'
import CampaignCustomColumnReport from '@/components/ReportingGridFilter/campaign-custom-column-report'
import CampaignSegment from '@/components/ReportingGridFilter/campaign-segment'
import AutocompleteSearch from '@/components/AutocompleteSearch'

export default {
  name: 'StatisticsAction',
  components: { CampaignGroup, AutocompleteSearch, CampaignCustomColumnReport, CampaignSegment },
  props: {
    onSelectItemFilter: Function
  },
  data: function() {
    return {
      searchSource: [
        {
          data: {
            key: 'pepsi',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: 'Pepsi'
            }
          }
        },
        {
          data: {
            key: 'coca',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: 'Coca cola'
            }
          }
        },
        {
          data: {
            key: '7up',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: '7up'
            }
          }
        },
        {
          data: {
            key: 'fanta',
            type: 'drink',
            detail: {
              group: 'gas drink',
              name: 'Fanta'
            }
          }
        }
      ],
      keyExpr: 'data.key',
      displayExpr: 'data.detail.name',
      campgaingGroups: [
        {
          value: 'campaignReporting.reportingAction.accounts',
          label: 'campaignReporting.reportingAction.accounts'
        },
        {
          value: 'campaignReporting.reportingAction.campaigns',
          label: 'campaignReporting.reportingAction.campaigns'
        },
        {
          value: 'campaignReporting.reportingAction.adGroupd',
          label: 'campaignReporting.reportingAction.adGroupd'
        }
      ],
      customColumnReports: [],
      segments: []
    }
  },
  methods: {
    onSearchResult(result) {
      // TO DO: search
    },
    onSelectItem(data, type) {
      this.onSelectItemFilter(data, type)
    }
  }
}
