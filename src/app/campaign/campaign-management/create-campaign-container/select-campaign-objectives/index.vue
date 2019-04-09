<template>
  <div>
    <el-row :gutter="12" type="flex" class="flex-wrap">
      <CardCampaignGoal
        v-for="item in campaignGoalList"
        :title="item.key"
        :key="item.key"
        :active="item.key === activeCampaignGoal"
        :is-show="!activeCampaignGoal || item.key === activeCampaignGoal"
      />
    </el-row>

    <el-row :gutter="12" type="flex" class="flex-wrap">
      <CardCampaignTargetingType
        v-for="item in targetingTypeList"
        :title="item.key"
        :key="item.key"
        :active="item.key === activeTargetingType"
      />
    </el-row>

    <div
      v-if="activeTrackingTag"
      :class="{'marginTop20': true, 'content-tracking':true, 'active': isTrackingTag}"
    >
      <span class="title">{{ $t('createCampaign.stepSelectCampaignObjectives.trackingTag.title') }}</span>
      <div
        class="label"
      >{{ isTrackingTag ? $t('createCampaign.stepSelectCampaignObjectives.trackingTag.contentAct') : $t('createCampaign.stepSelectCampaignObjectives.trackingTag.contentDis') }}</div>
    </div>

    <div v-if="activeIndustry" class="marginTop20 content-tracking active">
      <span class="title">{{ $t('createCampaign.stepSelectCampaignObjectives.industry') }}</span>
      <div class="label">{{ industryValue }}</div>
    </div>

    <div class="group-btn marginTop20">
      <button :disabled="!activeBtnNext" class="btn-next" @click="onNext">{{ $t('btnNext') }}</button>
      <button v-if="!!activeCampaignGoal" class="btn-imp">{{ $t('btnImportTemporary') }}</button>
      <button v-if="!!activeCampaignGoal" class="btn-cancel" @click="onCancel">{{ $t('btnCancel') }}</button>
    </div>
  </div>
</template>

<script>
import SelectCampaign from './SelectCampaign'
export default SelectCampaign
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style.scss";
</style>

