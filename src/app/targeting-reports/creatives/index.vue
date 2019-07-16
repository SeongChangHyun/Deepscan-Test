<template>
  <div class="performance-report">
    <graph-filter @onSelectItemReportingType="onSelectItemReportingType" @onSelectItemStatisticType="onSelectItemStatisticType"/>
    <reporting-graph :data-chart-converted="dataChartConverted" :graph-reporting-type="graphReportingType"/>
    <reporting-statistics/>
  </div>
</template>

<script>
import CreativesReport from './CreativesReport.js'
export default CreativesReport
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .performance-report {
    padding: 0px 36px;
  }
  @media(max-width: 768px) {
  .performance-report {
    padding: 0px 20px;
  }
}
</style>
