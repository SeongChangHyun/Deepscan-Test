<template>
  <div class="graph-filter">
    <div class="graph-filter-dropdown">
      <user-statistic-data :default-value="1" :on-select-item="onSelectItem" :item-selected="itemSelectedOne" :list-item="listItem" :color-qualify="colorConfig.one" type="one"/>
      <span class="graph-filter-vs">VS</span>
      <user-statistic-data :default-value="2" :on-select-item="onSelectItem" :item-selected="itemSelectedTwo" :list-item="listItem" :color-qualify="colorConfig.two" type="two"/>
      <span class="graph-filter-vs graph-filter-vs-center">VS</span>
      <user-statistic-data :default-value="0" :on-select-item="onSelectItem" :item-selected="itemSelectedThree" :list-item="listItem" :color-qualify="colorConfig.three" type="three"/>
      <span class="graph-filter-vs">VS</span>
      <user-statistic-data :default-value="0" :on-select-item="onSelectItem" :item-selected="itemSelectedFour" :list-item="listItem" :color-qualify="colorConfig.four" type="four"/>
    </div>
    <reporting-type :on-select-item="onSelectReportingType" class="graph-filter-date-selection" />
  </div>
</template>

<script>
import GraphFilter from './GraphFilter'
export default GraphFilter
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
