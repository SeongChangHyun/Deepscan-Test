<template>
  <div>
    <el-row class="header-match-creatives">
      <p class="item-estimate">
        <span class="title">{{ $t('createCampaign.stepMatchCreatives.targetingReachPrediction') }}:</span>
        <span class="label">{{ $t('createCampaign.stepMatchCreatives.estimatedUV') }}</span>
        <span class="total">{{ dataMatCreatives.estimatedUV }}</span>
      </p>
    </el-row>

    <el-form
      ref="ruleForm"
      :model="dataCreateCampaign"
      :rules="rules"
      label-width="0px"
      class="demo-ruleForm"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" class="h-mg-b-20">
          <el-card>
            <TargetingGoalAndType/>
            <AdGroupName ref="adGroupName" @update-rules="updateRules" />
            <CampaignName/>

            <!-- pending -->
            <LandingUrl/>
            <!-- pending -->
            <PremiumCampaign/>

            <Location v-permission-campaign="'location'"/>
            <Language v-permission-campaign="'language'"/>
            <Device v-permission-campaign="'device'"/>
            <Budget/>
            <BidDetail/>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" class="h-mg-b-20">
          <el-card>
            <el-collapse v-model="activeExpandCard" class="expand-container">
              <el-collapse-item
                :title="$t('createCampaign.stepCreateCampaign.targetGoalTitle')"
                name="target_goal"
              >
                <TargetGroupControlA/>
                <TargetGroupControlB/>
                <!-- pending -->
                <TargetConversionType/>
              </el-collapse-item>

              <el-collapse-item
                :title="$t('createCampaign.stepCreateCampaign.targetTypeTitle')"
                name="target_type"
              >
                <!-- pending all -->
                <!-- type re-targeting non-option   -->
                <ProbabilityOfPurchase/>

                <!-- type re-targeting non-option -->
                <AutomaticallyOptimizeConversion/>

                <!-- type branding -->
                <LeadTargetingRange/>

                <!-- type topic -->
                <ArticleTopicDirectory/>

                <!-- type lead targeting -->
                <UserInterestDirectory/>

                <!-- type keyword targeting -->
                <KeywordList/>
              </el-collapse-item>

              <el-collapse-item
                :title="$t('createCampaign.stepCreateCampaign.deliverCycle.title')"
                name="deliver_cycle"
              >
                <!-- pending all -->
                <Demographic/>
                <BehaviorOfVisit/>
                <AdvertisingPosition/>
                <CustomUserGroup/>
                <ForecastOfConversion/>
                <FeedCategoryBaseUserTargeting :currency="accountInfo.view_currency" />
                <ImpressionCapping/>
                <Browser/>
                <IPAddress/>
                <OS/>
                <Carrier/>
                <ManufactureBrand/>
                <ProductFiltering/>
                <Schedule/>
                <FixedDate/>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </el-form>

    <div class="group-btn">
      <button :disabled="!activeBtnNext" class="btn-next" @click="onNext">{{ $t('btnNext') }}</button>
      <button class="btn-imp">{{ $t('btnSaveTemporary') }}</button>
      <button class="btn-cancel" @click="onCancel">{{ $t('btnCancel') }}</button>
    </div>
  </div>
</template>

<script>
import CreateCampaign from './CreateCampaign'
export default CreateCampaign
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style.scss";

.expand-container {
  border: none;
  .el-collapse-item {
    border: 1px solid #ebeef5;
    margin-bottom: 10px;
    /deep/ .el-collapse-item__header {
      padding: 20px;
    }
    /deep/ .el-collapse-item__content {
      padding: 0px 20px;
      font-size: 14px;
      color: #323a46;
    }
  }
  .el-collapse-item.is-active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    /deep/ .el-collapse-item__header {
      background: #eee;
    }
  }
}
</style>

