<template>
  <div class="state-summary py-3 bg-white">
    <el-row :sx="24" class="pb-3">
      <tracking-tag-top />
    </el-row>
    <el-row :sx="24" class="pb-3">
      <reporting-graph :alow-zoom="false" :data-chart-converted="dataChartConverted" class="collected-chart" />
    </el-row>
    <el-row :sx="24">
      <tracking-tag-bottom />
    </el-row>
  </div>
</template>

<script>
import StateSummaryController from './StateSummaryController'
export default StateSummaryController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./stateSummary.scss";
</style>
