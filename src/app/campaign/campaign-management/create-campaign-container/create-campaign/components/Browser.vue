<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
          {{ $t('createCampaign.stepCreateCampaign.browser.browser') }}
        </td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          {{ $t('createCampaign.stepCreateCampaign.browser.description') }}
        </td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button
            :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
            type="default"
            class="border-0 p-1 expand-btn"
            @click="showContent=!showContent" />
        </td>
      </tr>
    </table>
    <div :class="{ 'show': showContent }" class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height">
      <div v-show="showContent" class="content-fields h-form-input">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18">
            <div>
              <el-row>
                <el-radio v-model="radio" label="disabled">
                  {{ $t('createCampaign.stepCreateCampaign.browser.sendAdsToAll') }}</el-radio>
              </el-row>
              <el-row>
                <el-radio v-model="radio" label="selected and disabled">
                  {{ $t('createCampaign.stepCreateCampaign.browser.weWillSendOutAds') }}</el-radio>
              </el-row>
            </div>
            <el-row>
              <el-col :span="12" class="allow-browser">
                <p>{{ $t('createCampaign.stepCreateCampaign.browser.allowBrowser') }}</p>
                <div class="block-checkbox">
                  <el-row v-for="browser in listBrowser" :key="browser.id">
                    <el-col :span="12">
                      <el-checkbox :label="browser.name" v-model="browser.isCheck">{{ $t(browser.name) }}</el-checkbox>
                    </el-col>
                    <el-col :span="12" class="text-right">{{ browser.amount }}</el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12" class="block-browser">
                <p>{{ $t('createCampaign.stepCreateCampaign.browser.blockBrowser') }}</p>
                <div class="block-checkbox">
                  <el-row v-for="browser in listBrowser" :key="browser.id">
                    <el-col :span="12">
                      <el-checkbox :label="browser.name" :disabled="browser.isCheck">{{ $t(browser.name) }}
                      </el-checkbox>
                    </el-col>
                    <el-col :span="12" class="text-right">{{ browser.amount }}</el-col>
                  </el-row>
                </div>
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
      radio: 'disabled',
      listBrowser: CampaignManagementConstants.BROWSER_TYPE
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .h-form-input {
    border-bottom: 1px dotted #ddd;
  }

  .allow-browser {
    padding: 15px;
  }

  .block-browser {
    padding: 15px;
  }

  .block-checkbox {
    padding: 10px;
    border: 1px solid #cccccc;
  }

  .text-right {
    text-align: right;
  }
</style>
