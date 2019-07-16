<template>
  <div class="reporting-type">
    <el-cascader
      :options="options"
      v-model="itemSelected"
      :placeholder="$t('campaignReporting.reportingAction.level')"
      filterable
      change-on-select
      clearable
      @change="onSelectedItem"
    />
  </div>
</template>

<script>
import CampaignGroup from './CampaignGroup'
export default CampaignGroup
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss'
</style>

