<template>
  <div class="campaign-reporting">
    <date-filter-selection @onSelectItemDateSelection="onSelectItemDateSelection" />
    <graph-filter @onSelectItemReportingType="onSelectItemReportingType" @onSelectItemStatisticType="onSelectItemStatisticType"/>
    <reporting-graph :data-chart-converted="dataChartConverted" :graph-reporting-type="graphReportingType"/>
    <reporting-statistics/>
  </div>
</template>

<script>
import ReportingContainer from './ReportingContainer'
export default ReportingContainer
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .campaign-reporting {
    padding: 0 15px;
    background-color: #eee;
    padding: 15px 20px;
    border: 2px solid #bbb;
  }
</style>
