<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')" :required-data="true">
    <el-row>
      <el-radio-group v-model="targetGroupControlB.value" >

        <!-- v-model="targetGroupControlB.advertisementDeliveryCondition" -->
        <el-radio
          :label="targetType.SELECT_SPECIFIED_TARGET"
          class="h-pd-t-5"
        >{{ genI18n('selectSpecifiedTarget') }}</el-radio>
        <div class="h-pd-t-5">
          <!-- v-model="targetGroupControlB.advertisementDeliveryCondition" -->
          <el-radio
            :label="targetType.SET_DELIVERY_CONDITIONS"
          >{{ genI18n('setDeliveryConditions') }}</el-radio>
          <br>
          <el-select
            :disabled="targetGroupControlB.value !== targetType.SET_DELIVERY_CONDITIONS"
            v-model="targetGroupControlB.activity_history_period"
          >
            <el-option
              v-for="item in timePeriodList"
              :label="item.name"
              :key="item.id"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="h-pd-t-5">
          <!-- v-model="targetGroupControlB.advertisementDeliveryCondition" -->
          <el-radio
            :label="targetType.ADS_SPECIFIED_TARGETS"
          >{{ genI18n('adsSpecifiedTargets') }}</el-radio>
          <br>
          <el-select
            :disabled="targetGroupControlB.value !== targetType.ADS_SPECIFIED_TARGETS"
            v-model="targetGroupControlB.sending_ads_period"
          >
            <el-option
              v-for="item in timePeriodList"
              :label="item.name"
              :key="item.id"
              :value="item.value"
            />
          </el-select>
        </div>

      </el-radio-group>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import { CampaignManagementConstants } from '@/common/constants'
import { mapState } from 'vuex'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'

export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      showContent: false,
      timePeriodList:
        CampaignManagementConstants.TARGET_GROUP_CONTROL_B.TIME_PERIOD,
      targetType: CampaignManagementConstants.TARGET_GROUP_CONTROL_B
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    targetGroupControlB() {
      return this.dataCreateCampaign.target_group_ctrl_b
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
  padding: 10px 0;
  .el-select {
    margin-left: 20px;
  }
}
.h-title {
  margin-top: 0px;
}
  .el-radio__label {
    line-height: 22px;
  }
  .el-radio {
    margin-bottom: 10px;
  }
  .el-select {
    margin-bottom: 10px !important;
  }

@media screen and (max-width: 767px) {
  .el-radio {
    display: flex;
    margin-bottom: 10px;
  }
  .el-select {
    margin-left: 25px !important;
  }
}
</style>
