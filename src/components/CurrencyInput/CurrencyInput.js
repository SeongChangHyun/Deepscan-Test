import { Common } from '@/common/constants'

export default {
  name: 'CurrencyInput',
  props: {
    disabled: Boolean,
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
      showControls: false,
      stepRange: this.getStepRange(),
      isInputActive: false
    }
  },
  computed: {
    displayValue: {
      get: function() {
        if (!this.value) {
          return
        }
        if (this.isInputActive) {
          return this.value.toString()
        } else {
          const label = this.currencyType === Common.CURRENCY.KOREA_TYPE ? Common.WON_ICON : (this.currencyType === Common.CURRENCY.JAPAN_TYPE ? Common.YEN_ICON : Common.DOLLAR_ICON)
          if (this.type && this.isDollarType) {
            return label + ' ' + this.value.toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          }
          if (this.type && !this.isDollarType) {
            return label + ' ' + this.value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          }
          if (!this.type && this.isDollarType) {
            return this.value.toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          }
          if (!this.type && !this.isDollarType) {
            return this.value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          }
        }
      },
      set: function(modifiedValue) {
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
        if (isNaN(newValue)) {
          newValue = 0
        }
        this.value = newValue
      }
    }
  },
  methods: {
    isDollarType() {
      return this.currencyType === Common.DOLLAR_TYPE
    },
    getStepRange() {
      if (this.currencyType === Common.CURRENCY.KOREA_TYPE) {
        return 10
      } else if (this.currencyType === Common.CURRENCY.JAPAN_TYPE) {
        return 1
      } else if (this.currencyType === Common.CURRENCY.USA_TYPE) {
        return 0.1
      }
    },
    onFocus() {
      this.showControls = true
      this.isInputActive = true
    },
    onBlur() {
      this.isInputActive = false
    },
    clickSubButton() {
      if (this.isDollarType) {
        this.value = Number((this.value - this.stepRange).toFixed(1))
      } else {
        this.value -= this.stepRange
      }
    },
    clickAddButton() {
      if (this.isDollarType) {
        this.value = Number((this.value + this.stepRange).toFixed(1))
      } else {
        this.value += this.stepRange
      }
    },
    clickOkbButton() {
      this.showControls = false
      this.changeValue(this.type, this.rowIndex, this.value)
    },
    clickCancelButton() {
      this.value = this.inputValue
      this.showControls = false
    },
    onInputChange() {
      if (this.type) {
        return
      } else {
        this.changeValue(this.type, this.rowIndex, this.value)
      }
    },
    editCurrencyValue() {
      this.showControls = true
    }
  }
}
