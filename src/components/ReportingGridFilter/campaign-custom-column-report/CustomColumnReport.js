import { DefaultColumnReport } from '@/common/businessCustomColumn'
import * as cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'CustomColumnReport',
  props: {
    listItem: {},
    defaultValue: Number,
    onSelectItem: Function,
    type: ''
  },
  data() {
    return {
      defaultColumnReport: DefaultColumnReport,
      arrayItemChildSelected: [],
      tabCategoryColumn: [],
      nameTemplateColumnReport: '',
      isChangeModifyColumn: false,
      isUseNameForTemplateReport: false,
      mainOptions: [
        {
          value: 'modifycolumns',
          label: 'Modify columns'
        },
        {
          value: 'custom',
          label: 'Custom'
        },
        {
          value: '180308',
          label: '180308'
        }
      ],
      dialogVisible: false,
      itemSeleted: ['custom']
    }
  },
  methods: {
    onSeletecItemDropdown(item) {
      if (item[0] === 'modifycolumns') {
        this.tabCategoryColumn = cloneDeep(this.defaultColumnReport)
        this.dialogVisible = true
      }
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
    applyModifyColumn() {
      // TO DO : Apply
      if (!this.isChangeModifyColumn) {
        this.$alert(this.$t('campaignReporting.columnsEmpty'), '', {
          confirmButtonText: 'OK'
        })
        return
      }
      if (this.isChangeModifyColumn) {
        if (this.isUseNameForTemplateReport && this.nameTemplateColumnReport === '') {
          this.$alert(this.$t('campaignReporting.columnsNameEmpty'), '', {
            confirmButtonText: 'OK'
          })
          return
        }
      }

      this.onSelectItem(this.arrayItemChildSelected, this.type)

      this.tabCategoryColumn = []
      this.dialogVisible = false
      this.isChangeModifyColumn = false
      this.isUseNameForTemplateReport = false
      this.nameTemplateColumnReport = ''
      this.arrayItemChildSelected = []
    },
    onColumnSelected(indexChildren, indexParent, isDefault) {
      if (isDefault) {
        return
      }

      this.tabCategoryColumn[indexParent].children[indexChildren].isSelected = !this.tabCategoryColumn[indexParent].children[indexChildren].isSelected
      this.updateListColumnSelected()
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
      for (var categoryColumnIndex in this.tabCategoryColumn[indexParent].children) {
        this.tabCategoryColumn[indexParent].children[categoryColumnIndex].isSelected = true
      }
      this.updateListColumnSelected()
    }
  }
}
