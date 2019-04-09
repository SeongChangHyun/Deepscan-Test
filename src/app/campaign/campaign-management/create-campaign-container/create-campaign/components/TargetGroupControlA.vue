<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <table class="w-100" @click="showContent=!showContent">
        <tr>
          <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
            <p class="h-title h-mg-0">{{ genI18n('title') }}:</p>
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
        <span>{{ genI18n('desc') }}</span>
      </div>

      <el-row>
        <el-checkbox v-model="targetGroupControlA.limitExposeAdsToUser">
          <span>{{ genI18n('limitExposeAdsToUser') }}</span>
          <el-input
            :disabled="!targetGroupControlA.limitExposeAdsToUser"
            v-model="targetGroupControlA.circuitSetting"
            style="width: 70px"
            placeholder="1"
            type="number"
          />
          <span>{{ genI18n('circuitSetting') }}</span>
          <el-select
            v-model="targetGroupControlA.circuitLiveTime"
            :disabled="!targetGroupControlA.limitExposeAdsToUser"
          >
            <el-option label="1 day (Default)" value="1d"/>
            <el-option label="1 hours" value="1h"/>
            <el-option label="2 hours" value="2h"/>
            <el-option label="3 hours" value="3h"/>
            <el-option label="4 hours" value="4h"/>
            <el-option label="5 hours" value="5h"/>
            <el-option label="6 hours" value="6h"/>
            <el-option label="12 hours" value="12h"/>
          </el-select>
          <span>{{ genI18n('circuitSetting') }}</span>
        </el-checkbox>
      </el-row>

      <el-checkbox
        v-model="targetGroupControlA.excludeCustomerWhoVisitedHomepage"
        class="h-pd-t-5"
      >{{ genI18n('excludeCustomerWhoVisitedHomepage') }}</el-checkbox>
      <br>
      <el-checkbox
        v-model="targetGroupControlA.disableAllOptionSetForEnforcementWithExposedAds"
      >{{ genI18n('disableAllOptionSetForEnforcementWithExposedAds') }}</el-checkbox>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showContent: false
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    targetGroupControlA() {
      return this.dataCreateCampaign.targetGroupControlA
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.targetGroupControlA.${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 20px 0;
  .h-title {
    margin-top: 0px;
  }
}
</style>

