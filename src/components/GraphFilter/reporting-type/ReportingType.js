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
          code: 'campaignReporting.reportingType.daily'
        },
        {
          id: 2,
          type: 'weekly',
          code: 'campaignReporting.reportingType.weekly'
        },
        {
          id: 3,
          type: 'monthly',
          code: 'campaignReporting.reportingType.monthly'
        }
      ],
      title: ''
    }
  },
  created() {
    this.itemSeleted = this.listItem[0]
    this.onSeletecItemDropdow(this.itemSeleted)
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
