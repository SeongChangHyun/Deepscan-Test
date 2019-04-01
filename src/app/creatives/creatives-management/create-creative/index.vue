<template>
  <div class="create-creative-container">
    <div class="create-creative-content">
      <el-row class="creative-type-list">
        <creative-type :creative-types="creativeTypes" :selected-type="selectedType" :on-selected-type="onSelectedType"/>
      </el-row>
      <div class="creative-type-detail">
        <fixed-banner v-if="selectedType === creativeConstant.CREATIVE_BANNER_TYPE" ref="fixedBanner" />
        <span v-else>{{ selectedType }} detail</span>
      </div>
    </div>
    <div class="action-area">
      <el-button type="info" @click="actionBack()"><i class="el-icon-caret-left"/>{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.backButtonLabel') }}</el-button>
      <el-button type="info" @click="actionSave()">{{ $t('creatives.creativeManagement.creatCreative.FixedBanner.saveButtonLabel') }}<i class="el-icon-caret-right"/></el-button>
    </div>
  </div>
</template>

<script>
import createCreativeController from './CreateCreative'
export default createCreativeController
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './CreateCreative.scss';
</style>
