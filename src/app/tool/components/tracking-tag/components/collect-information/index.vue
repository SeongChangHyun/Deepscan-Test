<template>
  <div class="collect-information">
    <div :class=" isLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
      <content-loader :speed="2" :animate="true">
        <rect x="0" y="20" rx="3" ry="3" width="400" height="8" />
        <rect x="20" y="40" rx="3" ry="3" width="320" height="8" />
        <rect x="10" y="60" rx="3" ry="3" width="360" height="8" />
        <rect x="0" y="80" rx="3" ry="3" width="400" height="8" />
        <rect x="20" y="100" rx="3" ry="3" width="320" height="8" />
        <rect x="10" y="120" rx="3" ry="3" width="360" height="8" />
      </content-loader>
    </div>
    <el-row :sx="24">
      <el-row class="collected-filter-selection">
        <date-filter-selection />
      </el-row>
      <reporting-graph
        :alow-zoom="false"
        :data-chart-converted="dataChartConverted"
        class="collected-chart"
      />
      <el-row class="table-container">
        <el-table :data="data" style="width: 100%" border>
          <template v-if="columns.length">
            <template v-for="(column, index) in columns">
              <el-table-column
                :key="index"
                :prop="column.props"
                :label="column.label"
                :min-width="column.minWidth"
                :width="column.width"
                :align="column.align"
                header-align="center"
              />
            </template>
          </template>
        </el-table>
      </el-row>
      <el-button :loading="isDownloadLoading" class="button-download" @click="downloadFile">
        <i class="el-icon-download" />
        {{ $t('productFeed.trackingTag.downloadFile') }}
      </el-button>
    </el-row>
  </div>
</template>

<script>
import CollectInformation from './CollectInformation'
export default CollectInformation
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>
