<template>
  <el-row class="w-100 container-table">
    <el-col :span="1"><svg-icon :icon-class="item.status === targetingType.TARGETED ? 'check-symbol' : 'close-button'" class="icon"/></el-col>
    <el-col :span="2">{{ item.id }}</el-col>
    <el-col :span="15">{{ item.name }}</el-col>
    <el-col :span="2">{{ item.price }}</el-col>
    <el-col :span="4"><button class="i-btn" @click="clickDelete">{{ $t('btnDel') }}</button></el-col>
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
  .container-table {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    .header {
      margin: 0;
      text-align: center;
    }
    .line {
      width: 1px;
      align-self: stretch;
      background: #ddd;
      margin: 15px 0;
    }
    .content {
      padding: 10px;
    }
    .el-tree {
      border: 1px solid #ddd;
      margin: 20px;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        .targeted,.target {
          color: #6DC0B7;
        }
        .exclude,.excluded {
          color: #9E99DB
        }
      }
    }
  }
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
