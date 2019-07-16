<template>
  <HeaderItemCreateCampaign
    :title="$t('createCampaign.stepCreateCampaign.browser.browser')"
    :desc="$t('createCampaign.stepCreateCampaign.browser.description')"
  >
    <el-row>
      <el-col :span="24">
        <div>
          <el-radio-group v-model="dataCreateCampaign.browser.is_all">
            <el-row>
              <el-radio
                :label="STRING_NUMBER.ONE"
              >{{ $t('createCampaign.stepCreateCampaign.browser.sendAdsToAll') }}</el-radio>
            </el-row>
            <el-row>
              <el-radio
                :label="STRING_NUMBER.ZERO"
              >{{ $t('createCampaign.stepCreateCampaign.browser.weWillSendOutAds') }}</el-radio>
            </el-row>
          </el-radio-group>
        </div>
        <el-row v-if="dataCreateCampaign.browser.is_all === STRING_NUMBER.ZERO">
          <el-col :xs="24" :sm="12" class="allow-browser">
            <el-row class="allow-title">
              <span
                class="fw-bold"
              >{{ $t('createCampaign.stepCreateCampaign.browser.allowBrowser') }}</span>
            </el-row>
            <div class="block-checkbox-wrap">
              <el-checkbox-group v-model="dataCreateCampaign.browser.allows">
                <el-checkbox
                  v-for="browser in listBrowser"
                  :key="browser.code"
                  :label="browser.code"
                  :disabled="dataCreateCampaign.browser.blocks.includes(browser.code)"
                >
                  <span>{{ browser.name }}</span>
                  <span>{{ browser.startCount }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" class="block-browser">
            <el-row class="allow-title">
              <span
                class="fw-bold"
              >{{ $t('createCampaign.stepCreateCampaign.browser.blockBrowser') }}</span>
            </el-row>
            <div class="block-checkbox-wrap">
              <el-checkbox-group v-model="dataCreateCampaign.browser.blocks">
                <el-checkbox
                  v-for="browser in listBrowser"
                  :key="browser.code"
                  :label="browser.code"
                  :disabled="dataCreateCampaign.browser.allows.includes(browser.code)"
                >
                  <span>{{ browser.name }}</span>
                  <span>{{ browser.startCount }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
import { STRING_NUMBER } from '@/common/constants'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      STRING_NUMBER
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listBrowser'])
  },
  created() {
    this.$store.dispatch('campaign/loadListBrowser')
  },
  methods: {}
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
.block-checkbox-wrap {
  border: 1px solid #e8ebee;
  padding: 10px 0;
  .el-checkbox {
    margin-left: 0;
    width: 100%;
    margin: 5px 10px;
    display: flex;
    /deep/ el-checkbox__input {
      padding-top: 2px;
    }
    /deep/ .el-checkbox__label {
      display: flex;
      flex: 1;
      justify-content: space-between;
      padding-right: 20px;
    }
  }
}
.block-checkbox {
  padding: 10px;
}

.text-right {
  text-align: right;
}
.allow-title {
  background-color: #e8ebee;
  width: 100%;
  height: 40px;
  border-block-end: 1px solid #e8ebee;
  align-items: center;
  padding: 10px;
}
.fw-bold {
  font-weight: 600;
}

@media only screen and (max-width: 768px) {
  .allow-browser,
  .block-browser {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }
}
</style>
