export default {
  name: 'DataGrid',
  props: {
    columns: {
      type: Array,
      required: true
    },
    dailyReports: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expandRow: ''
    }
  },

  methods: {
    sort(sortData) {
      this.$emit('handle-sort', sortData)
    },
    tableRowClassName({ row }) {
      if (row.isParent) {
        return ''
      }
      return 'children-level'
    },
    toggleExpanded(clickRow) {
      // expand/collapse icon
      this.dailyReports.forEach(report => {
        if (report.campaign_id === clickRow.campaign_id) {
          report.expanded = !report.expanded
        } else {
          report.expanded = false
        }
      })
      // add/remove children
      if (this.expandRow === clickRow.campaign_id) {
        this.$emit('remove-children', clickRow)
        this.expandRow = ''
      } else {
        this.$emit('add-children', clickRow)
        this.expandRow = clickRow.campaign_id
      }
    }
  }
}
