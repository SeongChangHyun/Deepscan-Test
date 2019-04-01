import _ from 'lodash'
export default {
  name: 'UserStatisticData',
  props: {
    listItem: {},
    colorQualify: {
      type: String,
      default: '#000000'
    },
    itemSelected: {},
    onSelectItem: Function,
    type: '',
    defaultValue: {
      type: Number
    }
  },
  data() {
    return {
      itemSelectedComponent: ''
    }
  },
  created() {
    if (this.defaultValue !== 0) {
      this.data = _.filter(this.listItem, (item) => !item.default)
    } else {
      this.data = this.listItem
    }
    this.itemSelectedComponent = this.defaultValue
    this.onChangeData(this.defaultValue)
  },
  watch: {
    colorQualify: {
      handler() {
        this.color = this.colorQualify
      },
      immediate: true
    }
  },
  methods: {
    onChangeData(id) {
      this.onSelectItem(id, this.itemSelected, this.type)
    },
    onClearData() {
      this.itemSelectedComponent = this.defaultValue
      this.onSelectItem(this.defaultValue, this.itemSelected, this.type)
    }
  }
}
