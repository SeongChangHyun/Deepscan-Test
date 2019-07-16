import ReportingStatistics from './reporting-statistics'
import ReportingGraph from './reporting-graph'
import GraphFilter from '@/components/GraphFilter'
import { graphFilterColor, graphFilterType, Common } from '@/common/constants'
import { getClientId } from '@/utils/auth'
import * as moment from 'moment'

export default {
  name: 'PerformanceReport',
  components: { ReportingStatistics, ReportingGraph, GraphFilter },
  data() {
    return {
      graphReportingType: '',
      graphStatisticType: '',
      reportingDataChart: [],
      dataChartConverted: {},
      tableData: [],
      gridTotal: 100, // fake value
      filterParams: {
        account_id: 42890,
        from_date: new Date(),
        limit: Common.DEFAULT_REPORT_FILTER.LIMIT,
        offset: Common.DEFAULT_REPORT_FILTER.OFFSET,
        order_by: Common.DEFAULT_REPORT_FILTER.ORDER_BY,
        segment: Common.DEFAULT_REPORT_FILTER.SEGMENT,
        sort_by: '',
        stats_by: Common.DEFAULT_REPORT_FILTER.STATS_BY,
        to_date: new Date(),
        keyWord: getClientId()
      }
    }
  },
  computed: {
  },
  watch: {
    dateFilterSelection: {
      handler(filterDate) {
        this.filterParams.from_date = filterDate ? filterDate.startDate : new Date()
        this.filterParams.to_date = filterDate ? filterDate.endDate : new Date()
        this.getPerformanceReportData()
      },
      immediate: true
    }
  },
  methods: {
    getPerformanceReportData() {
      this.$store.dispatch('accountsSummary/getPerformanceReportData', this.filterParams)
        .then((response) => {
          this.reportingDataChart = response.data
          this.convertDataChart()
          this.tableData = response.data
        })
        .catch((error) => {
          if (!error) {
            return
          }
          if (error.response && error.response.status === Common.SERVER_ERROR.CODE_400) {
            let errorData = error.response.data
            if (typeof errorData === 'string') {
              errorData = JSON.parse(errorData)
            }
            if (errorData.error_description) {
              this.$message.error(this.$t(`performanceReport.${errorData.error_description}`))
            } else {
              this.$message.error(this.$t(`performanceReport.loadDataFailed`))
            }
          }
          this.loading = false
        })
    },
    onSelectItemReportingType(item) {
      this.graphReportingType = item
      this.convertDataChart()
    },
    onSelectItemStatisticType(listType) {
      this.graphStatisticType = listType
      this.convertDataChart()
    },
    convertDataChart() {
      const listLabel = []
      for (var i in this.reportingDataChart) {
        const dateTimeFormated = moment(new Date(this.reportingDataChart[i].date_time)).format(Common.FORMAT_DATE_DD_MM_YYYY_CHART)
        listLabel.push(dateTimeFormated)
      }
      this.dataChartConverted = {
        label: listLabel,
        type: this.graphReportingType.type,
        line: this.convertLineDataChart(this.reportingDataChart, this.graphStatisticType)
      }
    },
    convertLineDataChart(data, listType) {
      const listLine = []
      for (const i in listType) {
        const typeFilterStatistics = listType[i]
        listLine.push(this.createDataLine(data, typeFilterStatistics, graphFilterColor[typeFilterStatistics.type]))
      }
      return listLine
    },
    createDataLine(data, typeFilterStatistics, color) {
      if (data) {
        if (typeFilterStatistics.item.value === graphFilterType.none) {
          return []
        }
        const listValueLine = []
        for (const i in data) {
          if (typeFilterStatistics.item.hasOwnProperty('value')) {
            listValueLine.push(data[i][typeFilterStatistics.item.value])
          }
        }
        const nameLine = this.graphReportingType.name + ' ' + typeFilterStatistics.item.name + ' ' + this.$t('campaignReporting.count')
        const objectLine = {
          name: nameLine,
          data: listValueLine,
          color: color
        }
        return objectLine
      }
    },
    onChangeFilterParams(filterParams) {
      this.filterParams = filterParams
      this.getPerformanceReportData()
    }
  }
}
