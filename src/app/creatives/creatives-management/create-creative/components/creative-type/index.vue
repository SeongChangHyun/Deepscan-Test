<template>
  <div class="creative-type-container">
    <div class="creative-type-title">
      <strong>Creative type</strong>
      <span>-{{ $t('creatives.creativeManagement.creatCreative.selectCreatives') }}</span>
    </div>
    <div class="creative-type-content">
      <el-row class="creative-type-list">
        <el-col v-if="hasCreativeType('banner')" :class="{ 'selected': selectedType === 'banner' }" class="creative-type-item banner-type">
          <div class="item-content" @click="selectType('banner')">
            <div class="item-title">{{ $t('creatives.creativeManagement.creatCreative.bannerTitle') }}</div>
            <div class="item-image" />
            <div class="item-description">{{ $t('creatives.creativeManagement.creatCreative.bannerDescription') }}</div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType('animated')" :class="{ 'selected': selectedType === 'animated' }" class="creative-type-item animated-type">
          <div class="item-content" @click="selectType('animated')">
            <div class="item-title">{{ $t('creatives.creativeManagement.creatCreative.animatedTitle') }}</div>
            <div class="item-image"/>
            <div class="item-description">{{ $t('creatives.creativeManagement.creatCreative.animatedDescription') }}</div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType('dynamic')" :class="{ 'selected': selectedType === 'dynamic' }" class="creative-type-item dynamic-ads-type">
          <div class="item-content" @click="selectType('dynamic')">
            <div class="item-title">{{ $t('creatives.creativeManagement.creatCreative.dynamicAdsTitle') }}</div>
            <div class="item-image" />
            <div class="item-description">{{ $t('creatives.creativeManagement.creatCreative.dynamicAdsDescription') }}</div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType('native')" :class="{ 'selected': selectedType === 'native' }" class="creative-type-item native-ads-type">
          <div class="item-content" @click="selectType('native')">
            <div class="item-title">{{ $t('creatives.creativeManagement.creatCreative.nativeAdsTitle') }}</div>
            <div class="item-image" />
            <div class="item-description">{{ $t('creatives.creativeManagement.creatCreative.nativeAdsDescription') }}</div>
          </div>
        </el-col>
        <el-col v-if="hasCreativeType('video')" :class="{ 'selected': selectedType === 'video' }" class="creative-type-item video-ads-type">
          <div class="item-content" @click="selectType('video')">
            <div class="item-title">{{ $t('creatives.creativeManagement.creatCreative.videoAdsTitle') }}</div>
            <div class="item-image" />
            <div class="item-description">{{ $t('creatives.creativeManagement.creatCreative.videoAdsDescription') }}</div>
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
