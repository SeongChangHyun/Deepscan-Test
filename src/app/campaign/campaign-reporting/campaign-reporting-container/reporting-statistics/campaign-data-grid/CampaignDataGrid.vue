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
        <el-table-column v-if="column.prop === columnsKey.Status" :key="column.prop" v-bind="column" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.parent" class="fixed-column-item status-area">
              <span :class="getClassByStatus(scope.row.status)" class="status" />
              <div class="small-expand-icon">
                <el-collapse>
                  <el-collapse-item title="" name="1">
                    <div class="list-status-area">
                      <ul class="list-status">
                        <li v-for="(item, key) in getListStatus(scope.row.status)" :key="key" @click="scope.row.status = item">
                          <span :class="getClassByStatus(item)" class="status" />
                          <span class="status-label">{{ item }}</span>
                        </li>
                      </ul>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else-if="columnExpand && column.expandType" :key="column.prop" :label="$t('columnLabel.' + column.prop)" fixed width="60px" column-key="columnExpand">
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

        <el-table-column v-else-if="column.prop === columnsKey.Campaigns" :key="column.prop" :label="$t('columnLabel.' + column.prop)" v-bind="column">
          <template slot-scope="scope">
            <span class="fixed-column-item">{{ scope.row.campaigns }}</span>
            <span v-if="scope.row.parent" :class="{'campaigns-parent-row': scope.row.parent }">
              <el-button @click="goToCreativeLink(scope.row.campaigns)">
                <svg-icon :icon-class="'link_' + getClassByStatus(scope.row.status) + '_creative'" class="close-btn"/>
              </el-button>
            </span>
          </template>
        </el-table-column>

        <el-table-column v-else-if="column.prop === columnsKey.BidPrice" :key="column.prop" :label="$t('columnLabel.' + column.prop)" v-bind="column">
          <template slot-scope="scope">
            <currency-input
              v-if="scope.row.parent"
              :type="columnsKey.BidPrice"
              :input-value="data[scope.$index].bid_price"
              :row-index="scope.$index"
              :currency-type="getCurrencyType()"
              :change-value="onChangeBudget" />
            <div v-else-if="scope.row.bid_price" class="status-area creative-status">
              <span :class="getClassByStatus(scope.row.status)" class="status creative-status" />
              <div class="small-expand-icon">
                <el-collapse>
                  <el-collapse-item title="" name="1">
                    <div class="list-status-area">
                      <ul class="list-status">
                        <li v-for="(item, key) in getListStatus(scope.row.status)" :key="key" @click="scope.row.status = item">
                          <span :class="getClassByStatus(item)" class="status" />
                          <span class="status-label">{{ item }}</span>
                        </li>
                      </ul>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <span class="creative-size">{{ scope.row.bid_price }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-else-if="column.prop === columnsKey.Budget" :key="column.prop" :label="$t('columnLabel.' + column.prop)" v-bind="column" >
          <template slot-scope="scope">
            <div v-if="scope.row.parent" class="budget-column">
              <div class="budget-value">
                <currency-input
                  :type="columnsKey.Budget"
                  :input-value="data[scope.$index].budget"
                  :row-index="scope.$index"
                  :currency-type="getCurrencyType()"
                  :change-value="onChangeBudget" />
              </div>
              <div v-if="scope.row.campaign_info" class="campaign-info">
                <i class="el-icon-info"/>
                <div class="campaign-info-table">
                  <el-table :data="scope.row.campaign_info">
                    <slot name="start"/>
                    <template>
                      <template v-for="column in listCampaignInfoColumns">
                        <el-table-column :key="column" :prop="column" :label="$t('columnLabel.' + column)" />
                      </template>
                    </template>
                    <slot name="end"/>
                  </el-table>
                </div>
              </div>
            </div>
            <span v-else>{{ scope.row.budget }}</span>
          </template>
        </el-table-column>

        <el-table-column v-else v-bind="column" :key="column.prop" :label="$t('columnLabel.' + column.prop)" />

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
