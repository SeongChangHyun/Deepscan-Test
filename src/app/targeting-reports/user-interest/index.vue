<template>
  <div class="user-interest">
    <graph-filter @onSelectItemStatisticType="onSelectItemStatisticType" @onSelectItemReportingType="onSelectItemReportingType"/>
    <reporting-graph :graph-reporting-type="graphReportingType" :data-chart-converted="dataChartConverted"/>
    <statistics/>
  </div>
</template>

<script>
import UserInterest from './UserInterest'
export default UserInterest
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
