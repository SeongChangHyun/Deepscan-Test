<template>
  <el-row class="graph">
    <line-chart :chart-data="lineChartData" :options-chart="optionsChart"/>
  </el-row>
</template>

<script>
import Graph from './Graph'
export default Graph
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
