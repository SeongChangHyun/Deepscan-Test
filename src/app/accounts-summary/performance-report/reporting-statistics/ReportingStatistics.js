import PerformanceDataGrid from './performance-data-grid/PerformanceDataGrid.vue'
import StatisticsAction from './performance-statistics-action'
import { mockAccountData, mockCampaignData, mockAdGroupData } from '@/mock/data/performanceReporting'
import { Common, CampaignReporting } from '@/common/constants'
import * as cloneDeep from 'lodash/cloneDeep'
import { remove } from 'lodash'

export default {
  name: 'ReportingStatistics',
  components: { PerformanceDataGrid, StatisticsAction },
  props: {
    filterParams: {
      type: Object,
      default: {}
    },
    tableData: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      columns: [],
      fixedColumnWidth: Common.AUTO_VALUE,
      expandUniqueValues: [],
      componentKey: 0
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.renderListColumns(this.tableData[0])
    },
    renderListColumns(data) {
      if (!data) {
        return
      }
      this.columns = []
      for (const item in data) {
        const itemProp = data[item].value ? data[item].value : item
        const column = cloneDeep(CampaignReporting.defaultColumn)
        column.prop = itemProp
        let allowPushColumn = true
        if ([CampaignReporting.COLUMN_KEY.Parent, CampaignReporting.COLUMN_KEY.Children, CampaignReporting.COLUMN_KEY.RowIndex,
          CampaignReporting.COLUMN_KEY.TreeFullIndex, CampaignReporting.COLUMN_KEY.TreeLevel, CampaignReporting.COLUMN_KEY.TreeExpand,
          CampaignReporting.COLUMN_KEY.RowShow, CampaignReporting.COLUMN_KEY.TreeHasChildren].indexOf(itemProp) !== -1) {
          allowPushColumn = false
        }
        if (itemProp === CampaignReporting.COLUMN_KEY.CampaignName || itemProp === CampaignReporting.COLUMN_KEY.AccountName) {
          column.fixed = Common.LEFT_VALUE
          column.className = Common.FIXED_COLUMN_CLASS
        }
        if (allowPushColumn) {
          this.columns.push(column)
        }
      }
      this.columns = remove(this.columns, item => item.prop)
      this.columns = this.filterData(this.columns, 'prop')
    },
    onSelectItemFilter(data, type) {
      switch (type) {
        case CampaignReporting.FILTER_CASE.CampaignGroup:
          if (!data[0]) {
            return
          }
          this.filterParams.stats_by = data[0]
          if (data[0] === CampaignReporting.DATA_LEVEL.Accounts) {
            this.tableData = mockAccountData
          }
          if (data[0] === CampaignReporting.DATA_LEVEL.Campaigns) {
            this.tableData = mockCampaignData
          }
          if (data[0] === CampaignReporting.DATA_LEVEL.AdGroups) {
            this.tableData = mockAdGroupData
          }
          this.renderListColumns(this.tableData[0])
          break
        case CampaignReporting.FILTER_CASE.CustomColumn:
          data = this.filterData(data, 'value')
          this.renderListColumns(Object.assign({}, data))
          break
        case CampaignReporting.FILTER_CASE.CampaignSegment:
          this.filterParams.segment = data[data.length - 1]
          break
        case CampaignReporting.FILTER_CASE.Rows:
          this.filterParams.limit = data
          break
        default:
          break
      }
      this.$emit('changeFilterParams', this.filterParams)
    },
    filterData(data, key) {
      // Remove duplicate item in data
      return data.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => data[e]).map(e => data[e])
    },
    onRowsChange() {
      this.$emit('changeFilterParams', this.filterParams)
    },
    changePage(page) {
      this.filterParams.offset = this.filterParams.limit * (page - 1)
      this.$emit('changeFilterParams', this.filterParams)
    }
  }
}
