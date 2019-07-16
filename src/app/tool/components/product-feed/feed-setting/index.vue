<template>
  <el-row class="feed-setting">
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
    <el-col v-if="isCreateNew" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="table-data">
      <el-button-group>
        <el-button
          :disabled="tableData.length >= 5"
          class="btnTop-product-feed"
          @click="updateStatusCreateNew">
        <img src="@/assets/icon/folder-add.png" class="icon-add">{{ $t('productFeed.addProductFeed') }}</el-button>
        <el-button
          :disabled="!itemSelected.product_feed_id"
          class="btnTop-product-feed"
          @click="showConfirmDeleteProductFeed"
        ><img src="@/assets/icon/trash.png" class="icon-add">{{ $t('productFeed.deleteProductFeed') }}</el-button>
      </el-button-group>
      <el-table ref="tableFeedsetting" :data="tableData" style="width: 100%" class="table-feed-setting">
        <el-table-column width="50" align="center">
          <template slot-scope="scope">
            <el-checkbox :value="scope.row.isSelected" @change="selectItemTable(scope.row)" />
          </template>
        </el-table-column>
        <template v-if="columns.length">
          <template v-for="(column, index) in columns">
            <el-table-column
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.minWidth"
              :width="column.width"
            />
          </template>
        </template>
      </el-table>
      <el-col class="view-text-description">
        <span class="text-description">{{ $t('productFeed.textDescriptionFeedSetting') }}</span>
      </el-col>
    </el-col>
    <el-col v-if="!isCreateNew" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <feed-setting-create
        @updateStatusCreateNew="updateStatusCreateNew"
        @createNewFeedSetting="createNewFeedSetting"
      />
    </el-col>
  </el-row>
</template>

<script>
import FeedSetting from './FeedSetting'
export default FeedSetting
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>
