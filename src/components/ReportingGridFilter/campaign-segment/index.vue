<template>
  <div class="reporting-type">
    <el-cascader
      :options="options"
      v-model="itemSelected"
      :placeholder="$t('campaignReporting.reportingAction.segment')"
      filterable
      change-on-select
      clearable
      @change="onSelectedItem"
    />
  </div>
</template>

<script>
import CampaignSegment from './CampaignSegment'
export default CampaignSegment
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss'
</style>

