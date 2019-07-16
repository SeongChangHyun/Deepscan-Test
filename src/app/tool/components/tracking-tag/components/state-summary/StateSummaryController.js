import { mapGetters } from 'vuex'
import TrackingTagTop from './materials/TrackingTagTop'
import TrackingTagBottom from './materials/TrackingTagBottom'
import ReportingGraph from '@/app/campaign/campaign-reporting/campaign-reporting-container/reporting-graph'

export default {
  name: 'StateSummary',
  components: {
    ReportingGraph,
    TrackingTagBottom,
    TrackingTagTop
  },
  data() {
    return {
      dataTable: [],
      dataChartConverted: {}
    }
  },
  computed: {
    ...mapGetters('tool', [
      'status',
      'isLoadingStatus'
    ])
  },
  watch: {
    status(newData, oldData) {
      this.dataTable = [...newData]
      this.parseDataChart()
    }
  },
  methods: {
    parseDataChart() {
      const listLabel = []
      const listTag = []
      const typeCollectedInformation = []
      this.dataTable.forEach(element => {
        if (!listLabel.includes(element.date)) {
          listLabel.push(element.date)
        }
        if (!listTag.includes(element.custom_tag_name)) {
          listTag.push(element.custom_tag_name)
        }
      })
      listTag.forEach((element, index) => {
        typeCollectedInformation.push({
          label: element,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          value: 'count'
        })
      })
      this.dataChartConverted = {
        label: listLabel,
        line: this.convertLineDataChart(this.dataTable, typeCollectedInformation)
      }
    },
    convertLineDataChart(data, listType) {
      if (!listType) return
      const listLine = []
      for (const i in listType) {
        listLine.push(this.createDataLine(data, listType[i]))
      }
      return listLine
    },
    createDataLine(data, type) {
      if (data) {
        const listValueLine = []
        for (const item of data) {
          if (item.custom_tag_name === type.label) {
            listValueLine.push(item[type.value])
          }
        }
        const nameLine = type.label
        const objectLine = {
          name: nameLine,
          data: listValueLine,
          color: type.color
        }
        return objectLine
      }
    }
  }
}
