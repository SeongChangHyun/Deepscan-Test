import { mockTableColumns } from './mockData'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { CreativeConstant } from '@/common/constants'
export default {
  name: 'ListCreativeController',
  components: { AutocompleteSearch },
  data() {
    return {
      columns: mockTableColumns,
      tableData: this.$store.state.creative.listCreative,
      list_size: ['000x000', '000x001', '000x002', '000x003'],
      list_status: ['active', 'deactive'],
      list_creative: ['다이나믹', '다이나믹 1'],
      searchValue: '',
      filterSize: '',
      filterStatus: '',
      filterCreative: '',
      keyExpr: 'name',
      displayExpr: 'name',
      selectedCts: []
    }
  },
  computed: {
    filerData() {
      return this.listCreative.filter((v, k) => (!this.filterSize || v.size === this.filterSize) &&
        (!this.filterStatus || v.status === this.filterStatus) &&
        (!this.filterCreative || v.type === this.filterCreative) &&
        (!this.searchValue || v.name.toLowerCase().replace(' ', '').includes(this.searchValue.toLowerCase().replace(' ', ''))))
    },
    listCreative() {
      return this.$store.state.creative.listCreative
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
    handleSelectionChange(collection) {
      this.selectedCts = collection
    },
    getStatusStyle(ci) {
      switch (ci.status) {
        case CreativeConstant.CREATIVE_STATUS.ACTIVE:
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.ACTIVE }
        case CreativeConstant.CREATIVE_STATUS.STAND_BY:
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.STAND_BY }
        case CreativeConstant.CREATIVE_STATUS.PAUSED:
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.PAUSED }
        case CreativeConstant.CREATIVE_STATUS.DISABLED:
          return { color: CreativeConstant.CREATIVE_STATUS_COLOR.DISABLED }
      }
    },
    onDelete() {
      this.$store.dispatch('creative/deleteCreative', this.selectedCts)
      this.selectedCts = []
    },
    onActivate() {
      this.$store.dispatch('creative/activateCreative', this.selectedCts)
      this.selectedCts = []
    },
    onDeactivate() {
      this.$store.dispatch('creative/deactivateCreative', this.selectedCts)
      this.selectedCts = []
    }
  },
  created() {
    this.$store.dispatch(`creative/getListCreative`)
  }
}
