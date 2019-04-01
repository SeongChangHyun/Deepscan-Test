import { Common } from '@/common/constants'

export default {
  name: 'CurrencyInput',
  props: {
    type: String,
    inputValue: Number,
    rowIndex: Number,
    currencyType: String,
    changeValue: Function
  },
  data() {
    return {
      value: this.inputValue,
      focused: false,
      showControls: true,
      stepRange: this.getStepRange()
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getStepRange() {
      if (this.currencyType === Common.WON_TYPE) {
        return 10
      } else if (this.currencyType === Common.YEN_TYPE) {
        return 1
      } else if (this.currencyType === Common.DOLLAR_TYPE) {
        return 0.1
      }
    },
    onFocus() {
      this.showControls = true
    },
    clickSubButton() {
      this.value -= this.stepRange
    },
    clickAddButton() {
      this.value += this.stepRange
    },
    clickOkbButton() {
      // TO DO: handle click ok button
      this.showControls = false
      this.changeValue(this.type, this.rowIndex, this.value)
    },
    clickCancelButton() {
      this.value = this.inputValue
      this.showControls = false
    }
  }
}
