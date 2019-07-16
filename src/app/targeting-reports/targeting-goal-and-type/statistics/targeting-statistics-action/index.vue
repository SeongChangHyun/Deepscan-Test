<template>
  <el-row class="statistics-action">
    <el-button class="statistics-button-download">
      <i class="el-icon-download"/>
      <span>{{ $t('targetingReports.dataGrid.download') }}</span>
    </el-button>

    <el-select v-model="selectedCampaign" :placeholder="$t('targetingReports.filter.selectCampaignPlaceholder')" filterable class="statistics-dropdown">
      <el-option v-for="campaign in listCampaign" :key="campaign.id" :label="campaign.name" :value="campaign.id"/>
    </el-select>

    <el-select v-model="selectedTargetingType" :placeholder="$t('targetingReports.filter.selectTargetingTypePlaceholder')" multiple filterable collapse-tags class="statistics-dropdown">
      <el-option v-for="item in listTargetingType" :key="item.value" :label="$t('targetingReports.filter.targetingType.' + item.value)" :value="item.value" :disabled="item.label">
        {{ $t('targetingReports.filter.targetingType.' + item.value) }}
      </el-option>
    </el-select>

    <el-select v-model="selectedTargeting" :placeholder="$t('targetingReports.filter.selectTargetingPlaceholder')" class="statistics-dropdown">
      <el-option v-for="item in listTargeting" :key="item" :label="$t('targetingReports.filter.' + item)" :value="item"/>
    </el-select>
  </el-row>
</template>

<script>
import TargetingStatisticsAction from './TargetingStatisticsAction'
export default TargetingStatisticsAction
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
