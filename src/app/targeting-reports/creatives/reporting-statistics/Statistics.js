import TargetingDataGrid from './targeting-data-grid/TargetingDataGrid.vue'
import StatisticsAction from './targeting-statistics-action'
import { mockTableData } from '@/mock/data/targeting-reports'
import { Common, CampaignReporting } from '@/common/constants'
import * as cloneDeep from 'lodash/cloneDeep'
import { remove } from 'lodash'

export default {
  name: 'ReportingStatistics',
  components: { TargetingDataGrid, StatisticsAction },
  data() {
    return {
      columns: [],
      fixedColumnWidth: Common.AUTO_VALUE,
      expandUniqueValues: [],
      tableData: mockTableData,
      componentKey: 0,
      rows: Common.Rows,
      rowsSelected: Common.Rows[0]
    }
  },
  created() {
    this.initData()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    initData() {
      this.renderListColumns(this.tableData[0])
    },
    getLabelFromValue(value) {
      if (typeof value !== 'string') return ''
      const label = value.charAt(0).toUpperCase() + value.slice(1)
      return label.replace('_', ' ')
    },
    renderListColumns(data) {
      if (!data) {
        return
      }
      this.columns = []
      for (const item in data) {
        const itemLabel = data[item].label ? data[item].label : this.getLabelFromValue(item)
        const itemProp = data[item].value ? data[item].value : item
        const column = cloneDeep(CampaignReporting.defaultColumn)
        column.label = itemLabel
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
      // TO DO: handle change segments
    },
    filterData(data, key) {
      // Remove duplicate item in data
      return data.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => data[e]).map(e => data[e])
    },
    filterGridData() {
      // TO DO: handle filter grid data
    }
  }
}
