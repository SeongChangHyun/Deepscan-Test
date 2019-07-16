import { mockTableColumns } from './mockData'
import AutocompleteSearch from '@/components/AutocompleteSearch'
import { CreativeConstant } from '@/common/constants'
import Pagination from '@/components/Pagination'
import { CreativesManagementMixin } from '../CreativesManagementMixin.js'

export default {
  name: 'ListCreativeController',
  components: { AutocompleteSearch, Pagination },
  mixins: [CreativesManagementMixin],
  data() {
    return {
      columns: mockTableColumns,
      listCreativeResponse: null,
      list_size: [],
      list_status: CreativeConstant.LIST_CREATIVE_STATUS,
      list_creative: ['다이나믹', '다이나믹 1'],
      list_row: CreativeConstant.CI_PAGE_SIZE,
      rowSelected: '20',
      searchValue: '',
      filterSize: '',
      filterStatus: '',
      filterCreative: '',
      keyExpr: 'name',
      displayExpr: 'name',
      selectedCts: [],
      creativeConstant: CreativeConstant,
      limit: 20,
      offset: 0
    }
  },
  computed: {
    filerData() {
      if (!this.listCreativeResponse) return []
      return this.listCreativeResponse.data
    },
    paginationOptions() {
      if (!this.listCreativeResponse) {
        return {
          total: 0
        }
      }
      return {
        total: this.listCreativeResponse.total_count
      }
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
      this.selectedCts = collection.map((item) => {
        return item.creative_id
      })
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
      this.$store.dispatch('creative/deleteCreative', { creative_ids: this.selectedCts })
      this.selectedCts = []
    },
    onActivate() {
      this.$store.dispatch('creative/changeStatusCreative', { creative_ids: this.selectedCts, status: 'active' })
      this.selectedCts = []
    },
    onDeactivate() {
      this.$store.dispatch('creative/changeStatusCreative', { creative_ids: this.selectedCts, status: 'stop' })
      this.selectedCts = []
    },
    getListSizeCreative() {
      this.$store.dispatch('creative/getListSizeCreative')
        .then((response) => {
          this.list_size = response
        })
        .catch((error) => {
          this.showErrorApi(error)
        })
    },
    getListCreative() {
      const params = {
        offset: this.offset,
        limit: this.limit
      }
      this.showLoading()
      this.$store.dispatch('creative/getListCreative', params)
        .then((response) => {
          this.hideLoading()
          this.listCreativeResponse = response
        })
        .catch((error) => {
          this.hideLoading()
          this.showErrorApi(error)
        })
    }
  },
  created() {
    this.getListCreative()
    this.getListSizeCreative()
  }
}
