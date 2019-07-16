<template>
  <div class="statistics-action">
    <div class="right-content">
      <div class="action-statistics-campaign">
        <el-button class="statistics-button-download">
          <svg-icon icon-class="file_download"/>
          <span>{{ $t('download') }}</span>
        </el-button>
        <div class="float-right">
          <campaign-group :on-select-item="onSelectItem" :default-value="1" :type="reportingType.campaignGroup" class="margin-left-8"/>
          <campaign-custom-column-report :on-select-item="onSelectItem" :report-type="reportType" :type="reportingType.customColumn" class="margin-left-8"/>
          <campaign-segment :on-select-item="onSelectItem" :type="reportingType.campaignSegment" class="margin-left-8"/>
          <el-select v-model="selectedRows" class="grid-rows" @change="onSelectItem(selectedRows, reportingType.rows)">
            <el-option v-for="item in rows" :key="item" :label="item + ' ' + $t('rows')" :value="item"/>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PerformanceStatisticsAction from './PerformanceStatisticsAction'
export default PerformanceStatisticsAction
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
