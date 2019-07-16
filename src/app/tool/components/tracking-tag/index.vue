<template>
  <div class="tracking-tag">
    <div class="tracking-tag-content">
      <el-tabs v-model="activeType" type="card">
        <el-tab-pane :lazy="true" :label="$t('productFeed.trackingTag.stateSummary')" :name="trackingTagTypes.stateSummary">
          <state-summary v-if="activeType === trackingTagTypes.stateSummary"/>
        </el-tab-pane>
        <el-tab-pane :lazy="true" :label="$t('productFeed.trackingTag.collectedInformation')" :name="trackingTagTypes.collectedInformation">
          <collect-information v-if="activeType === trackingTagTypes.collectedInformation"/>
        </el-tab-pane>
        <el-tab-pane :lazy="true" :label="$t('productFeed.trackingTag.customTag')" :name="trackingTagTypes.customTag">
          <custom-tag v-if="activeType === trackingTagTypes.customTag" :list-tag="listData"/>
        </el-tab-pane>
        <el-tab-pane :lazy="true" :label="$t('productFeed.trackingTag.tagGuide')" :name="trackingTagTypes.tagGuide">
          <tag-guide v-if="activeType === trackingTagTypes.tagGuide" :list-tag="listData"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TrackingTag from './TrackingTag'
export default TrackingTag
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "./style.scss";
</style>
