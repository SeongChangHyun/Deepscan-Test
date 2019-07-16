<template>
  <div>
    <i v-if="type" :class="boxValue ? 'el-icon-check' : 'el-icon-close'" />
    <div v-if="!type">
      {{ getMessage() }}
    </div>
  </div>
</template>

<script>
import { trackingTag } from '@/common/constants'

export default {
  name: 'CheckboxCell',
  props: {
    data: {
      type: Number,
      default: 0
    },
    type: {
      type: Boolean,
      default: false
    },
    tagName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      trackingTag
    }
  },
  computed: {
    boxValue() {
      return this.data > (this.tagName === trackingTag.CLICK_USER ? 10 : 1000)
    }
  },
  methods: {
    getMessage() {
      return this.$t(`productFeed.trackingTag.${this.tagName === trackingTag.CLICK_USER ? this.boxValue ? 'checkClickUser' : 'unCheckClickUser' : this.boxValue ? 'checkAll' : 'unCheckAll'}`)
    }
  }
}
</script>
