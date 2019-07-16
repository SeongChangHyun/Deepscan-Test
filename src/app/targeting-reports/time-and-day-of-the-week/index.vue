<template>
  <div class="targeting-report">
    <graph-filter @onSelectItemReportingType="onSelectItemReportingType" @onSelectItemStatisticType="onSelectItemStatisticType"/>
    <graph :data-chart-converted="dataChartConverted" :graph-reporting-type="graphReportingType"/>
    <statistics :filter-params="filterParams" :on-change-filter-params="onChangeFilterParams"/>
  </div>
</template>

<script>
import TimeAndDayReport from './TimeAndDayReport'
export default TimeAndDayReport
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
