
import Pagination from '@/components/Pagination'
import { CreativeConstant } from '@/common/constants'
import FiltersAction from './components/grid-ci-filters-action'
import { mockTableColumns } from '@/mock/data/listCi'

export default {
  name: 'ListCIController',
  components: { FiltersAction, Pagination },
  data() {
    return {
      statusFilter: '',
      sizeFilter: '',
      searchValue: '',
      columns: mockTableColumns,
      selectedCis: []
    }
  },
  methods: {
    handleSelectionChange(collection) {
      this.selectedCis = collection
    },
    onDelete() {
      this.$store.dispatch('creative/deleteCreativeImages', this.selectedCis)
      this.selectedCis = []
    },
    onActivate() {
      this.$store.dispatch('creative/activateCreativeImages', this.selectedCis)
      this.selectedCis = []
    },
    onDeactivate() {
      this.$store.dispatch('creative/deactivateCreativeImages', this.selectedCis)
      this.selectedCis = []
    },
    onSelectStatus(status) {
      this.statusFilter = status
    },
    onSearchResult(item) {
      this.searchValue = item.name
    },
    onSelectSize(size) {
      this.sizeFilter = size
    },
    onResetFilter(event) {
      event.preventDefault()
      this.sizeFilter = ''
      this.statusFilter = ''
    },
    getStatusStyle(ci) {
      switch (ci.status) {
        case CreativeConstant.CI_STATUS.ENABLE:
          return { color: CreativeConstant.CI_STATUS_COLOR.ENABLE }
        case CreativeConstant.CI_STATUS.STOP:
          return { color: CreativeConstant.CI_STATUS_COLOR.STOP }
        default:
          return { color: CreativeConstant.CI_STATUS_COLOR.DEFAULT }
      }
    }
  },
  computed: {
    originalListCi() {
      let listCi = this.$store.state.creative.listCi
      const filterByField = (field, value) => {
        if (value && value !== 'all') {
          listCi = listCi.filter(ci => ci[field].toLowerCase() === value)
        }
      }
      filterByField('status', this.statusFilter)
      filterByField('size', this.sizeFilter)
      return listCi
    },
    listCi() {
      let listCi = this.originalListCi
      if (this.searchValue) {
        listCi = listCi.filter(ci => ci.name === this.searchValue)
      }
      return listCi
    },
    imageSizes() {
      return this.$store.state.creative.imageSizes
    },
    filterBySizeOptions() {
      const options = [{ value: CreativeConstant.CI_SIZE.ALL.toLowerCase(), label: CreativeConstant.CI_SIZE.ALL }]
      options.push(...this.imageSizes.map(imgSize => ({ value: imgSize, label: imgSize })))
      return options
    },
    isShownButton() {
      return this.listCi.length > 0
    },
    isDisabledButton() {
      return this.selectedCis.length === 0
    },
    paginationOptions() {
      return {
        total: this.listCi.length,
        pageSizes: CreativeConstant.CI_PAGE_SIZE
      }
    }
  },
  created() {
    this.$store.dispatch(`creative/getCreativeImages`)
    this.$store.dispatch(`creative/getImageSizesByAccount`)
  },
  mounted() {

  }
}
