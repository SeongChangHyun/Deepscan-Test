<template>
  <div class="graph">
    <!-- <button @click="changData">Change data graph</button> -->
    <el-row style="background:#fff;padding:16px 16px 0">
      <line-chart :chart-data="lineChartData" :options-chart="optionsChart"/>
    </el-row>
  </div>
</template>

<script>
import ReportingGraph from './ReportingGraph'
export default ReportingGraph
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
