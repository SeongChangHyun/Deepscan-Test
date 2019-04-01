<template>
  <div class="reporting-type">
    <el-cascader
      :options="options"
      v-model="itemSeleted"
      :placeholder="$t('campaignReporting.reportingAction.level')"
      filterable
      change-on-select
      clearable
      @change="onSeletecItem"
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

