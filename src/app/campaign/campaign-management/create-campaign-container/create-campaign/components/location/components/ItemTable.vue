<template>
  <el-row class="item">
    <span class="fl-1">
      <svg-icon
        :icon-class="item.status == targetingType.TARGETED ? 'check-symbol' : 'close-button'"
        class="icon"
      />
      <span>{{ item.name }}</span>
    </span>
    <el-button type="danger" size="mini" class="i-btn" @click="clickDelete">{{ $t('btnDel') }}</el-button>
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
  line-height: 35px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .fl-1 {
    flex: 1;
  }
  .icon {
    width: 13px;
    height: 13px;
  }
  .i-btn {
    margin-right: 5px;
  }
}
</style>
