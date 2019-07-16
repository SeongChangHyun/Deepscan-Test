import { Common, dateFilterSelection } from '@/common/constants'
var moment = require('moment')
const formatDate = Common.FORMAT_DATE_YYYY_MM_DD
export default {
  name: 'DateFilterSelection',
  data() {
    return {
      data: [],
      itemSelectedComponent: '',
      valueSpecificDate: '',
      pickerOptions: {
        shortcuts: [{
          text: this.$t('campaignReporting.reportingDateSelection.lastWeek'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('campaignReporting.reportingDateSelection.lastMonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('campaignReporting.reportingDateSelection.last3Month'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.createListDateSelection()
  },
  methods: {
    countValueBetweenTwoDate(startDate, endDate) {
      const countWeek = moment(endDate).diff(moment(startDate), 'week')
      const countMonth = moment(endDate).diff(moment(startDate), 'month')
      this.$store.dispatch('campaign/updateStatusAlowFilterType', {
        alowWeek: countWeek > 0,
        alowMonth: countMonth > 0
      })
    },
    onChangeData(data) {
      if (data !== null && data !== '') {
        this.itemSelectedComponent = data.index || data
        const itemValue = this.data[this.itemSelectedComponent].value
        this.countValueBetweenTwoDate(itemValue.startDate, itemValue.endDate)
        this.$store.dispatch('campaign/selectDataFilterSelection', this.data[this.itemSelectedComponent].value)
        return
      }
      this.resetDefaultValue()
    },
    onChangeDataDatePicker(val) {
      if (!val) {
        this.resetDefaultValue()
        return
      }
      const timeSelectedStart = moment(val[0]).format(formatDate)
      const timeSelectedEnd = moment(val[1]).format(formatDate)
      if (timeSelectedStart === timeSelectedEnd) {
        this.itemSelectedComponent = timeSelectedStart
      } else {
        this.itemSelectedComponent = timeSelectedStart + ' - ' + timeSelectedEnd
      }
      this.countValueBetweenTwoDate(timeSelectedStart, timeSelectedEnd)
      this.$store.dispatch('campaign/selectDataFilterSelection', {
        startDate: timeSelectedStart,
        endDate: timeSelectedEnd
      })
    },
    resetDefaultValue() {
      this.itemSelectedComponent = this.data[dateFilterSelection.indexDefaultValue].index
      const itemValue = this.data[dateFilterSelection.indexDefaultValue].value
      this.countValueBetweenTwoDate(itemValue.startDate, itemValue.endDate)
      this.$store.dispatch('campaign/selectDataFilterSelection', itemValue)
    },
    createListDateSelection() {
      const todayDate = moment().format(formatDate)
      const today = {
        value: {
          startDate: todayDate,
          endDate: todayDate
        },
        langCode: 'campaignReporting.reportingDateSelection.today',
        label: todayDate,
        index: 0
      }
      this.data.push(today)

      const yesterday = {
        value: {
          startDate: moment().subtract(1, 'days').format(formatDate),
          endDate: moment().subtract(1, 'days').format(formatDate)
        },
        langCode: 'campaignReporting.reportingDateSelection.yesterday',
        label: moment().subtract(1, 'days').format(formatDate),
        index: 1
      }
      this.data.push(yesterday)

      const thisWeek = {
        value: {
          startDate: moment().startOf('isoweek').format(formatDate),
          endDate: todayDate
        },
        langCode: 'campaignReporting.reportingDateSelection.thisWeek',
        label: moment().startOf('isoweek').format(formatDate) + '~' + todayDate,
        index: 2
      }
      this.data.push(thisWeek)

      const last7Days = {
        value: {
          startDate: moment().subtract(7, 'days').format(formatDate),
          endDate: todayDate
        },
        langCode: 'campaignReporting.reportingDateSelection.last7Days',
        label: moment().subtract(7, 'days').format(formatDate) + '~' + todayDate,
        index: 3
      }

      this.data.push(last7Days)

      const sevenDayAgo = moment().subtract(7, 'days').format(formatDate)
      const startLastWeek = moment(sevenDayAgo).startOf('isoweek').format(formatDate)
      const endLastWeek = moment(sevenDayAgo).endOf('isoweek').format(formatDate)
      const lastWeek = {
        label: startLastWeek + '~' + endLastWeek,
        langCode: 'campaignReporting.reportingDateSelection.lastWeek',
        value: {
          startDate: startLastWeek,
          endDate: endLastWeek
        },
        index: 4
      }
      this.data.push(lastWeek)

      const last14Days = {
        value: {
          startDate: moment().subtract(14, 'days').format(formatDate),
          endDate: endLastWeek
        },
        langCode: 'campaignReporting.reportingDateSelection.last14Days',
        label: moment().subtract(14, 'days').format(formatDate) + '~' + todayDate,
        index: 5
      }

      this.data.push(last14Days)

      const startOfCurrentMonth = moment().startOf('month').format(formatDate)
      const thisMonth = {
        langCode: 'campaignReporting.reportingDateSelection.thisMonth',
        label: startOfCurrentMonth + '~' + todayDate,
        value: {
          startDate: startOfCurrentMonth,
          endDate: todayDate
        },
        index: 6
      }
      this.data.push(thisMonth)

      const last30Days = {
        value: {
          startDate: moment().subtract(30, 'days').format(formatDate),
          endDate: todayDate
        },
        langCode: 'campaignReporting.reportingDateSelection.last30Days',
        label: moment().subtract(30, 'days').format(formatDate) + '~' + todayDate,
        index: 7
      }

      this.data.push(last30Days)

      const startDayLastMonth = moment(todayDate).subtract(1, 'months').startOf('month').format(formatDate)
      const endDayLastMonth = moment(todayDate).subtract(1, 'months').endOf('month').format(formatDate)
      const lastMonth = {
        value: {
          startDate: startDayLastMonth,
          endDate: endDayLastMonth
        },
        langCode: 'campaignReporting.reportingDateSelection.lastMonth',
        label: startDayLastMonth + '~' + endDayLastMonth,
        index: 8
      }
      this.data.push(lastMonth)

      this.onChangeData(last7Days)
    }
  }
}
