import CampaignDataGrid from './campaign-data-grid/CampaignDataGrid.vue'
import StatisticsAction from './campaign-statistics-action'
import { mockListColumns, mockTableData, mockListDefaultColums } from './mock-data'
import * as cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'ReportingStatistics',
  components: { CampaignDataGrid, StatisticsAction },
  data() {
    return {
      columns: mockListColumns,
      fixedColumnWidth: 'auto',
      expandUniqueValues: [],
      data: mockTableData
    }
  },
  created() {
    this.initData()

    // Handle window resize event
    window.addEventListener('resize', () => {
      this.resizeFixedCol()
    })
  },
  methods: {
    initData() {
      // TO DO: init data
      this.resizeFixedCol()
    },
    onSelectItemFilter(data, type) {
      switch (type) {
        case 'CampaignGroup':
          // TO DO: handle change campaign group event
          break
        case 'CustomColumn':
          data = this.filterData(data, 'value')
          this.renderListColumns(data)
          break
        case 'CampaignSegment':
          // TO DO: handle change campaign segment event
          break
        default:
          break
      }
    },
    filterData(data, key) {
      // Remove duplicate item in data
      return data.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => data[e]).map(e => data[e])
    },
    renderListColumns(data) {
      const listColumns = cloneDeep(mockListDefaultColums)
      data.forEach(item => {
        const column = {
          label: item.label,
          prop: item.value,
          sortable: 'true',
          minWidth: '200px'
        }
        if (item.value === 'bidPrice') {
          column.className = 'price-column'
          column.width = '250px'
          column.isPrice = true
        }
        if (item.value === 'budget') {
          column.width = '250px'
          column.isBudget = true
        }

        listColumns.push(column)
      })
      this.columns = listColumns
    },
    resizeFixedCol() {
      this.columns.forEach(item => {
        if (item.fixed) {
          this.fixedColumnWidth = item.width !== 'auto' ? item.width : this.fixedColumnWidth
          item.width = screen.width < 768 ? 'auto' : this.fixedColumnWidth
        }
      })
    }
  }
}
