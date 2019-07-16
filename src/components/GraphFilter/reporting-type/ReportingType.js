import { mapGetters } from 'vuex'
export default {
  name: 'ReportingType',
  props: {
    onSelectItem: Function
  },
  data() {
    return {
      itemSeleted: {},
      listItem: [
        {
          id: 1,
          type: 'daily',
          code: 'campaignReporting.reportingType.daily',
          name: 'Daily',
          alow: true
        },
        {
          id: 2,
          type: 'weekly',
          code: 'campaignReporting.reportingType.weekly',
          name: 'Weekly',
          alow: true
        },
        {
          id: 3,
          type: 'monthly',
          code: 'campaignReporting.reportingType.monthly',
          name: 'Monthly',
          alow: true
        }
      ],
      title: ''
    }
  },
  computed: {
    ...mapGetters('campaign', [
      'statusFilterType', 'isReloadCampainReport'
    ])
  },
  watch: {
    listItem: {
      handler() {
        this.initData()
      },
      immediate: true
    },
    titleDate: {
      handler() {
        this.title = this.titleDate
      },
      immediate: true
    },
    isReloadCampainReport: {
      handler(value) {
        if (!value) return
        this.itemSeleted = this.listItem[0]
        this.onSeletecItemDropdow(this.itemSeleted)
      },
      immediate: true
    },
    statusFilterType: {
      handler(value) {
        if (!value) return
        const alowWeek = value.alowWeek
        const alowMonth = value.alowMonth
        this.data[1].alow = alowWeek
        this.data[2].alow = alowMonth
      },
      immediate: true
    }
  },
  methods: {
    initData() {
      this.data = this.listItem
    },
    onSeletecItemDropdow(item) {
      this.itemSeleted = item
      this.onSelectItem(item)
    }
  }
}
