<template>
  <el-table
    ref="treeTable"
    :data="data"
    :row-style="getRowStyle"
    :row-class-name="tableRowClassName"
    v-bind="$attrs"
    class="el-tree-table"
    @sort-change="handleSort"
    @selection-change="handleSelectionChange"
    v-on="$listeners">
    <slot name="start"/>
    <slot/>
    <el-table-column
      type="selection"
      width="30"/>
    <template v-if="columns.length">
      <template v-for="column in columns">
        <el-table-column v-if="columnExpand && column.expandType" :key="column.prop" fixed width="30px" column-key="columnExpand">
          <template slot-scope="scope">
            <div :style="`margin-left: ${scope.row.treeLevel * columnExpandIndent}px;`">
              <span v-if="loadingIcon(scope.row)"><i class="el-icon-loading"/></span>
              <span v-else-if="scope.row.treeHasChildren" @click="toggleExpand(scope.row,scope.$index)">
                <i v-if="scope.row.treeExpand" :class="expandIcon"/>
                <i v-else :class="collapseIcon"/>
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-else-if="column.prop === 'campaigns'" :key="column.prop" v-bind="column">
          <template slot-scope="scope">
            <div v-if="scope.row.parent" class="fixed-column-item status-area">
              <span :class="getClassByStatus(scope.row.status)" class="status" />
              <div class="small-expand-icon">
                <i :class="expandIcon"/>
                <div class="list-status-area">
                  <ul class="list-status">
                    <li v-for="(item, key) in getListStatus(scope.row.status)" :key="key" :class="getClassByStatus(item)" class="item-status" @click="scope.row.status = item" />
                  </ul>
                </div>
              </div>
            </div>
            <span class="fixed-column-item">{{ scope.row.campaigns }}</span>
            <span v-if="scope.row.parent" :class="{'campaigns-parent-row': scope.row.parent }"><el-button @click="goToCreativeLink(scope.row.campaigns)"> A </el-button></span>
          </template>
        </el-table-column>

        <el-table-column v-else-if="column.prop === 'bid_price'" :key="column.prop" v-bind="column">
          <template slot-scope="scope">
            <currency-input
              v-if="scope.row.parent"
              :type="'bid_price'"
              :input-value="data[scope.$index].bid_price"
              :row-index="scope.$index"
              :currency-type="getCurrencyType()"
              :change-value="onChangeBudget" />
            <div v-else-if="scope.row.bid_price" class="status-area">
              <span :class="getClassByStatus(scope.row.status)" class="status creative-status" />
              <span class="small-expand-icon"><i :class="expandIcon"/></span>
              <div class="list-status-area">
                <ul class="list-status">
                  <li v-for="(item, key) in getListStatus(scope.row.status)" :key="key" :class="getClassByStatus(item)" class="item-status" @click="scope.row.status = item" />
                </ul>
              </div>
              <span>{{ scope.row.bid_price }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-else-if="column.isBudget" :key="column.prop" v-bind="column" >
          <template slot-scope="scope">
            <currency-input
              v-if="scope.row.parent"
              :type="'budget'"
              :input-value="data[scope.$index].budget"
              :row-index="scope.$index"
              :currency-type="getCurrencyType()"
              :change-value="onChangeBudget" />
            <span v-else>{{ scope.row.budget }}</span>
          </template>
        </el-table-column>

        <el-table-column v-else v-bind="column" :key="column.prop" />

      </template>
    </template>
    <slot name="end"/>
  </el-table>
</template>
<script>
import CampaignDataGrid from './CampaignDataGrid'
export default CampaignDataGrid
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './style.scss';
</style>
