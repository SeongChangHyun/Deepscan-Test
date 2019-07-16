import StatisticsAction from './targeting-statistics-action/TargetingStatisticsAction.vue'
import Pagination from '@/components/Pagination'
import { mockTableUserInterestColumns } from '@/mock/data/targeting-reports'
import { Common } from '@/common/constants'
import { mapGetters } from 'vuex'
export default {
  name: 'Statistics',
  components: { StatisticsAction, Pagination },
  data() {
    return {
      fixColumnLabel: ['criteria_1', 'criteria_2'],
      tableData: [],
      data: [],
      columns: mockTableUserInterestColumns,
      deviceWidth: 0,
      numOfRow: 30,
      currentPage: 1,
      Common
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.$store.dispatch('targeting/getUserInterest')
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapGetters('targeting', ['userInterest']),
    paginationOptions() {
      return {
        total: this.tableData.length,
        pagerCount: (this.deviceWidth < Common.DEVICE_WIDTH.MOBILE) ? this.numPageMobile : this.numPagePC,
        limit: this.numOfRow,
        page: this.currentPage
      }
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.numOfRow
      const end = start + this.numOfRow
      return this.tableData.slice(start, end)
    }
  },
  watch: {
    userInterest: {
      handler(newData) {
        if (newData instanceof Array) {
          this.tableData = newData
          this.data = newData
        }
      },
      immediate: true
    }
  },
  methods: {
    cloneArr(array) {
      const dupArray = []
      for (var i = 0; i < array.length; i++) {
        dupArray[i] = array[i]
      }
      return dupArray
    },
    handleSort(sortData) {
      if (sortData.order === Common.FILTER_ASCENDING) {
        const ascendingData = this.cloneArr(this.data)
        ascendingData.shift()
        ascendingData.sort((a, b) => (a[sortData.prop] > b[sortData.prop]) ? 1 : ((b[sortData.prop] > a[sortData.prop]) ? -1 : 0))
        ascendingData.unshift(this.data[0])
        this.tableData = ascendingData
      } else {
        const descendingData = this.cloneArr(this.data)
        descendingData.shift()
        descendingData.sort((a, b) => (a[sortData.prop] < b[sortData.prop]) ? 1 : ((b[sortData.prop] < a[sortData.prop]) ? -1 : 0))
        descendingData.unshift(this.data[0])
        this.tableData = descendingData
      }
    },
    handleDownloadReport() {
      // Waiting API
    },
    onSelectCampaign(campaign_id) {
      this.$store.dispatch('targeting/getUserInterest', campaign_id)
    },
    handleResize() {
      this.deviceWidth = window.innerWidth
    },
    onSelectNumRow(value) {
      this.numOfRow = value
      if (this.numOfRow * this.currentPage > this.tableData.length) {
        this.currentPage = 1
      }
    },
    handlePagging(value) {
      this.currentPage = value.page
      this.numOfRow = value.limit
    }
  }
}
