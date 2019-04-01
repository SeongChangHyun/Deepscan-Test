import ReportingType from './reporting-type'
import UserStatisticData from './user-statistic-data'
import { UserStatisticDataConstrains } from '@/common/businessConstrains'
import { graphFilterColor } from '@/common/constants'
export default {
  name: 'GraphFilter',
  components: { ReportingType, UserStatisticData },
  data() {
    return {
      colorConfig: graphFilterColor,
      itemSelectedOne: {},
      itemSelectedTwo: {},
      itemSelectedThree: {},
      itemSelectedFour: {},
      listItem: UserStatisticDataConstrains
    }
  },
  methods: {
    onSelectItem(newIdSelected, itemSelected, type) {
      if (itemSelected.id) {
        const indexItemSelected = this.listItem.findIndex(obj => obj.id === itemSelected.id)
        this.listItem[indexItemSelected].isSelected = false
      }
      if (!newIdSelected) {
        return
      }
      const indexNewItemSelected = this.listItem.findIndex(obj => obj.id === newIdSelected)
      this.listItem[indexNewItemSelected].isSelected = true
      switch (type) {
        case 'one':
          this.itemSelectedOne = this.listItem[indexNewItemSelected]
          break
        case 'two':
          this.itemSelectedTwo = this.listItem[indexNewItemSelected]
          break
        case 'three':
          this.itemSelectedThree = this.listItem[indexNewItemSelected]
          break
        case 'four':
          this.itemSelectedFour = this.listItem[indexNewItemSelected]
          break
      }
    },
    onSelectReportingType(item) {
      this.$emit('onSelectItemReportingType', item)
    }
  }
}
