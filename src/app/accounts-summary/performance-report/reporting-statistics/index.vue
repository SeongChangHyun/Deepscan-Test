<template>
  <div class="statistics">
    <div class="grid-filter-area">
      <statistics-action :on-select-item-filter="onSelectItemFilter" />
    </div>
    <performance-data-grid
      ref="treeTable"
      :key="componentKey"
      :expand-unique-values="expandUniqueValues"
      :tree-data="tableData"
      :columns="columns"
    />
    <div class="panigation-area">
      <el-pagination
        v-if="total > 0"
        :prev-text="$t('previous')"
        :next-text="$t('next')"
        :page-size="filterParams.limit"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="changePage"/>
    </div>
  </div>
</template>

<script>
import ReportingStatistics from './ReportingStatistics'
export default ReportingStatistics
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
