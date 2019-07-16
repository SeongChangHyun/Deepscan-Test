<template>
  <div class="daily-reporting">
    <graph-filter
      :hide-report-type="true"
      @onSelectItemStatisticType="onSelectItemStatisticType"
    />
    <reporting-graph :data-chart-converted="dataChartConverted" :graph-reporting-type="graphReportingType"/>
    <div class="actions-filters-bar">
      <el-row>
        <el-col :xs="24" :sm="6" :md="4" :lg="12" :xl="12">
          <div>
            <el-button class="download-btn"><img src="@/assets/images/file_download_material@3x.png" class="download-icon">{{ genI18n('download') }}</el-button>
            <dropdown-campaigns
              :campaigns="campaigns"
              :gen-i18n="genI18n"
              @on-select-campaign="onSelectCampaign"
            />
          </div>
        </el-col>
        <el-col :xs="12" :sm="6" :md="8" :lg="12" :xl="12">
          <div>
            <campaign-custom-column-report :report-type="reportType" :on-select-item="onSelectColumn" class="statistics-dropdown margin-left-8" type="CustomColumn"/>
            <campaign-segment :on-select-item="onSelectSegment" class="statistics-dropdown margin-left-8" type="CampaignSegment"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <data-grid
      :columns="columns"
      :daily-reports="dailyReports"
      @handle-sort="handleSort"
      @remove-children="removeChildren"
      @add-children="addChildren"
    />
  </div>
</template>

<script>
import DailyReportingContainer from './DailyReportingContainer'
export default DailyReportingContainer
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './style.scss'
</style>
