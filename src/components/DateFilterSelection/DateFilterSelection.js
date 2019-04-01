var moment = require('moment')
import { Common } from '@/common/constants'
export default {
  name: 'DateFilterSelection',
  data() {
    return {
      data: [],
      itemSelectedComponent: ''
    }
  },
  created() {
    this.createListDateSelection()
  },
  methods: {
    onChangeData(data) {
      this.$emit('onSelectItemDateSelection', data)
    },
    createListDateSelection() {
      moment.locale('es')
      const formatDate = Common.FORMAT_DATE_YYYY_MM_DD
      const todayDate = moment().format(formatDate)
      const today = {
        value: todayDate,
        langCode: 'campaignReporting.reportingDateSelection.today',
        label: todayDate,
        id: 0
      }
      this.data.push(today)

      const yesterday = {
        value: moment().subtract(1, 'days').format(formatDate),
        langCode: 'campaignReporting.reportingDateSelection.yesterday',
        label: moment().subtract(1, 'days').format(formatDate),
        id: 1
      }
      this.data.push(yesterday)

      const thisWeek = {
        value: moment().startOf('isoweek').format(formatDate),
        langCode: 'campaignReporting.reportingDateSelection.thisWeek',
        label: moment().startOf('isoweek').format(formatDate) + '~' + todayDate,
        id: 2
      }
      this.data.push(thisWeek)

      const sevenDayAgo = moment().subtract(7, 'days').format(formatDate)
      const startLastWeek = moment(sevenDayAgo).startOf('isoweek').format(formatDate)
      const endLastWeek = moment(sevenDayAgo).endOf('isoweek').format(formatDate)
      const lastWeek = {
        value: startLastWeek + '~' + endLastWeek,
        langCode: 'campaignReporting.reportingDateSelection.lastWeek',
        label: startLastWeek + '~' + endLastWeek,
        id: 3
      }
      this.data.push(lastWeek)

      const last14Days = {
        value: moment().subtract(7, 'days').format(formatDate) + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.last14Days',
        label: moment().subtract(7, 'days').format(formatDate) + '~' + todayDate,
        id: 4
      }

      this.data.push(last14Days)

      const startOfCurrentMonth = moment().startOf('month').format(formatDate)
      const thisMonth = {
        value: startOfCurrentMonth + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.thisMonth',
        label: startOfCurrentMonth + '~' + todayDate,
        id: 5
      }
      this.data.push(thisMonth)

      const startDayLastMonth = moment(todayDate).subtract(1, 'months').startOf('month').format(formatDate)
      const endDayLastMonth = moment(todayDate).subtract(1, 'months').endOf('month').format(formatDate)
      const lastMonth = {
        value: startDayLastMonth + '~' + endDayLastMonth,
        langCode: 'campaignReporting.reportingDateSelection.lastMonth',
        label: startDayLastMonth + '~' + endDayLastMonth,
        id: 6
      }
      this.data.push(lastMonth)

      const last3MonthDate = moment().subtract(90, 'days').format(formatDate)
      const last3Month = {
        value: last3MonthDate + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.last3Month',
        label: last3MonthDate + '~' + todayDate,
        id: 7
      }
      this.data.push(last3Month)

      const last6MonthDate = moment().subtract(180, 'days').format(formatDate)
      const last6Month = {
        value: last6MonthDate + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.last6Month',
        label: last6MonthDate + '~' + todayDate,
        id: 8
      }
      this.data.push(last6Month)

      const fristDayCurrentYear = moment().startOf('year').format(formatDate)
      const thisYear = {
        value: fristDayCurrentYear + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.thisYear',
        label: fristDayCurrentYear + '~' + todayDate,
        id: 9
      }
      this.data.push(thisYear)

      var startOfLastYear = moment(todayDate).subtract(1, 'year').startOf('year').format(formatDate)
      var endOfLastYear = moment(todayDate).subtract(1, 'year').endOf('year').format(formatDate)
      const lastYear = {
        value: startOfLastYear + '~' + endOfLastYear,
        langCode: 'campaignReporting.reportingDateSelection.lastYear',
        label: startOfLastYear + '~' + endOfLastYear,
        id: 10
      }
      this.data.push(lastYear)
    }
  }
}
