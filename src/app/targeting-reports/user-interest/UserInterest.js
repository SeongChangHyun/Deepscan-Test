import GraphFilter from '@/components/GraphFilter'
import Statistics from './statistics'
import ReportingGraph from '../../campaign/campaign-reporting/campaign-reporting-container/reporting-graph'
import * as moment from 'moment'
import { graphFilterColor, graphFilterType, Common } from '@/common/constants'
import { mapGetters } from 'vuex'
export default {
  name: 'UserInterest',
  components: { GraphFilter, Statistics, ReportingGraph },
  data() {
    return {
      graphReportingType: '',
      graphStatisticType: '',
      reportingDataChart: [],
      dataChartConverted: {},
      clientId: 9987
    }
  },
  computed: {
    ...mapGetters('targeting', [
      'creativesReporting', 'dateFilterSelection'
    ])
  },
  watch: {
    creativesReporting: {
      handler(newData) {
        if (!newData) return
        this.reportingDataChart = newData
        this.convertDataChart()
      },
      immediate: false
    },
    dateFilterSelection: {
      handler(filterDate) {
        const params = {
          'from_date': '',
          'limit': 20,
          'offset': 0,
          'order_by': 'asc',
          'segment': 'all_campaign_goal',
          'sort_by': 'clicks',
          'stats_by': 'campaigns',
          'to_date': '',
          'keyWord': this.clientId
        }
        this.$store.dispatch('targeting/getCreativesReportingData', params)
      },
      immediate: true
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `targetingReports.${params}`
      )
    },
    onSelectItemStatisticType(listType) {
      this.graphStatisticType = listType
      this.convertDataChart()
    },
    onSelectItemReportingType(item) {
      this.graphReportingType = item
      this.convertDataChart()
    },
    convertDataChart() {
      const listLabel = []
      for (var i in this.reportingDataChart) {
        const dateTimeFormated = moment(this.reportingDataChart[i].date_time).format(Common.FORMAT_DATE_DD_MM_YYYY)
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
    }
  }
}
