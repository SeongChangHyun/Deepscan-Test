<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">{{ genI18n('title') }}</td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          {{ genI18n('feedYourUser') }}<br>
          {{ genI18n('youCanGroupBy') }}
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
          <el-col :span="18">
            <el-row>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column
                  :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.feedCategory')"
                  width="200">
                  <el-table-column width="140">
                    <template slot-scope="scope">
                      <el-input v-model="price" class="text-right" placeholder="-" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="currency" width="60" />
                </el-table-column>
                <el-table-column
                  :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.categoryInformation')"
                  prop="info" />
                <el-table-column
                  :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.productCount')"
                  prop="product_count"
                  width="120" />
                <el-table-column
                  :label="$t('createCampaign.stepCreateCampaign.feedCategoryBaseUser.averagePrice')"
                  prop="average_price"
                  width="120" />
              </el-table>
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
      price: '',
      tableData: CampaignManagementConstants.FEED_CATEGORY_BASE_USER.INITIALIZE_DATA_TABLE
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.feedCategoryBaseUser.${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .h-form-input {
    border-bottom: 1px dotted #ddd;
  }
</style>
