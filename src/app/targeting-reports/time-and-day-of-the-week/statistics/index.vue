<template>
  <div class="statistics">
    <statistics-action ref="statisticsAction" :filter-params="filterParams" :on-select-item-filter="onSelectItemFilter" />
    <targeting-data-grid
      ref="treeTable"
      :key="componentKey"
      :expand-unique-values="expandUniqueValues"
      :tree-data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
import Statistics from './Statistics'
export default Statistics
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
