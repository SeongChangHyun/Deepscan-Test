import { Table, TableColumn } from 'element-ui'
import { CampaignReporting, Common } from '@/common/constants'
import CurrencyInput from '@/components/CurrencyInput'
import Cookies from 'js-cookie'

const columnExpandWidthInit = 20

export default {
  name: 'ElTreeTable',
  components: { 'el-table': Table, 'el-table-column': TableColumn, CurrencyInput },
  inheritAttrs: false,
  props: {
    treeChildrenKey: { type: String, default: 'children' },
    treeChildrenCountKey: { type: String, default: 'children_count' },
    treeData: {},
    tableData: {},
    expandAll: {
      type: Boolean,
      default: false
    },
    expandUniqueValues: {
      type: Array,
      default() {
        return []
      }
    },
    columnSelectionWidth: {
      type: Number,
      default: 55
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      data: [],
      columnExpandWidth: Common.ColumnExpandWidth,
      loadingFullIndex: '',
      language: Cookies.get('language') || Common.EN_CODE,
      commonConstant: Common,
      columnsKey: CampaignReporting.COLUMN_KEY,
      gridType: CampaignReporting.DATA_LEVEL.Campaigns,
      gridMaxHeight: Common.GRID_MAX_HEIGHT
    }
  },
  watch: {
    treeData: {
      handler() {
        this.initData()
      },
      immediate: true
    },
    tableData: {
      handler() {
        this.initData()
      },
      immediate: true
    }
  },
  methods: {
    loadingIcon(row) {
      return (
        this.loadingFullIndex && this.loadingFullIndex === row.treeFullIndex
      )
    },
    expand(row) {
      return (
        this.expandAll ||
        this.expandUniqueValues.indexOf(row.treeFullIndex) !== -1
      )
    },
    getParent(row) {
      const treeFullIndex = String(row.treeFullIndex)
      const parentFullIndex = treeFullIndex.replace(/-?\d$/, '')
      if (parentFullIndex) {
        return this.data.find(
          iterateRow => String(iterateRow.treeFullIndex) === parentFullIndex
        )
      } else {
        return this.treeData
      }
    },
    getExpandRows() {
      if (
        Object.prototype.toString.call(this.data) === '[object Array]' &&
        this.data.length
      ) {
        return this.data.filter(row => row.treeExpand)
      }
      return []
    },
    initData() {
      if (!this.data) {
        return
      }
      if (
        Object.prototype.toString.call(this.treeData) === '[object Array]' &&
        this.treeData.length
      ) {
        this.data = this.treeToTableData(this.treeData, true)
      } else if (
        Object.prototype.toString.call(this.tableData) === '[object Array]' &&
        this.tableData.length
      ) {
        this.data = this.tableData
      }
      this.$emit('init-data', this.data)
    },
    treeToTableData(
      from,
      show,
      to = [],
      fullIndex = '',
      level = 0,
      maxLevelShow = 0
    ) {
      if (
        Object.prototype.toString.call(from) === '[object Array]' &&
        from.length
      ) {
        for (let i = 0, len = from.length; i < len; i++) {
          const row = from[i]
          to.push(row)
          this.$set(row, 'rowIndex', to.length)
          const treeExpand = this.expand(row)
          if (level === 0) {
            fullIndex = ''
          } else {
            if (i) {
              fullIndex = String(fullIndex).replace(/\d$/, '')
            }
          }
          fullIndex = `${fullIndex}${i}`
          this.$set(row, 'treeFullIndex', fullIndex)
          this.$set(row, 'treeLevel', level)
          this.$set(row, 'treeExpand', treeExpand)
          this.$set(row, 'rowShow', show)
          this.$set(
            row,
            'treeHasChildren',
            Boolean(row[this.treeChildrenCountKey])
          )
          if (level > maxLevelShow && show) {
            maxLevelShow = level
            this.columnExpandWidth =
              columnExpandWidthInit + maxLevelShow * this.columnExpandIndent
          }
          const children = row[this.treeChildrenKey]
          if (
            Object.prototype.toString.call(children) === '[object Array]' &&
            children.length
          ) {
            this.$set(row, 'treeHasChildren', true)
            this.treeToTableData(
              children,
              treeExpand,
              to,
              `${fullIndex}-`,
              level + 1,
              maxLevelShow
            )
          }
        }
      }
      return to
    },
    tableRowClassName({ row }) {
      if (row.children || row.campaign_name) {
        return 'parent-row'
      }
      return 'el-children-row'
    },
    getRowStyle({ row }) {
      return row.rowShow === false ? 'display:none;' : ''
    },
    toggleExpand(clickRow) {
      this.$set(clickRow, 'treeExpand', !clickRow.treeExpand)
      let maxLevelShow = clickRow.treeLevel
      let continueTest = null
      for (let i = 0, len = this.data.length; i < len; i++) {
        const row = this.data[i]
        if (row.treeFullIndex !== clickRow.treeFullIndex) {
          if (continueTest && continueTest.test(row.treeFullIndex)) {
            continue
          } else if (
            new RegExp(`^${clickRow.treeFullIndex}`).test(row.treeFullIndex)
          ) {
            this.$set(row, 'rowShow', clickRow.treeExpand)

            continueTest = null
            if (clickRow.treeExpand && row.treeHasChildren && !row.treeExpand) {
              continueTest = new RegExp(`^${row.treeFullIndex}`)
            }
          }
          if (row.treeLevel > maxLevelShow && row.rowShow) {
            maxLevelShow = row.treeLevel
          }
        }
      }

      this.columnExpandWidth =
        columnExpandWidthInit + maxLevelShow * this.columnExpandIndent

      this.$emit('toggle-expand', clickRow)
    },
    cloneArr(array) {
      const dupArray = []
      for (var i = 0; i < array.length; ++i) {
        dupArray[i] = array[i]
      }
      return dupArray
    },
    handleSort(sortData) {
      if (sortData.order === 'ascending') {
        const ascendingData = this.cloneArr(this.treeData)
        ascendingData.sort((a, b) => (a[sortData.prop] > b[sortData.prop]) ? 1 : ((b[sortData.prop] > a[sortData.prop]) ? -1 : 0))
        this.data = this.treeToTableData(ascendingData, true)
      } else if (sortData.order === 'descending') {
        const descendingData = this.cloneArr(this.treeData)
        descendingData.sort((a, b) => (a[sortData.prop] < b[sortData.prop]) ? 1 : ((b[sortData.prop] < a[sortData.prop]) ? -1 : 0))
        this.data = this.treeToTableData(descendingData, true)
      } else {
        this.initData()
      }
    }
  }
}
