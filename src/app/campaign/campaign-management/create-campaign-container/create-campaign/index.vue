<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <el-card>
          <TargetingGoalAndType/>
          <AdGroupName/>
          <CampaignName/>
          <LandingUrl/>
          <PremiumCampaign/>
          <Location v-permission-campaign="'location'"/>
          <Language v-permission-campaign="'language'"/>
          <Device v-permission-campaign="'device'"/>
          <Budget/>
          <BidDetail/>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <el-card>
          <el-collapse v-model="activeExpandCard" class="expand-container">
            <el-collapse-item :name="1" title="Targeting Goal Default Option">
              <TargetGroupControlA/>
              <TargetGroupControlB/>
              <TargetConversionType/>
            </el-collapse-item>

            <el-collapse-item :name="2" title="Targeting Type Default Option">
              <ProbabilityOfPurchase/>
              <AutomaticallyOptimizeConversion/>
              <LeadTargetingRange/>
              <!-- atric vs type topic, user  vs type lead tagettin -->
              <UserInterestDirectory/>

              <!-- type keyword targeting -->
              <KeywordList/>
            </el-collapse-item>

            <el-collapse-item :title="$t('createCampaign.stepCreateCampaign.deliverCycle.title')" :name="3">
              <Demographic/>
              <BehaviorOfVisit/>
              <AdvertisingPosition/>
              <CustomUserGroup/>
              <ForecastOfConversion/>
              <FeedCategoryBaseUserTargeting/>
              <ImpressionCapping/>
              <Browser/>
              <IPAddress/>
              <OS/>
              <Carrier/>
              <ManufactureBrand/>
              <ProductFiltering />
              <Schedule/>
              <FixedDate/>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>

    <el-button-group>
      <el-button
        :disabled="!activeBtnNext"
        style="margin-top: 12px;"
        @click="onNext"
      >{{ $t('btnNext') }}</el-button>
      <el-button style="margin-top: 12px;">{{ $t('btnSaveTemporary') }}</el-button>
      <el-button style="margin-top: 12px;" @click="onCancel">{{ $t('btnCancel') }}</el-button>
    </el-button-group>
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

