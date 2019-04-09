<template>
  <el-row class="targeted-data item">
    <el-col :span="14">
      <span>{{ name }}</span>
    </el-col>
    <el-col :span="8"><span>{{ total }}</span></el-col>
    <el-col :span="2">
      <span>
        <svg-icon
          icon-class="close-button"
          class="close-btn"
          @click="clickDelete"
        />
      </span>
    </el-col>
  </el-row>
</template>

<script>
import { CampaignManagementConstants } from '@/common/constants'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String | Number,
      required: true
    },
    total: {
      type: String | Number,
      required: true
    }
  },
  data() {
    return {
      targetingType: CampaignManagementConstants.TARGETING_TYPE
    }
  },
  methods: {
    clickDelete() {
      this.onDelete(this.item)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
