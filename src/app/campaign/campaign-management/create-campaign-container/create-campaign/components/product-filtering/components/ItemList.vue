<template>
  <el-row class="item">
    <el-col :span="16">{{ item.name }}</el-col>
    <el-col :span="2">{{ item.total }}</el-col>
    <el-col :span="8" class="text-right">
      <span v-if="status === targetingType.TARGETED" class="targeted">{{ $t('targetingType.targeted') }}</span>
      <span v-if="status === targetingType.EXCLUDED" class="excluded">{{ $t('targetingType.excluded') }}</span>
      <span v-if="status === targetingType.DEFAULT">
        <span class="target" @click="onTarget">{{ $t('targetingType.target') }}</span>
        {{ ' | ' }}
        <span class="exclude" @click="onExclude">{{ $t('targetingType.exclude') }}</span>
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
