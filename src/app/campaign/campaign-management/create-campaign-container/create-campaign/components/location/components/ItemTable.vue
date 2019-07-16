<template>
  <el-row class="targeted-data item">
    <el-col :span="14">
      <span v-if="status === targetingType.TARGETED" class="targeted mg-r-10">T</span>
      <span v-if="status === targetingType.EXCLUDED" class="excluded mg-r-10">E</span>
      <span>{{ name }}</span>
    </el-col>
    <el-col :span="9">
      <span>{{ total }}</span>
    </el-col>
    <el-col :span="1">
      <span>
        <svg-icon icon-class="close-button" class="close-btn" @click="clickDelete"/>
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
      type: [String, Number],
      required: true
    },
    status: {
      type: [String, Number],
      required: true
    },
    total: {
      type: [String, Number],
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
.item {
  padding-left: 15px;
  padding-right: 15px;
}
.close-btn {
  margin-top: 5px;
}
.mg-r-10 {
  margin-right: 10px;
}
</style>
