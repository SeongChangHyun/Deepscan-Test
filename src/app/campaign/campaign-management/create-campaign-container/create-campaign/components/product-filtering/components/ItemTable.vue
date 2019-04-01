<template>
  <el-row class="item w-100">
    <el-col :span="1"><svg-icon :icon-class="item.status === targetingType.TARGETED ? 'check-symbol' : 'close-button'" class="icon"/></el-col>
    <el-col :span="2">{{ item.id }}</el-col>
    <el-col :span="15">{{ item.name }}</el-col>
    <el-col :span="2">{{ item.price }}</el-col>
    <el-col :span="4"><button class="i-btn" @click="clickDelete">DEL</button></el-col>
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
    }
  },
  data() {
    return {
      tableData: this.item,
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
  line-height: 40px;
  .icon {
    width: 13px;
    height: 13px;
  }
  .i-btn {
    float: right;
    background: red;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    padding: 0px 20px;
    font-weight: bold;
    line-height: 40px;
  }
}
</style>
