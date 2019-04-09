<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <table class="w-100" @click="showContent=!showContent">
        <tr>
          <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
            <p class="h-title h-mg-0">
              {{ genI18n('title') }}
              <sup>*</sup>:
            </p>
          </td>
          <td class="el-col-md-17 el-col-sm-17 el-col-xs-24 align-middle float-none p-0">
            <!-- <span v-if="!showContent">{{ genI18n('desc') }}</span> -->
          </td>
          <td class="el-col-md-1 el-col-sm-1 el-col-xs-24 align-middle float-none p-0 text-right">
            <el-button
              :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
              type="default"
              class="border-0 p-1 expand-btn"
            />
          </td>
        </tr>
      </table>
    </el-col>

    <el-col v-if="showContent" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div>
        <span>{{ genI18n('description') }}</span>
      </div>

      <el-radio
        v-model="targetGroupControlB.advertisementDeliveryCondition"
        class="h-pd-t-5"
        label="all"
      >{{ genI18n('selectSpecifiedTarget') }}</el-radio>

      <div class="h-pd-t-5">
        <el-radio
          v-model="targetGroupControlB.advertisementDeliveryCondition"
          label="custom1"
        >{{ genI18n('setDeliveryConditions') }}</el-radio>
        <br>
        <el-select
          :disabled="targetGroupControlB.advertisementDeliveryCondition !== 'custom1'"
          v-model="targetGroupControlB.timePeriodForActivityHistory"
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
        <el-radio
          v-model="targetGroupControlB.advertisementDeliveryCondition"
          label="custom2"
        >{{ genI18n('adsSpecifiedTargets') }}</el-radio>
        <br>
        <el-select
          :disabled="targetGroupControlB.advertisementDeliveryCondition !== 'custom2'"
          v-model="targetGroupControlB.timePeriodForSendingAdsToUser"
        >
          <el-option
            v-for="item in timePeriodList"
            :label="item.name"
            :key="item.id"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { CampaignManagementConstants } from '@/common/constants'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showContent: false,
      timePeriodList:
        CampaignManagementConstants.TARGET_GROUP_CONTROL_B.TIME_PERIOD
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    targetGroupControlB() {
      return this.dataCreateCampaign.targetGroupControlB
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
  .el-select {
    margin-left: 20px;
  }
}
.h-title {
  margin-top: 0px;
}
</style>
