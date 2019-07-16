import * as cloneDeep from 'lodash/cloneDeep'
import { DefaultColumnReport } from '@/common/businessCustomColumn'
import { BusinessDefaultColumnReport } from '@/common/businessDefaultColumnReport'
import _ from 'lodash'
import {
  CUSTOM_COLUMN_REPORT_TABS,
  DATE_TIME_COLUMN,
  SUCCESS,
  ERROR,
  COLUMN_DEFAULT_OPTION,
  COLUMN_LABEL_VALUE_PREFIX,
  REPORTING_TYPE_API
} from '@/common/constants'

export default {
  name: 'CustomColumnReport',
  props: {
    listItem: {},
    defaultValue: Number,
    onSelectItem: Function,
    type: '',
    reportType: {
      required: false,
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      defaultOption: COLUMN_DEFAULT_OPTION,
      setOfColumns: [],
      listColumns: [],
      defaultColumnReport: DefaultColumnReport,
      arrayItemChildSelected: [],
      tabCategoryColumn: [],
      nameTemplateColumnReport: '',
      isChangeModifyColumn: false,
      isUseNameForTemplateReport: false,
      selectedAll: false,
      indexParent: 0,
      dialogVisible: false,
      columnOrder: 0,
      itemSelected: '',
      allColumns: BusinessDefaultColumnReport
    }
  },
  created() {
    // get dropdown options
    this.loadSetOfColumns()

    // get default columns for data grid
    this.$store.dispatch('campaign/loadDefaultColumns', {
      callback: (error, response) => {
        if (error) {
          this.showMessage(ERROR, 'loadDefaultColumnsFailed')
          return
        }
        const { columns } = response
        if (columns) {
          const defaultColumns = columns.map(col => {
            const columnFormat = _.find(this.allColumns, { key: col.column_name_key })
            return columnFormat
          })
          this.onSelectItem(this.addDateTimeColumn(defaultColumns), this.type)
        }
      }
    })
  },
  methods: {
    addDateTimeColumn(columns) {
      if (this.reportType === REPORTING_TYPE_API.DAILY_REPORT) {
        if (!columns.find(col => col.prop === DATE_TIME_COLUMN.prop)) {
          return [...columns, DATE_TIME_COLUMN]
        }
      }
      return columns
    },
    isCustomOption(item) {
      return item.value === this.defaultOption.value
    },
    formatColumnProp(str) {
      return str.replace(COLUMN_LABEL_VALUE_PREFIX, '')
    },
    loadSetOfColumns() {
      this.$store.dispatch('campaign/loadSetOfColumns', {
        report_type: this.reportType, callback: (error, response) => {
          if (error) {
            this.showMessage(ERROR, 'loadSetOfColumnsFailed')
            return
          }
          const options = response.map(column => {
            return {
              value: column.user_stats_config_id,
              label: column.column_set_name
            }
          })
          options.unshift(this.defaultOption)
          this.setOfColumns = options
        }
      })
    },
    onSelectItemDropDown(item) {
      if (!item) {
        return
      }
      if (item.value === this.defaultOption.value) {
        this.tabCategoryColumn = cloneDeep(this.defaultColumnReport)
        this.dialogVisible = true
        this.getCustomColumnMaterials(0)
      } else {
        this.$store.dispatch('campaign/loadListColumns', {
          id: item.value, callback: (error, result) => {
            if (error) {
              this.showMessage(ERROR, 'loadListColumnsFailed')
              return
            }
            const columns = result.columns.map(col => {
              return {
                label: col.column_name_key,
                prop: this.formatColumnProp(col.column_name_key),
                value: this.formatColumnProp(col.column_name_key)
              }
            })
            this.onSelectItem(this.addDateTimeColumn(columns), this.type)
          }
        })
      }
      this.itemSelectedABC = item.value
    },
    getCustomColumnMaterials(tabIndex) {
      this.$store.dispatch('campaign/loadColumnMaterials', {
        payload: {
          column_type: CUSTOM_COLUMN_REPORT_TABS[tabIndex]
        },
        callback: (error, result) => {
          if (error) {
            this.showMessage(ERROR, 'loadColumnMaterialsFailed')
            return
          }
          this.tabCategoryColumn[tabIndex].children = result.map(re => {
            return {
              ...re,
              value: re.column_name_key,
              label: re.column_name_key,
              isSelected: false,
              parent: tabIndex
            }
          })
        }
      })
    },
    handleClose() {
      if (this.isChangeModifyColumn) {
        this.$confirm('Are you sure to cancel?')
          .then(_ => {
            this.closeDialog()
          })
          .catch(_ => { })
      } else {
        this.closeDialog()
      }
    },
    closeDialog() {
      this.tabCategoryColumn = []
      this.dialogVisible = false
      this.isChangeModifyColumn = false
      this.isUseNameForTemplateReport = false
      this.nameTemplateColumnReport = ''
      this.arrayItemChildSelected = []
    },
    onChangeName(value) {
      this.nameTemplateColumnReport = value
    },
    genI18n(params) {
      return this.$t(`campaignReporting.${params}`)
    },
    showMessage(type, message) {
      this.$message({
        type,
        message: this.genI18n(message)
      })
    },
    applyModifyColumn() {
      // TO DO : Apply
      if (!this.isChangeModifyColumn) {
        this.$alert(this.genI18n('columnsEmpty'), '', {
          confirmButtonText: 'OK'
        })
        return
      }
      if (this.isUseNameForTemplateReport && this.nameTemplateColumnReport === '') {
        this.$alert(this.genI18n('columnsNameEmpty'), '', {
          confirmButtonText: 'OK'
        })
        return
      }

      this.$store.dispatch('campaign/saveSetColumns', {
        payload: {
          report_type: this.reportType,
          column_set_name: this.nameTemplateColumnReport,
          columns: this.arrayItemChildSelected.map((col, index) => {
            return {
              column_id: col.column_id,
              column_name_key: col.value,
              status: 'active',
              order: index
            }
          })
        },
        callback: (error, result) => {
          if (error) {
            this.showMessage(ERROR, 'saveSetOfColumnFailed')
            return
          }
          this.showMessage(SUCCESS, 'saveSetOfColumnSuccess')

          const columns = this.arrayItemChildSelected.map(col => {
            const columnFormat = _.find(this.allColumns, { key: col.column_name_key })
            return columnFormat
          })
          this.onSelectItem(columns, this.type)

          // reset set of columns
          this.loadSetOfColumns()

          // reset form data
          this.tabCategoryColumn = []
          this.dialogVisible = false
          this.isChangeModifyColumn = false
          this.isUseNameForTemplateReport = false
          this.nameTemplateColumnReport = ''
          this.arrayItemChildSelected = []
        }
      })
    },
    updateListColumnSelected() {
      const arrayAllItem = []
      for (var categoryColumnIndex in this.tabCategoryColumn) {
        const itemChild = this.tabCategoryColumn[categoryColumnIndex].children.flat()
        arrayAllItem.push.apply(arrayAllItem, itemChild)
      }
      const arrayItemSelected = arrayAllItem.filter(item => {
        return item.isSelected
      })
      this.arrayItemChildSelected = this.removeDuplicatedColumn(arrayItemSelected, 'value')
      this.isChangeModifyColumn = true
    },
    onRemoveSelectedColumn(item) {
      const indexParent = this.tabCategoryColumn.findIndex(obj => obj.id === item.parent)
      const indexChild = this.tabCategoryColumn[indexParent].children.findIndex(obj => obj.value === item.value)
      this.tabCategoryColumn[indexParent].children[indexChild].isSelected = false
      this.updateListColumnSelected()
    },
    removeDuplicatedColumn(data, key) {
      // Remove duplicate item in data
      return data.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => data[e]).map(e => data[e])
    },
    onSelectAllColumn(indexParent) {
      if (this.selectedAll === true) {
        for (var categoryColumnIndex in this.tabCategoryColumn[indexParent].children) {
          this.tabCategoryColumn[indexParent].children[categoryColumnIndex].isSelected = true
        }
        this.updateListColumnSelected()
      }
      if (indexParent !== this.indexParent) {
        this.selectedAll = false
      }
    },
    clickTab(e) {
      const newIndex = parseInt(e.index)
      this.indexParent = newIndex
      this.selectedAll = false
      this.getCustomColumnMaterials(newIndex)
    },
    onRemove(item) {
      this.$store.dispatch('campaign/deleteSetColumns', {
        id: item.value, callback: (error, result) => {
          if (error) {
            this.showMessage(ERROR, 'deleteSetOfColumnFailed')
            return
          }
          if (result.result === SUCCESS) {
            this.showMessage(SUCCESS, 'deleteSetOfColumnSuccess')
            this.setOfColumns = this.setOfColumns.filter(set => set.value !== item.value)
          }
        }
      })
    }
  }
}
