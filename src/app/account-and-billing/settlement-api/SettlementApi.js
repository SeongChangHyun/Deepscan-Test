import { mapGetters } from 'vuex'
import { ColumnsTableBottom } from '@/common/settlement-api/tableBottom'
import DateFilterSelection from '@/components/DateFilterSelection'
export default {
  name: 'SettlementApi',
  components: {
    DateFilterSelection
  },
  data() {
    return {
      dataTableBototm: [],
      columnsBototm: ColumnsTableBottom
    }
  },
  computed: {
    ...mapGetters('user', [
      'settlementTableBottom'
    ]),
    ...mapGetters('campaign', [
      'dateFilterSelection'
    ])
  },
  watch: {
    settlementTableBottom: {
      handler(newData) {
        if ((newData instanceof Array)) {
          this.dataTableBototm = newData
        }
      },
      immediate: false
    },
    dateFilterSelection: {
      handler(filterDate) {
        const params = {
          startDate: filterDate.startDate,
          endDate: filterDate.endDate
        }
        // TO DO : handle data date filter
        this.$store.dispatch('user/getSettlementApiDataTableBottom', params)
      },
      immediate: true
    }
  },
  created() {
    this.$store.dispatch('user/getSettlementApiDataTableBottom')
  },
  methods: {
    onClickItemTableTop(item, index) {
      // TO DO : click item table
    },
    downloadFile() {
      // TO DO : click download item
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.$t('settlementApi.total')
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
