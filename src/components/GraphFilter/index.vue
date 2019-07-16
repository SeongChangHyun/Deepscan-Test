<template>
  <el-row class="graph-filter">
    <user-statistic-data :default-value="1" :on-select-item="onSelectItem" :item-selected="itemSelectedOne" :list-item="listItem" :color-qualify="colorConfig.one" type="one"/>
    <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" class="graph-filter-vs">
      <span>Vs</span>
    </el-col>
    <user-statistic-data :default-value="2" :on-select-item="onSelectItem" :item-selected="itemSelectedTwo" :list-item="listItem" :color-qualify="colorConfig.two" type="two"/>
    <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" class="graph-filter-vs graph-filter-vs-center">
      <span>Vs</span>
    </el-col>
    <user-statistic-data :default-value="0" :on-select-item="onSelectItem" :item-selected="itemSelectedThree" :list-item="listItem" :color-qualify="colorConfig.three" type="three"/>
    <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" class="graph-filter-vs">
      <span>Vs</span>
    </el-col>
    <user-statistic-data :default-value="0" :on-select-item="onSelectItem" :item-selected="itemSelectedThree" :list-item="listItem" :color-qualify="colorConfig.four" type="four"/>
    <reporting-type :on-select-item="onSelectReportingType" class="graph-filter-date-selection" />
  </el-row>
</template>

<script>
import GraphFilter from './GraphFilter'
export default GraphFilter
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>
