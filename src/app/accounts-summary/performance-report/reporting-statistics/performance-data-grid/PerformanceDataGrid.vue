<template>
  <el-table
    ref="treeTable"
    :data="data"
    :row-style="getRowStyle"
    :row-class-name="tableRowClassName"
    :max-height="gridMaxHeight"
    v-bind="$attrs"
    class="el-tree-table"
    @sort-change="handleSort"
    v-on="$listeners">
    <slot name="start"/>
    <slot/>
    <template v-if="columns.length">
      <template v-for="column in columns">

        <el-table-column v-if="column.prop === columnsKey.AccountName" v-bind="column" :key="column.prop" :label="$t('columnLabel.' + column.prop)" fixed>
          <template slot-scope="scope">
            <span v-if="loadingIcon(scope.row)"><i class="el-icon-loading"/></span>
            <span v-else-if="scope.row.treeHasChildren" @click="toggleExpand(scope.row,scope.$index)">
              <i v-if="scope.row.treeExpand" class="el-icon-caret-bottom"/>
              <i v-else class="el-icon-caret-right"/>
            </span>
            <span>{{ scope.row.account_name }}</span>
          </template>
        </el-table-column>

        <el-table-column v-else v-bind="column" :key="column.prop" :label="$t('columnLabel.' + column.prop)" />

      </template>
    </template>
    <slot name="end"/>
  </el-table>
</template>
<script>
import PerformanceDataGrid from './PerformanceDataGrid'
export default PerformanceDataGrid
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
