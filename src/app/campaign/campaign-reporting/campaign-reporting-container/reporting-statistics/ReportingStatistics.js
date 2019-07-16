import CampaignDataGrid from './campaign-data-grid/CampaignDataGrid.vue'
import StatisticsAction from './campaign-statistics-action'
import { mockAccountData, mockCampaignData, mockAdGroupData } from '@/mock/data/campaignReporting'
import * as cloneDeep from 'lodash/cloneDeep'
import { remove } from 'lodash'
import { Common, CampaignReporting } from '@/common/constants'

export default {
  name: 'ReportingStatistics',
  components: { CampaignDataGrid, StatisticsAction },
  data() {
    return {
      columns: [],
      fixedColumnWidth: Common.AUTO_VALUE,
      expandUniqueValues: [],
      data: mockCampaignData,
      componentKey: 0,
      listDefaultColumns: [CampaignReporting.statusColumn, CampaignReporting.campaignsColumn],
      creativeDefaultColumns: [CampaignReporting.statusColumn, CampaignReporting.campaignsColumn, CampaignReporting.expandColumn, CampaignReporting.creativeTypeColumn],
      segment: CampaignReporting.SEGMENT_TYPE.CREATIVE
    }
  },
  created() {
    this.initData()
    // Handle window resize event
    window.addEventListener('resize', () => {
      this.resizeFixedCol()
    })
  },
  computed: {
    lang() {
      return this.$store.getters.language
    }
  },
  watch: {
    lang() {
      this.componentKey += 1
    }
  },
  methods: {
    initData() {
      this.renderListColumns(this.data[0], CampaignReporting.DATA_LEVEL.Campaigns)
      this.resizeFixedCol()
    },
    onSelectItemFilter(data, type) {
      switch (type) {
        case CampaignReporting.FILTER_CASE.CampaignGroup:
          if (!data[0]) {
            return
          }
          if (data[0] === CampaignReporting.DATA_LEVEL.Accounts) {
            this.data = mockAccountData
          }
          if (data[0] === CampaignReporting.DATA_LEVEL.Campaigns) {
            this.data = mockCampaignData
          }
          if (data[0] === CampaignReporting.DATA_LEVEL.AdGroups) {
            this.data = mockAdGroupData
          }
          this.renderListColumns(this.data[0], data[0])
          break
        case CampaignReporting.FILTER_CASE.CustomColumn:
          data = this.filterData(data, 'value')
          this.renderListColumns(Object.assign({}, data), CampaignReporting.DATA_LEVEL.Campaigns)
          break
        case CampaignReporting.FILTER_CASE.CampaignSegment:
          if (data.indexOf(CampaignReporting.SEGMENT_TYPE.CREATIVE) > -1) {
            this.segment = CampaignReporting.SEGMENT_TYPE.CREATIVE
            this.renderListColumns(this.data[0], CampaignReporting.DATA_LEVEL.Campaigns)
          } else {
            this.segment = data[0] ? data[0] : CampaignReporting.SEGMENT_TYPE.NONE
            this.columns = remove(this.columns, item => item.prop !== CampaignReporting.COLUMN_KEY.CreativeType)
            this.columns = remove(this.columns, item => item.prop !== CampaignReporting.COLUMN_KEY.Expand)
          }
          break
        default:
          break
      }
    },
    filterData(data, key) {
      // Remove duplicate item in data
      return data.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => data[e]).map(e => data[e])
    },
    getLabelFromValue(value) {
      if (typeof value !== 'string') return ''
      const label = value.charAt(0).toUpperCase() + value.slice(1)
      return label.replace('_', ' ')
    },
    renderListColumns(data, type) {
      if (!data) {
        return
      }
      if (type !== CampaignReporting.DATA_LEVEL.Campaigns) {
        this.columns = []
      } else {
        if (this.segment === CampaignReporting.SEGMENT_TYPE.CREATIVE) {
          this.columns = cloneDeep(this.creativeDefaultColumns)
        } else {
          this.columns = cloneDeep(this.listDefaultColumns)
        }
      }
      for (const item in data) {
        let column = cloneDeep(CampaignReporting.defaultColumn)
        column.label = itemLabel
        column.prop = itemProp
        let allowPushColumn = true
        const itemLabel = data[item].label ? data[item].label : this.getLabelFromValue(item)
        const itemProp = data[item].value ? data[item].value : item
        switch (itemProp) {
          case CampaignReporting.COLUMN_KEY.Campaigns:
          case CampaignReporting.COLUMN_KEY.CreativeType:
          case CampaignReporting.COLUMN_KEY.Parent:
          case CampaignReporting.COLUMN_KEY.Status:
          case CampaignReporting.COLUMN_KEY.Children:
          case CampaignReporting.COLUMN_KEY.RowIndex:
          case CampaignReporting.COLUMN_KEY.TreeFullIndex:
          case CampaignReporting.COLUMN_KEY.TreeLevel:
          case CampaignReporting.COLUMN_KEY.TreeExpand:
          case CampaignReporting.COLUMN_KEY.RowShow:
          case CampaignReporting.COLUMN_KEY.TreeHasChildren:
            allowPushColumn = false
            break
          case CampaignReporting.COLUMN_KEY.BidPrice:
            column = CampaignReporting.bidPriceColumn
            break
          case CampaignReporting.COLUMN_KEY.Budget:
            column = CampaignReporting.budgetColumn
            break
          default:
            break
        }
        if (allowPushColumn) {
          this.columns.push(column)
        }
      }
      this.columns = remove(this.columns, item => item.prop)
      this.columns = this.filterData(this.columns, 'prop')
    },
    resizeFixedCol() {
      this.columns.forEach(item => {
        if (item.fixed) {
          this.fixedColumnWidth = item.width !== Common.AUTO_VALUE ? item.width : this.fixedColumnWidth
          item.width = screen.width < 768 ? Common.AUTO_VALUE : this.fixedColumnWidth
        }
      })
    }
  }
}
