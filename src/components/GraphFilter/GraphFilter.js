import ReportingType from './reporting-type'
import UserStatisticData from './user-statistic-data'
import { UserStatisticDataConstrains } from '@/common/businessConstrains'
import { graphFilterColor, graphFilterType } from '@/common/constants'
export default {
  name: 'GraphFilter',
  components: { ReportingType, UserStatisticData },
  props: {
    hideReportType: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      colorConfig: graphFilterColor,
      itemSelectedOne: {},
      itemSelectedTwo: {},
      itemSelectedThree: {},
      itemSelectedFour: {},
      listItem: UserStatisticDataConstrains,
      indexDefaultOne: 1,
      indexDefaultTwo: 2,
      indexDefaultThree: 0,
      indexDefaultFour: 0
    }
  },
  created() {
    this.itemSelectedOne = this.listItem[this.indexDefaultOne]
    this.listItem[this.indexDefaultOne].isSelected = true
    this.itemSelectedTwo = this.listItem[this.indexDefaultTwo]
    this.listItem[this.indexDefaultTwo].isSelected = true
    this.itemSelectedThree = this.listItem[this.indexDefaultThree]
    this.listItem[this.indexDefaultThree].isSelected = true
    this.itemSelectedFour = this.listItem[this.indexDefaultFour]
    this.listItem[this.indexDefaultFour].isSelected = true
    this.emitDataEvent()
  },
  methods: {
    onSelectItem(newIdSelected, itemSelected, type) {
      if (itemSelected.id) {
        const indexItemSelected = this.listItem.findIndex(obj => obj.id === itemSelected.id)
        this.listItem[indexItemSelected].isSelected = false
      }
      if (newIdSelected !== '') {
        const indexNewItemSelected = this.listItem.findIndex(obj => obj.id === newIdSelected)
        this.listItem[indexNewItemSelected].isSelected = true
        const newItemSelected = this.listItem[indexNewItemSelected]
        switch (type) {
          case graphFilterType.one:
            this.itemSelectedOne = newItemSelected
            break
          case graphFilterType.two:
            this.itemSelectedTwo = newItemSelected
            break
          case graphFilterType.three:
            this.itemSelectedThree = newItemSelected
            break
          case graphFilterType.four:
            this.itemSelectedFour = newItemSelected
            break
        }
        this.emitDataEvent()
      }
    },
    emitDataEvent() {
      const listTypeFilter = []
      listTypeFilter.push({ item: this.itemSelectedOne, type: graphFilterType.one })
      listTypeFilter.push({ item: this.itemSelectedTwo, type: graphFilterType.two })
      listTypeFilter.push({ item: this.itemSelectedThree, type: graphFilterType.three })
      listTypeFilter.push({ item: this.itemSelectedFour, type: graphFilterType.four })
      this.$emit('onSelectItemStatisticType', listTypeFilter)
    },
    onSelectReportingType(item) {
      this.$emit('onSelectItemReportingType', item)
    }
  }
}
