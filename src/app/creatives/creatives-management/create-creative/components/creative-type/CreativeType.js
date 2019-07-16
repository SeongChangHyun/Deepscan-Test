import { CreativeConstant } from '@/common/constants'

export default {
  name: 'CreativeType',
  props: {
    creativeTypes: Array,
    selectedType: String,
    onSelectedType: Function
  },
  data() {
    return {
      creativeConstant: CreativeConstant
    }
  },
  methods: {
    hasCreativeType(type) {
      if (this.creativeTypes.indexOf(type) !== -1) {
        return true
      }
      return false
    },
    selectType(type) {
      this.onSelectedType(type)
    }
  }
}
