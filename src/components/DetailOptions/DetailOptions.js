import { CreativeConstant } from '@/common/constants'

export default {
  name: 'DetailOptionsController',
  props: {
    detailOptions: Array,
    changeDetailOptionsFormData: Function
  },
  data() {
    return {
      showDetailOptions: true
    }
  },
  methods: {
    onCheck(item) {
      const index = this.detailOptions.map(detail => detail.id).indexOf(item.id)
      if (index > -1) {
        const newDetailOptions = JSON.parse(JSON.stringify(this.detailOptions))
        // Reset input value if uncheck
        if (newDetailOptions[index] && newDetailOptions[index]['allowEdit'] === true) {
          newDetailOptions[index]['value'] = ''
        }
        newDetailOptions[index]['allowEdit'] = !item.allowEdit

        this.$emit('change-detail-options-form-data', newDetailOptions)
      }
    },
    onChange(value, item) {
      const index = this.detailOptions.map(detail => detail.id).indexOf(item.id)
      if (index > -1) {
        const newDetailOptions = JSON.parse(JSON.stringify(this.detailOptions))
        if (newDetailOptions[index]) {
          newDetailOptions[index]['value'] = value
        }
        this.$emit('change-detail-options-form-data', newDetailOptions)
      }
    },
    showOptionsArea(type) {
      if (type === CreativeConstant.OPTIONS_TYPE_DETAIL) {
        this.showDetailOptions = !this.showDetailOptions
      }
    }
  }
}
