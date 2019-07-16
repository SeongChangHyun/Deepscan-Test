<template>
  <el-table
    ref="treeTable"
    :data="data"
    :row-style="getRowStyle"
    :row-class-name="tableRowClassName"
    v-bind="$attrs"
    class="el-tree-table"
    @sort-change="handleSort"
    v-on="$listeners">
    <slot name="start"/>
    <slot/>
    <template v-if="columns.length">
      <template v-for="column in columns">

        <el-table-column v-if="column.prop === columnsKey.Criteria1" :label="$t('targetingReports.dataGrid.columns.' + column.prop)" v-bind="column" :key="column.prop" fixed>
          <template slot-scope="scope">
            <span v-if="loadingIcon(scope.row)"><i class="el-icon-loading"/></span>
            <span v-else-if="scope.row.treeHasChildren" @click="toggleExpand(scope.row,scope.$index)">
              <i v-if="scope.row.treeExpand" class="el-icon-caret-bottom"/>
              <i v-else class="el-icon-caret-right"/>
            </span>
            <span>{{ scope.row.criteria_1 }}</span>
          </template>
        </el-table-column>

        <el-table-column v-else-if="column.prop === columnsKey.Criteria2" :label="$t('targetingReports.dataGrid.columns.' + column.prop)" v-bind="column" :key="column.prop" />
        <el-table-column v-else-if="column.prop === columnsKey.Imp" :label="$t('targetingReports.dataGrid.columns.' + column.prop)" v-bind="column" :key="column.prop" width="80" />
        <el-table-column v-else-if="column.prop === columnsKey.BidPrice" :label="$t('targetingReports.dataGrid.columns.' + column.prop)" v-bind="column" :key="column.prop" width="105" />
        <el-table-column v-else-if="column.prop === columnsKey.Conversion" :label="$t('targetingReports.dataGrid.columns.' + column.prop)" v-bind="column" :key="column.prop" width="125" />
        <el-table-column v-else :label="$t('targetingReports.dataGrid.columns.' + column.prop)" v-bind="column" :key="column.prop" width="90" />

      </template>
    </template>
    <slot name="end"/>
  </el-table>
</template>
<script>
import TargetingDataGrid from './TargetingDataGrid'
export default TargetingDataGrid
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
.el-table{
    border: 1px solid #E5E9EC;
    border-collapse: collapse;
    /deep/ th{
      border-bottom: none;
      background: #E5E9EC;
      /deep/ .cell{
        color: black;
      }

    }
    /deep/ .el-table_1_column_1  {
      border-left: 1px solid #E5E9EC;
    }
}
</style>
