<template>
  <div class="statistics">
    <statistics-action :on-select-item-filter="onSelectItemFilter" />
    <campaign-data-grid
      ref="treeTable"
      :key="componentKey"
      :expand-unique-values="expandUniqueValues"
      :tree-data="data"
      :columns="columns"
    />
  </div>
</template>

<script>
import ReportingStatistics from './ReportingStatistics'
export default ReportingStatistics
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
