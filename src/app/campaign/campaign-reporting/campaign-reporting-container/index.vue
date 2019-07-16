<template>
  <div class="campaign-reporting">
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
    padding: 0px 36px;
  }
  @media(max-width: 768px) {
  .campaign-reporting {
    padding: 0px 20px;
  }
}
</style>
