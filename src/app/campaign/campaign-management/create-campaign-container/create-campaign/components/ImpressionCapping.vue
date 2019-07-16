<template>
  <HeaderItemCreateCampaign :title="genI18n('impressionCapping')" :desc="genI18n('title')">
    <el-row>
      <el-col :span="24" class="impression-capping-block">
        <el-row>
          <el-col :span="9">
            <el-checkbox v-model="limitTheExposure">
              {{ $t('createCampaign.stepCreateCampaign.impressionCapping.limitTheExposure') }}</el-checkbox>
          </el-col>
          <el-col :span="7">
            <el-input v-model="dataCreateCampaign.impression_capping.limit_user" :disabled="!limitTheExposure" style="width:50px;" />
            {{ $t('createCampaign.stepCreateCampaign.impressionCapping.circuitSetting') }}
          </el-col>
          <el-col :span="8">
            <el-select v-model="dataCreateCampaign.impression_capping.daily_capping" :disabled="!limitTheExposure" placeholder="Select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            {{ $t('createCampaign.stepCreateCampaign.impressionCapping.initializeEvery') }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-checkbox v-model="limitTheExposureOfSession">
              {{ $t('createCampaign.stepCreateCampaign.impressionCapping.limitTheExposureOfSession') }}
            </el-checkbox>
          </el-col>
          <el-col :span="15">
            <el-input v-model="dataCreateCampaign.impression_capping.session_capping" :disabled="!limitTheExposureOfSession" style="width:50px;" />
            {{ $t('createCampaign.stepCreateCampaign.impressionCapping.circuitSettingShort') }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-checkbox v-model="toPeopleWhoClicked">
              {{ $t('createCampaign.stepCreateCampaign.impressionCapping.toPeopleWhoClicked') }}</el-checkbox>
          </el-col>
          <el-col :span="15">
            <el-select v-model="dataCreateCampaign.impression_capping.display_time" :disabled="!toPeopleWhoClicked" placeholder="Select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            {{ $t('createCampaign.stepCreateCampaign.impressionCapping.doNotShowAds') }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="dataCreateCampaign.impression_capping.is_display_product">
              {{ $t('createCampaign.stepCreateCampaign.impressionCapping.itemsYouPurchase') }}</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="dataCreateCampaign.impression_capping.is_display_product_category">
              {{ $t('createCampaign.stepCreateCampaign.impressionCapping.theItemsInTheSameCategory') }}
            </el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <span>
              {{ $t('createCampaign.stepCreateCampaign.impressionCapping.cpm') }}
            </span>
          </el-col>
          <el-col :span="15">
            <el-input v-model="dataCreateCampaign.impression_capping.weight" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <span>
              {{ $t('createCampaign.stepCreateCampaign.impressionCapping.cpmr') }}
            </span>
          </el-col>
          <el-col :span="15">
            <el-input v-model="dataCreateCampaign.impression_capping.weight_rs" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
      limitTheExposure: false,
      limitTheExposureOfSession: false,
      toPeopleWhoClicked: false,
      options: CampaignManagementConstants.IMPRESSION_CAPPING.INITIALIZE_EVERY
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  created() { },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.impressionCapping.${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  .h-form-input {
    border-bottom: 1px dotted #ddd;
  }

  .impression-capping-block .el-row {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  /deep/ .el-select {
    width: 80px;
  }
</style>
