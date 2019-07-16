<template>
  <div class="state-summary">
    <div class="selectDate">
      <span>{{ showCurrentDateTime() }}</span>
    </div>
    <div :class=" productListLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
      <content-loader :speed="2" :animate="true">
        <rect x="0" y="20" rx="3" ry="3" width="400" height="8" />
        <rect x="20" y="40" rx="3" ry="3" width="320" height="8" />
        <rect x="10" y="60" rx="3" ry="3" width="360" height="8" />
        <rect x="0" y="80" rx="3" ry="3" width="400" height="8" />
        <rect x="20" y="100" rx="3" ry="3" width="320" height="8" />
        <rect x="10" y="120" rx="3" ry="3" width="360" height="8" />
      </content-loader>
    </div>
    <el-table
      :data="feedSummaryData"
      :empty-text="$t('productFeed.emptyText')"
      class="product-feed-data"
    >
      <template v-for="column in feedSummaryTableColumn">
        <el-table-column :key="column.id" v-bind="column"/>
      </template>
    </el-table>
    <div class="graph-area">
      <template>
        <reporting-graph :data-chart-converted="dataChartConverted" :alow-zoom="zoom"/>
      </template>
    </div>
    <div class="products-list">
      <el-row class="search-options">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="products-list-text">
          <span>{{ $t('productFeed.productList') }}</span>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="group-radio-options">
          <el-radio-group v-model="radioDefaultActive" @change="handleSearchType">
            <el-radio :label="radioSearchLabel[0]" class="radio-btn-all">{{ $t('productFeed.all') }}</el-radio>
            <el-radio :label="radioSearchLabel[1]" class="radio-btn-id">{{ $t('productFeed.id') }}</el-radio>
            <el-radio :label="radioSearchLabel[2]" class="radio-btn-name">{{ $t('productFeed.name') }}</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row type="flex" class="search-items">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="search-input">
          <el-input v-model="searchText" :placeholder="$t('productFeed.search')" class="search-box" @input="handleInput">
            <img slot="append" class="icon-search" src="@/assets/icon/search-icon.png" @click="handleSearchDataGrid">
          </el-input>
          <div v-if="searchText.length > 0 && showLoading" class="loading-popup">
            <div :class=" showLoading ? 'show-loading loading-layer' : 'hide-loading loading-layer'">
              <content-loader :speed="2" :animate="true">
                <rect x="0" y="20" rx="3" ry="3" width="400" height="8" />
                <rect x="20" y="40" rx="3" ry="3" width="320" height="8" />
                <rect x="10" y="60" rx="3" ry="3" width="360" height="8" />
                <rect x="0" y="80" rx="3" ry="3" width="400" height="8" />
                <rect x="20" y="100" rx="3" ry="3" width="320" height="8" />
                <rect x="10" y="120" rx="3" ry="3" width="360" height="8" />
              </content-loader>
            </div>
          </div>
          <div v-if="searchText.length > 0 && listProduct.length > 0 && showList" class="container-item" @scroll="handleScroll">
            <div v-for="item in listProduct" :key="item.id" class="suggest-item" @click="handleClickItem">{{ item.product_id + ' - '+ item.product_name }}</div>
          </div>
          <div v-if="searchText.length > 0 && showEmpty" class="empty-container-item" @scroll="handleScroll">
            <span>{{ $t('productFeed.emptyText') }}</span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="12" :xl="10" class="select-row">
          <el-col :xs="24" :sm="24" :md="16" :lg="15" :xl="15" class="select-title">
            <span>{{ $t('productFeed.numOfRow') }}</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="9" :xl="9" class="select-item">
            <el-select v-model="rowSelected" class="select-row-limit" @change="onSelectNumRow">
              <el-option v-for="item in listRow" :key="item.key" :label="item.key" :value="item.value"/>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="productListData"
      :empty-text="$t('productFeed.emptyText')"
      class="product-list-data"
    >
      <template v-for="column in productListTableColumns">
        <el-table-column v-if="['image_url'].includes(column.prop)" :key="column.prop" v-bind="column">
          <template slot-scope="scope">
            <img :src="scope.row.image_url" class="pan-thumb">
          </template>
        </el-table-column>
        <el-table-column v-else-if="['category_name'].includes(column.prop)" :key="column.prop" v-bind="column">
          <template slot-scope="scope">
            <span>{{ scope.row.category_name !== '' && scope.row.category_name !== null ? scope.row.category_name : 'none' }}</span>
          </template>
        </el-table-column>
        <el-table-column v-else-if="['product_name'].includes(column.prop)" :key="column.prop" v-bind="column">
          <template slot-scope="scope">
            <el-tooltip :disabled="scope.row.product_name_length < column.width ? true : false" :content="scope.row.product_name" placement="top" effect="light">
              <a :href="scope.row.desktop_url ? scope.row.desktop_url : scope.row.mobile_url" target="_blank">{{ scope.row.product_name }}</a>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column v-else :key="column.prop" v-bind="column"/>
      </template>
    </el-table>
    <pagination v-bind="paginationOptions" @pagination="handlePagging"/>
  </div>
</template>

<script>
import StateSummary from './StateSummary'
export default StateSummary
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>
