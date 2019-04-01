import { mockTableColumns, mockTableData } from './mockData'
import AutocompleteSearch from '@/components/AutocompleteSearch'
export default {
  name: 'ListCreativeController',
  components: { AutocompleteSearch },
  data() {
    return {
      columns: mockTableColumns,
      tableData: mockTableData,
      list_size: ['000x000', '000x001', '000x002', '000x003'],
      list_status: ['active', 'deactive'],
      list_creative: ['다이나믹', '다이나믹 1'],
      searchValue: '',
      filterSize: '',
      filterStatus: '',
      filterCreative: '',
      keyExpr: 'name',
      displayExpr: 'name'
    }
  },
  computed: {
    filerData() {
      return this.tableData.filter((v, k) => (!this.filterSize || v.size === this.filterSize) &&
        (!this.filterStatus || v.status === this.filterStatus) &&
        (!this.filterCreative || v.type === this.filterCreative) &&
        (!this.searchValue || v.name.toLowerCase().replace(' ', '').includes(this.searchValue.toLowerCase().replace(' ', ''))))
    }
  },
  watched: {
  },
  methods: {
    toCreate() {
      this.$router.push('/creatives/create-creative')
    },
    onSearchResult(result) {
      this.searchValue = result.name
    },
    onReset() {
      this.filterSize = ''
      this.filterStatus = ''
      this.filterCreative = ''
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    handleSelectionChange() {

    }
  }
}
