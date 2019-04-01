<template>
  <el-row>
    <el-col :span="16">{{ item.name }}</el-col>
    <el-col :span="2">{{ item.total }}</el-col>
    <el-col :span="6" class="button-list">
      <span v-if="status === targetingType.TARGETED">{{ 'Targeted' }}</span>
      <span v-if="status === targetingType.EXCLUDED">{{ 'Excluded' }}</span>
      <span v-if="status === targetingType.DEFAULT">
        <span @click="onTarget">{{ 'Target' }}</span>
        {{ ' | ' }}
        <span @click="onExclude">{{ 'Exclude' }}</span>
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
    status: {
      type: Number,
      required: true
    },
    clickTarget: {
      type: Function,
      required: true
    },
    clickExclude: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      targetingType: CampaignManagementConstants.TARGETING_TYPE
    }
  },
  methods: {
    onTarget() {
      this.clickTarget(this.item)
    },
    onExclude() {
      this.clickExclude(this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  padding: 5px 15px;
}
  .button-list {
    text-align: right;
  }
</style>
