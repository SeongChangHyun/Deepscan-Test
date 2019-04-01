<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
          {{ genI18n('impressionCapping') }}</td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          {{ genI18n('title') }}
        </td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button
            :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
            disabled
            type="default"
            class="border-0 p-1 expad-btn" />
        </td>
      </tr>
    </table>
    <div :class="{ 'show': showContent }" class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height">
      <div v-show="showContent" class="content-fields h-form-input w-100">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18" class="impression-capping-block">
            <el-row>
              <el-col :span="9">
                <el-checkbox v-model="limitTheExposure">
                  {{ $t('createCampaign.stepCreateCampaign.impressionCapping.limitTheExposure') }}</el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-input v-model="circuitSetting" style="width:50px;" />
                {{ $t('createCampaign.stepCreateCampaign.impressionCapping.circuitSetting') }}
              </el-col>
              <el-col :span="8">
                <el-select v-model="initializeEvery" placeholder="Select">
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
                <el-input v-model="circuitSettingShort" style="width:50px;" />
                {{ $t('createCampaign.stepCreateCampaign.impressionCapping.circuitSettingShort') }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-checkbox v-model="toPeopleWhoClicked">
                  {{ $t('createCampaign.stepCreateCampaign.impressionCapping.toPeopleWhoClicked') }}</el-checkbox>
              </el-col>
              <el-col :span="15">
                <el-select v-model="doNotShowAds" placeholder="Select">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                {{ $t('createCampaign.stepCreateCampaign.impressionCapping.doNotShowAds') }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-checkbox v-model="itemsYouPurchase">
                  {{ $t('createCampaign.stepCreateCampaign.impressionCapping.itemsYouPurchase') }}</el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-checkbox v-model="theItemsInTheSameCategory">
                  {{ $t('createCampaign.stepCreateCampaign.impressionCapping.theItemsInTheSameCategory') }}
                </el-checkbox>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-row>

</template>

<script>
import { CampaignManagementConstants } from '@/common/constants'

export default {
  data() {
    return {
      showContent: false,
      limitTheExposure: true,
      circuitSetting: '',
      initializeEvery: 'one_day',
      limitTheExposureOfSession: false,
      circuitSettingShort: '',
      toPeopleWhoClicked: false,
      doNotShowAds: 'one_day',
      itemsYouPurchase: false,
      theItemsInTheSameCategory: false,
      options: CampaignManagementConstants.IMPRESSION_CAPPING.INITIALIZE_EVERY
    }
  },
  computed: {},
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
