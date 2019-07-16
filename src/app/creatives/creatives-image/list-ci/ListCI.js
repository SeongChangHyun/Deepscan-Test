import Pagination from '@/components/Pagination'
import { Common, CreativeConstant } from '@/common/constants'
import FiltersAction from './components/grid-ci-filters-action'
import { mockTableColumns } from '@/mock/data/listCi'

export default {
  name: 'ListCIController',
  components: { FiltersAction, Pagination },
  data() {
    return {
      listCiData: [],
      listCiId: [],
      listCiName: [],
      groupCiId: {},
      groupCiName: {},
      searchResult: [],
      ciStatus: '',
      currentPage: 1,
      numOfRow: 30,
      numPageMobile: 3,
      numPagePC: 5,
      deviceWidth: 0,
      checkStatus: 'status',
      checkBoxColumnWidth: 50,
      statusFilter: '',
      sizeFilter: '',
      searchValue: [],
      columns: mockTableColumns,
      selectedCis: [],
      listRow: [{ key: '30 rows', value: 30 }, { key: '20 rows', value: 20 }, { key: '10 rows', value: 10 }],
      rowSelected: '30 rows',
      CreativeConstant
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.$store.dispatch(`creative/getCreativeImages`)
    this.$store.dispatch(`creative/getImageSizesByAccount`)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
  },
  methods: {
    handleResize() {
      this.deviceWidth = window.innerWidth
    },
    handleSelectionChange(collection) {
      this.selectedCis = collection
      this.ciStatus = collection[collection.length - 1].status
    },
    onCreate() {
      this.$router.push('/creatives/create-ci')
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
    onSelectSize(size) {
      this.sizeFilter = size
    },
    onResetFilter(event) {
      event.preventDefault()
      this.sizeFilter = ''
      this.statusFilter = ''
    },
    onSelectNumRow(value) {
      this.numOfRow = value
      if (this.numOfRow * this.currentPage > this.originalListCi.length) {
        this.currentPage = 1
      }
    },
    handlePagging(value) {
      this.currentPage = value.page
      this.numOfRow = value.limit
    },
    showSearchResult(value) {
      this.searchValue = value
    },
    getStatusStyle(ci) {
      switch (ci.status) {
        case CreativeConstant.CI_STATUS.ENABLE:
          return { color: CreativeConstant.CI_STATUS_COLOR.ENABLE }
        case CreativeConstant.CI_STATUS.STOP:
          return { color: CreativeConstant.CI_STATUS_COLOR.STOP }
        case CreativeConstant.CI_STATUS.DISABLE:
          return { color: CreativeConstant.CI_STATUS_COLOR.DISABLE }
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
      if (this.searchValue.length > 0) {
        listCi = listCi.filter(ci => this.searchValue.indexOf(ci.name) > -1 || this.searchValue.indexOf(ci.id) > -1)
      }
      return listCi
    },
    listCi() {
      this.listCiData = []
      const listCi = this.$store.state.creative.listCi
      for (var i = 0; i < listCi.length; i++) {
        var ciId = {}
        var ciName = {}
        ciId.id = i
        ciId.label = listCi[i].id
        ciId.value = listCi[i].id
        this.listCiId.push(ciId)
        ciName.id = i
        ciName.label = listCi[i].name
        ciName.value = listCi[i].name
        this.listCiName.push(ciName)
      }
      this.groupCiId.label = 'CI id'
      this.groupCiId.option = this.listCiId
      this.groupCiName.label = 'CI Name'
      this.groupCiName.option = this.listCiName
      this.listCiData.push(this.groupCiId, this.groupCiName)
      return this.listCiData
    },
    imageSizes() {
      return this.$store.state.creative.imageSizes
    },
    filterBySizeOptions() {
      const options = [{ value: CreativeConstant.CI_SIZE.ALL.toLowerCase(), label: CreativeConstant.CI_SIZE.All_LABEL }]
      options.push(...this.imageSizes.map(imgSize => ({ value: imgSize, label: imgSize })))
      return options
    },
    isShownButton() {
      return this.originalListCi.length > 0
    },
    isDisabledButton() {
      return this.selectedCis.length === 0
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.numOfRow
      const end = start + this.numOfRow
      return this.originalListCi.slice(start, end)
    },
    paginationOptions() {
      return {
        total: this.originalListCi.length,
        pagerCount: (this.deviceWidth < Common.DEVICE_WIDTH.MOBILE) ? this.numPageMobile : this.numPagePC,
        limit: this.numOfRow,
        page: this.currentPage
      }
    }
  }
}
