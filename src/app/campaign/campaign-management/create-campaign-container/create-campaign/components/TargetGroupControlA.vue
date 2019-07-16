<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('desc')">
    <el-row class="first-row">
      <div class="left-block">
        <el-checkbox v-model="target_group_ctrl_a.is_limit_impression">
          <span>{{ genI18n('limitExposeAdsToUser') }}</span>
        </el-checkbox>
      </div>
      <div class="center-block">
        <el-input
          :disabled="!target_group_ctrl_a.is_limit_impression"
          v-model="target_group_ctrl_a.impression_count"
          :min="0"
          :max="10000"
          class="w-70"
          placeholder="1"
          type="number"
          @change="changeImpressionCount"
        />
        <span>{{ genI18n('impressionCount') }}</span>
      </div>
      <div class="right-block">
        <el-select
          :disabled="!target_group_ctrl_a.is_limit_impression"
          v-model="target_group_ctrl_a.circuit_live_time"
        >
          <el-option
            v-for="item in timePeriodList"
            :label="item.name"
            :key="item.id"
            :value="item.value"
          />
        </el-select>
        <span>{{ genI18n('impressionCount2') }}</span>
      </div>
    </el-row>

    <el-checkbox
      v-model="target_group_ctrl_a.is_exclude_customer"
      class="h-pd-t-5 exclude_customer"
    >{{ genI18n('excludeCustomerWhoVisitedHomepage') }}</el-checkbox>
    <br>
    <el-checkbox
      v-model="target_group_ctrl_a.is_disable_all_options"
    >{{ genI18n('disableAllOptionSetForEnforcementWithExposedAds') }}</el-checkbox>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import { CampaignManagementConstants } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'

export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      showContent: false,
      timePeriodList:
        CampaignManagementConstants.TARGET_GROUP_CONTROL_B.TIME_PERIOD
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    target_group_ctrl_a() {
      return this.dataCreateCampaign.target_group_ctrl_a
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.targetGroupControlA.${params}`
      )
    },
    changeImpressionCount(value) {
      if (value) {
        if (value < 0) {
          this.target_group_ctrl_a.impressionCount = 0
        }
        if (value > CampaignManagementConstants.CTR_A_LIMIT) {
          this.target_group_ctrl_a.impressionCount = CampaignManagementConstants.CTR_A_LIMIT
        }
      } else {
        this.target_group_ctrl_a.impressionCount = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 10px 0;
  .h-title {
    margin-top: 0px;
  }
  .w-70 {
    width: 70px;
  }
}

.first-row {
  display: flex;
  .left-block {
    line-height: 36px;
    margin-right: 20px;
  }
  .center-block {
    margin-right: 20px;
  }
  .right-block {
    margin-right: 20px;
    .el-select {
      width: 150px;
    }
  }
}

@media screen and (max-width: 767px) {
  .first-row {
    display: block;
    .center-block {
      padding-left: 25px;
      /deep/.el-input {
        width: 40px;
      }
    }
    .right-block {
      padding-left: 25px;
      .el-select {
        width: 120px;
        margin: 10px 0;
      }
    }
  }
  .exclude_customer {
    /deep/.el-checkbox__input {
      vertical-align: top;
    }
  }
}

</style>

