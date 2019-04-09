var moment = require('moment')
import { Common } from '@/common/constants'
const formatDate = Common.FORMAT_DATE_YYYY_MM_DD
export default {
  name: 'DateFilterSelection',
  data() {
    return {
      data: [],
      itemSelectedComponent: '',
      valueSpecificDate: ''
    }
  },
  created() {
    this.createListDateSelection()
  },
  methods: {
    onChangeData(data) {
      if (data && data.value) {
        this.$emit('onSelectItemDateSelection', data.value)
        return
      }
      this.resetDefaultValue()
    },
    onChangeDataDatePicker(val) {
      if (!val) {
        this.resetDefaultValue()
        return
      }
      const timeSelected = moment(val).format(formatDate)
      this.itemSelectedComponent = moment(val).format(formatDate)
      this.$emit('onSelectItemDateSelection', timeSelected)
    },
    resetDefaultValue() {
      this.itemSelectedComponent = this.data[3].value
      this.$emit('onSelectItemDateSelection', this.data[3].value)
    },
    createListDateSelection() {
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

      const last7Days = {
        value: moment().subtract(7, 'days').format(formatDate) + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.last7Days',
        label: moment().subtract(7, 'days').format(formatDate) + '~' + todayDate,
        id: 3
      }
      this.itemSelectedComponent = last7Days.value
      this.onChangeData(last7Days)
      this.data.push(last7Days)

      const sevenDayAgo = moment().subtract(7, 'days').format(formatDate)
      const startLastWeek = moment(sevenDayAgo).startOf('isoweek').format(formatDate)
      const endLastWeek = moment(sevenDayAgo).endOf('isoweek').format(formatDate)
      const lastWeek = {
        value: startLastWeek + '~' + endLastWeek,
        langCode: 'campaignReporting.reportingDateSelection.lastWeek',
        label: startLastWeek + '~' + endLastWeek,
        id: 4
      }
      this.data.push(lastWeek)

      const last14Days = {
        value: moment().subtract(14, 'days').format(formatDate) + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.last14Days',
        label: moment().subtract(14, 'days').format(formatDate) + '~' + todayDate,
        id: 5
      }

      this.data.push(last14Days)

      const startOfCurrentMonth = moment().startOf('month').format(formatDate)
      const thisMonth = {
        value: startOfCurrentMonth + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.thisMonth',
        label: startOfCurrentMonth + '~' + todayDate,
        id: 6
      }
      this.data.push(thisMonth)

      const last30Days = {
        value: moment().subtract(30, 'days').format(formatDate) + '~' + todayDate,
        langCode: 'campaignReporting.reportingDateSelection.last30Days',
        label: moment().subtract(30, 'days').format(formatDate) + '~' + todayDate,
        id: 7
      }

      this.data.push(last30Days)

      const startDayLastMonth = moment(todayDate).subtract(1, 'months').startOf('month').format(formatDate)
      const endDayLastMonth = moment(todayDate).subtract(1, 'months').endOf('month').format(formatDate)
      const lastMonth = {
        value: startDayLastMonth + '~' + endDayLastMonth,
        langCode: 'campaignReporting.reportingDateSelection.lastMonth',
        label: startDayLastMonth + '~' + endDayLastMonth,
        id: 8
      }
      this.data.push(lastMonth)
    }
  }
}
