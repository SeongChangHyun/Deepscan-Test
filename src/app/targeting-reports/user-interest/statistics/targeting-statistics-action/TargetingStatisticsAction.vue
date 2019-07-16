<template>
  <el-row type="flex" justify="space-between" class="statistics-action">
    <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="action">
      <el-row class="action-items">
        <el-col :xs="8" :sm="8" :md="9" :lg="8" :xl="8" class="download-btn">
          <el-button class="statistics-button-download" @click="downloadReport">
            <svg-icon icon-class="file_download"/>
            <span>{{ $t('targetingReports.dataGrid.download') }}</span>
          </el-button>
        </el-col>
        <el-col class="spacing">
          <p/>
        </el-col>
        <el-col :xs="16" :sm="16" :md="15" :lg="16" :xl="16" class="select-campaign">
          <dropdown-campaigns :campaigns="campaigns" :gen-i18n="genI18n" class="statistics-dropdown" @on-select-campaign="onSelectCampaign"/>
        </el-col>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="8" class="select-action">
      <el-col :xs="24" :sm="24" :md="18" :lg="15" :xl="14" class="select-title">
        <span>{{ $t('creatives.creativeManagement.listCreative.select_row_des') }}</span>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="9" :xl="10" class="select-item">
        <el-select v-model="rowSelected" filterable class="select-item-value" @change="onSelectNumRow">
          <el-option v-for="item in listRow" :key="item.key" :label="item.key" :value="item.value"/>
        </el-select>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import TargetingStatisticsAction from './TargetingStatisticsAction'
export default TargetingStatisticsAction
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './style.scss';
</style>
