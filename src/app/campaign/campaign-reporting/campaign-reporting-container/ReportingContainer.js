import ReportingStatistics from './reporting-statistics'
import ReportingGraph from './reporting-graph'
import GraphFilter from '@/components/GraphFilter'
import { mapGetters } from 'vuex'
import { graphFilterColor, graphFilterType, Common } from '@/common/constants'
import * as moment from 'moment'

export default {
  name: 'ReportingContainer',
  components: { ReportingStatistics, ReportingGraph, GraphFilter },
  data() {
    return {
      graphReportingType: '',
      graphStatisticType: '',
      reportingDataChart: [],
      dataChartConverted: {}
    }
  },
  computed: {
    ...mapGetters('campaign', [
      'campaign', 'dateFilterSelection'
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
    },
    dateFilterSelection: {
      handler(filterDate) {
        const params = {
          'from_date': filterDate.startDate,
          'limit': 30,
          'offset': 0,
          'order_by': 'asc',
          'segment': 'all_device_type',
          'sort_by': 'clicks',
          'stats_by': 'campaigns',
          'to_date': filterDate.endDate,
          'key_word': this.clientId
        }
        this.$store.dispatch('campaign/getCampaignReportingData', params)
      },
      immediate: true
    }
  },
  methods: {
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
    }
  }
}
