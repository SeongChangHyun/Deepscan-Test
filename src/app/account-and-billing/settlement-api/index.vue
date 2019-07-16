<template>
  <el-row :xs="24" :sm="24" :md="24" :lg="24" class="settlement-api">
    <el-col :xs="24" :sm="24" :md="24" :lg="24">
      <date-filter-selection class="date-filter"/>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24">
      <el-button class="button-download" @click="downloadFile()">{{ $t(`settlementApi.download`) }}</el-button>
    </el-col>
    <el-table
      :data="dataTableBototm"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%"
      border
      class="table-bottom"
    >
      <template v-if="columnsBototm.length">
        <template v-for="(column, index) in columnsBototm">
          <el-table-column
            :key="index"
            :prop="column.props"
            :label="$t(`settlementApi.${column.label}`)"
            :min-width="column.minWidth"
            :width="column.width"
            :align="column.align"
            :header-align="column.headerAlign"
            sortable
          />
        </template>
      </template>
    </el-table>
  </el-row>
</template>

<script>
import SettlementApi from './SettlementApi'
export default SettlementApi
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>
