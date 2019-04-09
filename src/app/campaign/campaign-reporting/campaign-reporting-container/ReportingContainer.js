import ReportingStatistics from './reporting-statistics'
import ReportingGraph from './reporting-graph'
import GraphFilter from '@/components/GraphFilter'
import DateFilterSelection from '@/components/DateFilterSelection'
import { mapGetters } from 'vuex'
import { graphFilterColor, graphFilterType } from '@/common/constants'
export default {
  name: 'ReportingContainer',
  components: { ReportingStatistics, ReportingGraph, GraphFilter, DateFilterSelection },
  data() {
    return {
      graphReportingType: '',
      graphStatisticType: '',
      reportingDataChart: [],
      dataChartConverted: {}
    }
  },
  created() {
    this.$store.dispatch('campaign/getCampaignReportingData')
  },
  computed: {
    ...mapGetters('campaign', [
      'campaign'
    ])
  },
  watch: {
    campaign: {
      handler(newData) {
        if (!newData) return
        this.reportingDataChart = newData
        this.convertDataChart()
      },
      immediate: false
    }
  },
  methods: {
    onSelectItemDateSelection(item) {
      // TO DO : change data graph
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
    }
  }
}
