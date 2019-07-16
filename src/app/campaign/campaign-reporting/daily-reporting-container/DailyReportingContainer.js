import moment from 'moment'
import GraphFilter from '@/components/GraphFilter'
import CampaignCustomColumnReport from '@/components/ReportingGridFilter/campaign-custom-column-report'
import CampaignSegment from '@/components/ReportingGridFilter/campaign-segment'
import { dailyReportSegmentEnums } from '@/common/businessConstrainsSegment'
import DropdownCampaigns from './components/dropdown-campaigns'
import ReportingGraph from '../campaign-reporting-container/reporting-graph'
import DataGrid from './components/data-grid'
import { graphFilterColor, graphFilterType, Common, REPORTING_TYPE_API } from '@/common/constants'
import mockData from './mockData'

const { columns, data } = mockData

export default {
  name: 'ReportingContainer',
  components: {
    GraphFilter,
    DropdownCampaigns,
    CampaignSegment,
    DataGrid,
    CampaignCustomColumnReport,
    ReportingGraph
  },
  data() {
    return {
      campaigns: [],
      dailyReports: [],
      originalDailyReports: [],
      segment: '',
      campaignId: '',
      columns,
      data,
      graphReportingType: {
        type: 'daily',
        name: 'Daily'
      },
      graphStatisticType: '',
      reportingDataChart: [],
      dataChartConverted: {},
      clientId: 9987, // Fix clientId
      reportType: REPORTING_TYPE_API.DAILY_REPORT
    }
  },
  computed: {
    startDate() {
      return this.$store.state.campaign.dataFilterSelection.startDate
    },
    endDate() {
      return this.$store.state.campaign.dataFilterSelection.endDate
    }
  },
  watch: {
    campaignId: function() {
      this.getDailyReports({ reset: true })
    },
    segment: function() {
      this.getDailyReports({ reset: true })
    },
    startDate: function() {
      this.getDailyReports({ reset: true })
    },
    endDate: function() {
      this.getDailyReports({ reset: true })
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `dailyReporting.${params}`
      )
    },
    getDailyReports({ reset, row }) {
      let id, dateTime
      if (row) {
        id = row.campaign_id
        dateTime = row.date_time
      }
      if (!this.campaignId || dailyReportSegmentEnums.indexOf(this.segment) === -1) {
        return
      }
      const payload = {
        from_date: dateTime || this.startDate,
        to_date: dateTime || this.endDate,
        segment: this.segment,
        campaign_id: this.campaignId,
        sort_by: '',
        order_by: 'asc',
        offset: 0,
        limit: 1000
      }

      this.$store.dispatch('campaign/getDailyReportingData', { payload, callback: (error, response) => {
        if (error) {
          return this.handleError(error.message)
        }
        if (!row) {
          // original data for sort
          this.originalDailyReports = response
        }
        if (response && response.graph && response.grid) {
          // Graph View
          if (!row) {
            this.reportingDataChart = response.graph
            this.convertDataChart()
          }

          // Grid View
          this.prepareDataForGrid(reset, payload, response, id, row)
        }
      } })
    },
    prepareDataForGrid(reset, payload, response, id, row) {
      let tempDailyReports = this.formatData({
        reset,
        isGetByDate: payload.from_date !== payload.to_date,
        dailyReports: response.grid,
        rowId: id
      })
      tempDailyReports = this.formatDate(tempDailyReports)
      if (!row) {
        tempDailyReports = this.addTotalRows(tempDailyReports, response.sum)
      }
      this.dailyReports = tempDailyReports
    },
    formatDate(reports) {
      return reports.map(re => {
        const momentDate = moment(re.date_time)
        if (!momentDate.isValid()) {
          return re
        }
        if (re.isParent && re.rowType === 'date') {
          return { ...re, date_time: momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : re.date_time }
        }

        const hour = momentDate.hour()
        return {
          ...re,
          date_time: `${hour}시(${hour}:00~${hour}:59)`
        }
      })
    },
    formatData({ reset, isGetByDate, dailyReports, rowId }) {
      if (isGetByDate) {
        return dailyReports.map(report => ({ ...report, isParent: true, isCollapse: true, rowType: 'date' }))
      }
      if (reset) {
        return dailyReports.map(report => ({ ...report, isParent: true, isCollapse: true, rowType: 'hour' }))
      }

      const result = []
      this.dailyReports.filter(report => report.isParent).forEach(report => {
        result.push({ ...report, isParent: true })
        if (report.campaign_id === rowId) {
          result.push(...dailyReports.map(dr => ({ ...dr, parent: rowId })))
        }
      })
      return result
    },
    addTotalRows(reports, sum) {
      const totals = Object.keys(sum).map(key => {
        return {
          ...sum[key],
          rowType: '',
          isParent: true,
          isTotalField: true,
          date_time: `Total: ${key.charAt(0).toUpperCase() + key.slice(1)}`
        }
      })
      return [...reports, ...totals]
    },
    handleSort(sortData) {
      let sortedGrid
      if (sortData.order === 'ascending') {
        sortedGrid = this.originalDailyReports.grid.sort((a, b) => (a[sortData.prop] > b[sortData.prop]) ? 1 : ((b[sortData.prop] > a[sortData.prop]) ? -1 : 0))
      } else if (sortData.order === 'descending') {
        sortedGrid = this.originalDailyReports.grid.sort((a, b) => (a[sortData.prop] < b[sortData.prop]) ? 1 : ((b[sortData.prop] < a[sortData.prop]) ? -1 : 0))
      } else {
        // do something
      }
      this.prepareDataForGrid(true, { from_date: this.startDate, to_date: this.endDate }, { ...this.originalDailyReports, grid: sortedGrid }, null, null)
    },
    handleError(message) {
      this.$message({
        type: 'error',
        message
      })
    },
    removeChildren(clickRow) {
      this.dailyReports = this.dailyReports.filter(re => re.parent !== clickRow.campaign_id)
    },
    addChildren(clickRow) {
      this.getDailyReports({ reset: false, row: clickRow })
    },
    onSelectCampaign(campaignId) {
      this.campaignId = campaignId
    },
    onSelectColumn(columns) {
      this.columns = columns
    },
    onSelectSegment(value) {
      if (Array.isArray(value)) {
        this.segment = value.pop()
      }
    },
    onSelectItemStatisticType(listType) {
      this.graphStatisticType = listType
      this.convertDataChart()
    },
    onSelectItem() { },
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
  },
  created() {
    this.$store.dispatch('campaign/getListCampaign', { callback: (error, response) => {
      if (error) {
        return this.handleError(error.message)
      }
      this.campaigns = response
    } })
  }
}
