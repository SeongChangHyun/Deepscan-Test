<template>
  <div class="product-feed">
    <el-tabs type="border-card">
      <el-tab-pane :lazy="true" :label="$t('productFeed.stateSummary')" class="state-summary">
        <state-summary/>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="$t('productFeed.feedSetting')" class="feed-setting">
        <feed-setting/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProductFeed from './ProductFeed'
export default ProductFeed
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>
