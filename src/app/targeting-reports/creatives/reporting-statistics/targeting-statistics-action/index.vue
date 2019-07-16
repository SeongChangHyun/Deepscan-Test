<template>
  <div class="statistics-action">
    <div class="right-content">
      <div class="action-statistics-campaign">
        <el-button class="statistics-button-download">
          <i class="el-icon-download"/>
          <span>{{ $t('targetingReports.dataGrid.download') }}</span>
        </el-button>
        <el-select v-model="selectedGroup" :placeholder="$t('targetingReports.filter.selectTargetingPlaceholder')" class="statistics-dropdown">
          <el-option v-for="item in listGroupFilter" :key="item.name" :label="item.name" :value="item.name"/>
        </el-select>
        <el-select v-model="selectedItem" :placeholder="$t('targetingReports.filter.selectTargetingTypePlaceholder')" class="statistics-dropdown">
          <el-option v-for="item in listItem" :key="item.value" :label= "item.name" :value="item.name">
            <i v-if="!item.name" class="el-icon-arrow-down"/> {{ item.name }}
          </el-option>
        </el-select>
        <el-select v-model="selectedCampaign" :placeholder="$t('targetingReports.filter.selectCampaignPlaceholder')" class="statistics-dropdown">
          <el-option v-for="campaign in listCampaign" :key="campaign.id" :label="campaign.name" :value="campaign.id"/>
        </el-select>
      </div>
      <campaign-custom-column-report :on-select-item="onSelectItem" :report-type="reportType" :type="reportingType.customColumn" class="margin-left-8"/>
    </div>
  </div>
</template>

<script>
import TargetingStatisticsAction from './TargetingStatisticsAction'
export default TargetingStatisticsAction
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
