<template>
  <div>
    <el-row class="header-match-creatives">
      <el-col :sm="24" :xs="24" :md="24" :xl="12" :lg="12">
        <div class="item">
          <p class="title">{{ $t('createCampaign.stepCreateCampaign.targetingGoalAndType.title') }}:</p>
          <span class="label">
            {{ $t(`createCampaign.stepSelectCampaignObjectives.campaignGoalList.${dataCreateCampaign.campaignGoal}.title`) }}
            {{ ' > ' }}
            {{ $t(`createCampaign.stepSelectCampaignObjectives.targetingTypeList.${dataCreateCampaign.targetingType}.title`) }}
          </span>
        </div>
        <div class="item">
          <p class="title">{{ $t('createCampaign.stepCreateCampaign.adGroupName.title') }}:</p>
          <span class="label">{{ dataMatCreatives.ifoCampaign.adGroupName }}</span>
        </div>
        <div class="item">
          <p class="title">{{ $t('createCampaign.stepCreateCampaign.campaignName.title') }}:</p>
          <span class="label">{{ dataMatCreatives.ifoCampaign.campaignName }}</span>
        </div>
      </el-col>
      <el-col :sm="24" :xs="24" :md="24" :xl="12" :lg="12">
        <p class="item-estimate">
          <span
            class="title"
          >{{ $t('createCampaign.stepMatchCreatives.targetingReachPrediction') }}:</span>
          <span class="label">{{ $t('createCampaign.stepMatchCreatives.estimatedUV') }}</span>
          <span class="total">{{ dataMatCreatives.estimatedUV }}</span>
        </p>
      </el-col>
    </el-row>

    <div class="create-creative-content">
      <el-row class="creative-type-list">
        <creative-type
          :creative-types="creativeTypes"
          :selected-type="selectedType"
          :on-selected-type="onSelectedType"
        />
      </el-row>
      <div class="creative-type-detail">
        <component
          ref="creativeComponent"
          :is="currentComponent"
          :is-match-campaign="true"
          :type-creative="dataCreateCampaign.landingUrl.setAboutApp.status ? creativeConstant.CAMPAIGN_TYPE.APP_CAMPAIGN : creativeConstant.CAMPAIGN_TYPE.WEB_CAMPAIGN"
          :app-information="{
            ios: {
              appId: dataCreateCampaign.landingUrl.setAboutApp.ios.appId || dataCreateCampaign.landingUrl.setAboutApp.ios.appIdCheck,
              country: 'KR'
            },
            android: {
              appId: dataCreateCampaign.landingUrl.setAboutApp.android.appId || dataCreateCampaign.landingUrl.setAboutApp.android.appIdCheck,
              country: 'KR'
            }
          }"
          @submit-creative-form="actionSubmit"
        />
      </div>
    </div>

    <div class="group-btn marginTop20">
      <button class="btn-back" @click="onBack">{{ $t('btnBack') }}</button>
      <button class="btn-save">{{ $t('btnSave') }}</button>
    </div>
  </div>
</template>

<script>
import MatchCreatives from './MatchCreatives'
export default MatchCreatives
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style.scss";
</style>

