<template>
  <div class="statistics-action">
    <div class="action-edit-campagin">
      <el-button class="button-black">{{ $t('campaignReporting.reportingAction.createCampaign') }}</el-button>
      <el-button class="button-black">{{ $t('campaignReporting.reportingAction.enable') }}</el-button>
      <el-button class="button-black">{{ $t('campaignReporting.reportingAction.stop') }}</el-button>
    </div>
    <div class="right-content">
      <div class="action-statistics-campagin">
        <el-button class="statistics-button-download">{{ $t('campaignReporting.reportingAction.downloadReport') }}</el-button>
        <campaign-group :on-select-item="onSelectItem" :default-value="1" class="statistics-dropdown margin-left-8" type="CampaignGroup"/>
        <campaign-custom-column-report :on-select-item="onSelectItem" class="statistics-dropdown margin-left-8" type="CustomColumn"/>
        <campaign-segment :on-select-item="onSelectItem" class="statistics-dropdown margin-left-8" type="CampaignSegment"/>
      </div>
      <div class="right-menu-item">
        <autocomplete-search :source="searchSource" :keyexpr="keyExpr" :displayexpr="displayExpr" :headersearch="false" @onSearchResult="onSearchResult" />
      </div>
    </div>
  </div>
</template>

<script>
import CampaignStatisticsAction from './CampaignStatisticsAction'
export default CampaignStatisticsAction
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
