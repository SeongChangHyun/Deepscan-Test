import { Common } from '@/common/constants'
import { TypeCollectedInformation, ColumnsTable } from '@/common/tracking-tag/collectedInformation'
import DateFilterSelection from '@/components/DateFilterSelection'
import { mapGetters } from 'vuex'
import * as moment from 'moment'
import { saveAs } from 'file-saver'
import { ContentLoader } from 'vue-content-loader'
import ReportingGraph from '@/app/campaign/campaign-reporting/campaign-reporting-container/reporting-graph'

export default {
  name: 'CustomTag',
  components: { DateFilterSelection, ReportingGraph, ContentLoader },
  data() {
    return {
      data: [],
      typeCollectedInformations: TypeCollectedInformation,
      dataChartConverted: {},
      columns: ColumnsTable,
      currentDateSelected: {},
      isLoading: true,
      isDownloadLoading: false
    }
  },
  computed: {
    ...mapGetters('tool', [
      'collectedInformation'
    ]),
    ...mapGetters('campaign', [
      'dateFilterSelection'
    ])
  },
  watch: {
    collectedInformation: {
      handler(newData) {
        if ((newData instanceof Array && newData.length > 0)) {
          this.data = newData
          this.convertDataChart(this.data)
        }
      },
      immediate: false
    },
    dateFilterSelection: {
      handler(filterDate) {
        if (!filterDate.startDate) return
        this.currentDateSelected = filterDate
        const params = {
          from_date: this.currentDateSelected.startDate,
          to_date: this.currentDateSelected.endDate
        }
        this.$store.dispatch('tool/getListCollectedInformation', params)
      },
      immediate: true
    }
  },
  methods: {
    convertDataChart(data) {
      if (!data) return
      this.isLoading = false
      const listLabel = []
      for (const i in data) {
        const dateTimeFormated = moment(new Date(data[i].date)).format(Common.FORMAT_DATE_DD_MM_YYYY_CHART)
        listLabel.push(dateTimeFormated)
      }
      this.dataChartConverted = {
        label: listLabel,
        line: this.convertLineDataChart(data, this.typeCollectedInformations)
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
        for (const i in data) {
          if (type.hasOwnProperty('value')) {
            listValueLine.push(data[i][type.value])
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
    },
    downloadFile() {
      const params = {
        from_date: this.currentDateSelected.startDate,
        to_date: this.currentDateSelected.endDate,
        lang: this.$store.getters.language
      }
      this.isDownloadLoading = true
      this.$store.dispatch('tool/downloadCollectedInformation', params).then((response) => {
        const fileName = this.currentDateSelected.startDate + '-' + this.currentDateSelected.endDate + '-collected-information-' + this.$store.getters.language + '.xlsx'
        saveAs(response, fileName)
        this.isDownloadLoading = false
      })
    }
  }
}
