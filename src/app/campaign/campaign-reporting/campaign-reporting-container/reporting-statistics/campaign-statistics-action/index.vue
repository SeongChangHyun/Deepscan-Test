<template>
  <div class="statistics-action">
    <div class="action-edit-campagin">
      <el-button :title="$t('campaignReporting.reportingAction.createCampaign')" class="campaign-action"><svg-icon icon-class="ion-compose"/></el-button>
      <el-button :title="$t('campaignReporting.reportingAction.enable')" class="campaign-action"><svg-icon icon-class="icon_activation"/></el-button>
      <el-button :title="$t('campaignReporting.reportingAction.stop')" class="campaign-action"><i class="el-icon-circle-close-outline"/></el-button>
      <el-button :title="$t('campaignReporting.reportingAction.remove')" class="campaign-action"><i class="el-icon-delete"/></el-button>
    </div>
    <div class="right-content">
      <div class="action-statistics-campagin">
        <div class="action-left">
          <el-button :title="$t('campaignReporting.reportingAction.downloadReport')" class="statistics-button-download"><svg-icon icon-class="file_download"/></el-button>
          <div class="float-right">
            <campaign-group :on-select-item="onSelectItem" :default-value="1" :type="reportingType.campaignGroup" class="statistics-dropdown margin-left-8"/>
            <campaign-custom-column-report :on-select-item="onSelectItem" :report-type="reportType" :type="reportingType.customColumn" class="statistics-dropdown margin-left-8"/>
            <campaign-segment :on-select-item="onSelectItem" :type="reportingType.campaignSegment" class="statistics-dropdown margin-left-8"/>
          </div>
        </div>
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
