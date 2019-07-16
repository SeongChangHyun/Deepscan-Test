<template>
  <div class="data-grid-container">
    <el-table
      :data="dailyReports"
      :row-class-name="tableRowClassName"
      border
      icon-class="el-icon-plus"
      @sort-change="sort"
    >
      <template v-if="columns.length">
        <template v-for="column in columns">
          <template v-if="column.prop === 'date_time'">
            <el-table-column v-bind="column" :key="column.prop" width="200" fixed>
              <template slot-scope="scope">
                <span v-if="scope.row.isParent && !scope.row.isTotalField" class="toggle-icons" @click="toggleExpanded(scope.row)">
                  <i v-if="!scope.row.expanded" class="el-icon-plus"/>
                  <i v-else class="el-icon-minus"/>
                </span>
                <span style="margin-left: 10px">{{ scope.row.date_time }}</span>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="column" :key="column.prop" />
          </template>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script>
import DataGrid from './DataGrid'
export default DataGrid
</script>
