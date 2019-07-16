import Statistics from './statistics'
import GraphFilter from '@/components/GraphFilter'
import { graphFilterColor, graphFilterType } from '@/common/constants'
import Graph from './graph'
export default {
  name: 'PerformanceReport',
  components: { Statistics, Graph, GraphFilter },
  data() {
    return {
      graphReportingType: '',
      graphStatisticType: '',
      reportingDataChart: [],
      dataChartConverted: {}
    }
  },
  created() {
  },
  computed: {
  },
  watch: {
    campaign: {
      handler(newData) {
        if (!newData) return
        this.reportingDataChart = newData
        this.convertDataChart()
      },
      immediate: false
    },
    dateFilterSelection: {
      handler(newData) {
        // TO DO : handle data date filler selection
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
        .catch(() => {
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
        listLabel.push(this.reportingDataChart[i].date_time)
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
