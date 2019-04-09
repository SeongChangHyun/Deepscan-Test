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
        <span>{{ genI18n('desc') }}</span>
      </div>
      <el-row :gutter="20" class="h-mg-t-10 container-table">
        <el-col :span="12">
          <div class="content">
            <p class="header">{{ genI18n('conversionSegment') }}</p>

            <el-checkbox
              v-for="item in conversionSegmentList"
              :key="item.value"
              @change="selectConversionSegment"
            >{{ item.name }}</el-checkbox>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="content">
            <p class="header">{{ genI18n('conversionType') }}</p>
            <!-- fixed -->
            <el-checkbox v-for="item in conversionTypeList" :key="item.value">{{ item.name }}</el-checkbox>

            <!-- dynamic -->
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { CampaignManagementConstants } from '@/common/constants'

export default {
  data() {
    return {
      showContent: false,
      conversionSegmentList:
        CampaignManagementConstants.TARGET_CONVERSION_TYPE.conversionSegment,
      conversionTypeList:
        CampaignManagementConstants.TARGET_CONVERSION_TYPE.conversionType
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.targetConversionType.${params}`
      )
    },
    selectConversionSegment(e) {}
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
  .fl-1 {
    flex: 1;
  }
  .container-table {
    .header {
      margin: 0;
      background-color: #e8ebee;
      padding: 5px 0 5px 10px;
      font-size: 14px;
    }
    .content {
      border: 1px solid #ddd;
      .el-checkbox {
        margin-left: 0;
        width: 100%;
        margin: 5px 10px 0 10px;
      }
    }
  }
}
</style>

