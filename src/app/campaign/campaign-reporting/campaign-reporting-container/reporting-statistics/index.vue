<template>
  <div class="statistics">
    <statistics-action :on-select-item-filter="onSelectItemFilter" />
    <campaign-data-grid
      ref="treeTable"
      :expand-unique-values="expandUniqueValues"
      :tree-data="data"
      :columns="columns"
      style="width: 100%"
    />
  </div>
</template>

<script>
import ReportingStatistics from './ReportingStatistics'
export default ReportingStatistics
</script>
