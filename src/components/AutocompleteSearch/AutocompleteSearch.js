export default {
  name: 'AutocompleteSearch',
  props: {
    source: {
      type: Array,
      required: true
    },
    keyexpr: {
      type: String,
      required: true
    },
    displayexpr: {
      type: String,
      required: true
    },
    headersearch: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      searchValue: '',
      showSearch: !this.headersearch,
      isheadersearch: this.headersearch
    }
  },
  computed: {
  },
  watch: {
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  methods: {
    click() {
      this.showSearch = !this.showSearch
      if (this.showSearch) {
        this.searchValue = ''
        setTimeout(() => {
          this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
        }, 500)
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.showSearch = false
    },
    getFieldNameValue(sourceItem, fieldNamePath) {
      if (!fieldNamePath) {
        return ''
      }
      let currentItem = sourceItem
      fieldNamePath = fieldNamePath.split('.')
      for (var i = 0; i < fieldNamePath.length; ++i) {
        var key = fieldNamePath[i]
        if (key in currentItem) {
          currentItem = currentItem[key]
        }
      }
      return currentItem
    },
    change(value) {
      let selectedItem
      for (const item of this.source) {
        if (value === this.getFieldNameValue(item, this.keyexpr)) {
          selectedItem = item
        }
      }
      this.searchValue = selectedItem.name
      this.$emit('onSearchResult', selectedItem)
    }
  }
}
