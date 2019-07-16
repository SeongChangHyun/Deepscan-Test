<template>
  <div class="statistics">
    <statistics-action @download-report="handleDownloadReport" @select-num-row="onSelectNumRow" @select-campaign="onSelectCampaign"/>
    <el-table :data="paginatedData" class="grid-data-table" @sort-change="handleSort" >
      <el-table-column v-for="column in columns" v-bind="column" :fixed="(fixColumnLabel.indexOf(column.label) > -1) && (deviceWidth >= Common.DEVICE_WIDTH.PC_FIX_COLUMN) ? true : false" :label="$t('targetingReports.dataGrid.columns.' + column.label)" :key="column.prop" :min-width="column.minwidth" align="center"/>
    </el-table>
    <pagination v-bind="paginationOptions" @pagination="handlePagging"/>
  </div>
</template>

<script>
import Statistics from './Statistics'
export default Statistics
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'style.scss';
</style>

