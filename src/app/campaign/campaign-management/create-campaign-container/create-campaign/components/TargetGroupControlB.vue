<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <div>
        <span>{{ genI18n('description') }}</span>
      </div>

      <el-radio v-model="radio" class="h-pd-t-5" label="all">{{ genI18n('selectSpecifiedTarget') }}</el-radio>

      <div class="h-pd-t-5">
        <el-radio v-model="radio" label="custom1">{{ genI18n('setDeliveryConditions') }}</el-radio>
        <br>
        <el-select v-model="timePeriodForActivity">
          <el-option v-for="item in timePeriodList" :label="item.name" :key="item.id" :value="item.value" />
        </el-select>
      </div>

      <div class="h-pd-t-5">
        <el-radio v-model="radio" label="custom2">{{ genI18n('adsSpecifiedTargets') }}</el-radio>
        <br>
        <el-select v-model="timePeriodForSending">
          <el-option v-for="item in timePeriodList" :label="item.name" :key="item.id" :value="item.value" />
        </el-select>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { CampaignManagementConstants } from '@/common/constants'

export default {
  data() {
    return {
      radio: 'all',
      timePeriodForActivity: '1_day',
      timePeriodForSending: '1_day',
      timePeriodList: CampaignManagementConstants.TARGET_GROUP_CONTROL_B.TIME_PERIOD
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.targetGroupControlB.${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 20px 0;
}
.h-title {
  margin-top: 0px;
}
</style>
