<template>
  <div class="performance-report">
    <graph-filter @onSelectItemReportingType="onSelectItemReportingType" @onSelectItemStatisticType="onSelectItemStatisticType"/>
    <graph :data-chart-converted="dataChartConverted" :graph-reporting-type="graphReportingType"/>
    <statistics/>
  </div>
</template>

<script>
import TargetingReport from './TargetingReport'
export default TargetingReport
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
