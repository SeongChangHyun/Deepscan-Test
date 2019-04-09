import { Table, TableColumn } from 'element-ui'
import { CampaignReporting } from '@/common/constants'
import CurrencyInput from '@/components/CurrencyInput'
import Cookies from 'js-cookie'
import { Common } from '@/common/constants'

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
    selectionRelate: {
      type: Boolean,
      default: true
    },
    columnExpand: {
      type: Boolean,
      default: true
    },
    columnExpandIndent: {
      type: Number,
      default: 20
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    customRender: {
      type: Object,
      default() {
        return {}
      }
    },
    expandIcon: {
      type: String,
      default: 'el-icon-caret-bottom'
    },
    collapseIcon: {
      type: String,
      default: 'el-icon-caret-right'
    },
    leafIcon: {
      type: String,
      default: 'el-icon-minus'
    }
  },
  data() {
    return {
      data: [],
      columnExpandWidth: columnExpandWidthInit,
      loadingFullIndex: '',
      campaignStatus: CampaignReporting.CAMPAIGN_STATUS,
      language: Cookies.get('language') || Common.EN_CODE,
      commonConstant: Common
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
      if (
        Object.prototype.toString.call(this.treeData) === '[object Array]' &&
        this.treeData.length
      ) {
        this.data = this.treeToTableData(this.treeData, true)
        this.data = this.addTotalRowData(this.data)
      } else if (
        Object.prototype.toString.call(this.tableData) === '[object Array]' &&
        this.tableData.length
      ) {
        this.data = this.tableData
      }
      this.$emit('init-data', this.data)
    },
    addTotalRowData(data) {
      // TODO: add total row data for table
      const totalRow = {
        campaigns: 'Total: Campaigns',
        type: '',
        bidPrice: '',
        budget: '',
        imp: 0,
        clicks: 0,
        ctr: 0,
        spend: 0,
        ecpm: 0
      }
      for (const item of this.treeData) {
        totalRow.imp += item.imp
        totalRow.clicks += item.clicks
        totalRow.spend += item.spend
        totalRow.ctr += Number(item.ctr.replace('%', ''))
        totalRow.ecpm += item.ecpm
      }
      totalRow.ctr = totalRow.ctr / this.treeData.length + '%'
      totalRow.ecpm = totalRow.ecpm / this.treeData.length
      data.push(totalRow)
      return data
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
      if (row.parent) {
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
    toggleRowSelection(clickRow, selected) {
      for (let i = clickRow.rowIndex, len = this.data.length; i < len; i++) {
        const row = this.data[i]
        if (new RegExp(`^${clickRow.treeFullIndex}`).test(row.treeFullIndex)) {
          this.$refs.treeTable.toggleRowSelection(row, selected)
        } else {
          break
        }
      }
    },
    handleSelect(selection, clickRow) {
      if (this.selectionRelate) {
        this.toggleRowSelection(
          clickRow,
          selection.some(row => row.treeFullIndex === clickRow.treeFullIndex)
        )
      }
      this.$emit('select', selection, clickRow)
    },
    cloneArr(array) {
      const dup_array = []
      for (var i = 0; i < array.length; ++i) {
        dup_array[i] = array[i]
      }
      return dup_array
    },
    handleSort(sortData) {
      if (sortData.order === 'ascending') {
        const ascendingData = this.cloneArr(this.treeData)
        ascendingData.sort((a, b) => (a[sortData.prop] > b[sortData.prop]) ? 1 : ((b[sortData.prop] > a[sortData.prop]) ? -1 : 0))
        this.data = this.treeToTableData(ascendingData, true)
        this.data = this.addTotalRowData(this.data)
      } else if (sortData.order === 'descending') {
        const descendingData = this.cloneArr(this.treeData)
        descendingData.sort((a, b) => (a[sortData.prop] < b[sortData.prop]) ? 1 : ((b[sortData.prop] < a[sortData.prop]) ? -1 : 0))
        this.data = this.treeToTableData(descendingData, true)
        this.data = this.addTotalRowData(this.data)
      } else {
        this.initData()
      }
    },
    handleSelectionChange(value) {
      // TO DO: handle campaign selection change
    },
    getClassByStatus(status) {
      let className = ''
      switch (status) {
        case this.campaignStatus.STANDBY:
          className = 'standby'
          break
        case this.campaignStatus.ENABLED:
          className = 'enabled'
          break
        case this.campaignStatus.PAUSED:
          className = 'paused'
          break
        default:
          className = 'disabled'
          break
      }
      return className
    },
    getListStatus(status) {
      let listStatus = []
      switch (status) {
        case this.campaignStatus.STANDBY:
          listStatus = [this.campaignStatus.ENABLED, this.campaignStatus.DISABLED]
          break
        case this.campaignStatus.ENABLED:
          listStatus = [this.campaignStatus.PAUSED]
          break
        default:
          listStatus = [this.campaignStatus.ENABLED]
          break
      }
      return listStatus
    },
    onChangeBudget(type, index, value) {
      if (type === 'budget') {
        this.data[index].budget = value
      }
      if (type === 'bidPrice') {
        this.data[index].bidPrice = value
      }
    },
    getCurrencyType() {
      let currencyType
      switch (this.language) {
        case this.commonConstant.KO_CODE:
          currencyType = this.commonConstant.WON_TYPE
          break
        case this.commonConstant.EN_CODE:
          currencyType = this.commonConstant.DOLLAR_TYPE
          break
        default:
          currencyType = this.commonConstant.YEN_TYPE
          break
      }
      return currencyType
    },
    goToCreativeLink(id) {
      this.$router.push({ path: `/campaign/reporting/creative-link?campaign_id=${id}` })
    }
  }
}
