<template>
  <div class="creative-type-container">
    <div class="creative-type-title">
      <strong>{{ $t('creatives.creativeManagement.createCreative.creativeTypeTitle') }}</strong>
      <span>-{{ $t('creatives.creativeManagement.createCreative.selectCreatives') }}</span>
    </div>
    <div class="creative-type-content">
      <el-row class="creative-type-list">
        <el-col v-if="hasCreativeType(creativeConstant.CREATIVE_BANNER_TYPE)" :class="{ 'selected': selectedType === creativeConstant.CREATIVE_BANNER_TYPE }" class="creative-type-item banner-type">
          <div class="item-content" @click="selectType(creativeConstant.CREATIVE_BANNER_TYPE)">
            <div class="item-title">{{ $t('creatives.creativeManagement.createCreative.bannerTitle') }}</div>
            <div class="item-description">{{ $t('creatives.creativeManagement.createCreative.bannerDescription') }}</div>
            <div>
              <div :class="{icon: true, 'active': selectedType === creativeConstant.CREATIVE_BANNER_TYPE}">
                <svg-icon :icon-class=" selectedType === creativeConstant.CREATIVE_BANNER_TYPE ? 'check-symbol' : ''" class="svg-icon"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType(creativeConstant.CREATIVE_ANIMATED_TYPE)" :class="{ 'selected': selectedType === creativeConstant.CREATIVE_ANIMATED_TYPE }" class="creative-type-item animated-type">
          <div class="item-content" @click="selectType(creativeConstant.CREATIVE_ANIMATED_TYPE)">
            <div class="item-title">{{ $t('creatives.creativeManagement.createCreative.animatedTitle') }}</div>
            <div class="item-description">{{ $t('creatives.creativeManagement.createCreative.animatedDescription') }}</div>
            <div>
              <div :class="{icon: true, 'active': selectedType === creativeConstant.CREATIVE_ANIMATED_TYPE}">
                <svg-icon :icon-class="selectedType === creativeConstant.CREATIVE_ANIMATED_TYPE ? 'check-symbol' : ''" class="svg-icon"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType(creativeConstant.CREATIVE_DYNAMIC_TYPE)" :class="{ 'selected': selectedType === creativeConstant.CREATIVE_DYNAMIC_TYPE }" class="creative-type-item dynamic-ads-type">
          <div class="item-content" @click="selectType(creativeConstant.CREATIVE_DYNAMIC_TYPE)">
            <div class="item-title">{{ $t('creatives.creativeManagement.createCreative.dynamicAdsTitle') }}</div>
            <div class="item-description">{{ $t('creatives.creativeManagement.createCreative.dynamicAdsDescription') }}</div>
            <div>
              <div :class="{icon: true, 'active': selectedType === creativeConstant.CREATIVE_DYNAMIC_TYPE}">
                <svg-icon :icon-class="selectedType === creativeConstant.CREATIVE_DYNAMIC_TYPE ? 'check-symbol' : ''" class="svg-icon"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType(creativeConstant.CREATIVE_NATIVE_TYPE)" :class="{ 'selected': selectedType === creativeConstant.CREATIVE_NATIVE_TYPE }" class="creative-type-item native-ads-type">
          <div class="item-content" @click="selectType(creativeConstant.CREATIVE_NATIVE_TYPE)">
            <div class="item-title">{{ $t('creatives.creativeManagement.createCreative.nativeAdsTitle') }}</div>
            <div class="item-description">{{ $t('creatives.creativeManagement.createCreative.nativeAdsDescription') }}</div>
            <div>
              <div :class="{icon: true, 'active': selectedType === creativeConstant.CREATIVE_NATIVE_TYPE}">
                <svg-icon :icon-class="selectedType === creativeConstant.CREATIVE_NATIVE_TYPE ? 'check-symbol' : ''" class="svg-icon"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType(creativeConstant.CREATIVE_VIDEO_TYPE)" :class="{ 'selected': selectedType === creativeConstant.CREATIVE_VIDEO_TYPE }" class="creative-type-item video-ads-type">
          <div class="item-content" @click="selectType(creativeConstant.CREATIVE_VIDEO_TYPE)">
            <div class="item-title">{{ $t('creatives.creativeManagement.createCreative.videoAdsTitle') }}</div>
            <div class="item-description">{{ $t('creatives.creativeManagement.createCreative.videoAdsDescription') }}</div>
            <div>
              <div :class="{icon: true, 'active': selectedType === creativeConstant.CREATIVE_VIDEO_TYPE}">
                <svg-icon :icon-class="selectedType === creativeConstant.CREATIVE_VIDEO_TYPE ? 'check-symbol' : ''" class="svg-icon"/>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CreativeType from './CreativeType'
export default CreativeType
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import './CreativeType.scss';
</style>
