<template>
  <div class="container-cp">
    <div class="step-content">
      <div class="line">
        <div :style="`width:${(stepActive - 1) * 100 / 2 }%`"/>
      </div>

      <div class="step-list">
        <div
          :class="{
            'step-item': true,
            'active': stepActive >= CampaignManagementConstants.STEP_SELECT_CAMPAIGN_OBJECTIVES,
            'label-hide': stepActive != CampaignManagementConstants.STEP_SELECT_CAMPAIGN_OBJECTIVES
          }"
        >
          <div class="icon">
            <span>{{ CampaignManagementConstants.STEP_SELECT_CAMPAIGN_OBJECTIVES }}</span>
          </div>
          <p class="label">{{ $t('createCampaign.stepSelectCampaignObjectives.title') }}</p>
        </div>

        <div
          :class="{
            'step-item': true,
            'active': stepActive >= CampaignManagementConstants.STEP_CREATE_CAMPAIGN,
            'label-hide': stepActive != CampaignManagementConstants.STEP_CREATE_CAMPAIGN
          }"
        >
          <div class="icon">
            <span>{{ CampaignManagementConstants.STEP_CREATE_CAMPAIGN }}</span>
          </div>
          <p class="label">{{ $t('createCampaign.stepCreateCampaign.title') }}</p>
        </div>

        <div
          :class="{
            'step-item': true,
            'active': stepActive >= CampaignManagementConstants.STEP_MATCH_CREATIVES,
            'label-hide': stepActive != CampaignManagementConstants.STEP_MATCH_CREATIVES,
          }"
        >
          <div class="icon">
            <span>{{ CampaignManagementConstants.STEP_MATCH_CREATIVES }}</span>
          </div>
          <p class="label">{{ $t('createCampaign.stepMatchCreatives.title') }}</p>
        </div>
      </div>

      <div/>
    </div>

    <router-view class="content-campaign"/>
    <!-- <el-button style="margin-top: 12px;" @click="nextStep">Next step</el-button> -->
  </div>
</template>

<script>
import CreateCampaign from './CreateCampaign'
export default CreateCampaign
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style.scss";
</style>

