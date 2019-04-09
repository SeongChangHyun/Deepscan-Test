<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td
          class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title"
        >{{ genI18n('title') }}</td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          <span v-if="!showContent">{{ genI18n('description') }}</span>
        </td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button
            :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
            type="default"
            class="border-0 p-1 expand-btn"
          />
        </td>
      </tr>
    </table>
    <div :class="{ 'show': showContent }">
      <!-- class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height" -->
      <div v-show="showContent" class="content-fields h-form-input">
        <el-row>
          <span>{{ genI18n('description') }}</span>
        </el-row>
        <el-row>
          <!-- <el-col :span="6">&nbsp;</el-col> -->
          <el-col :span="24">
            <el-radio-group v-model="radio">
              <el-radio label="all" class="h-pd-t-5">{{ genI18n('sendToALl') }}</el-radio>
              <el-radio label="single" class="h-pd-t-5">{{ genI18n('sendToSpecific') }}</el-radio>
            </el-radio-group>

            <div class="w-100 container-table h-mg-t-10">
              <div class="fl-1 content">
                <p class="header">{{ genI18n('gender') }}</p>
                <el-checkbox v-for="item in genderType" :key="item.id">{{ item.name }}</el-checkbox>
              </div>

              <div class="line"/>

              <div class="fl-1 content">
                <p class="header">{{ genI18n('age') }}</p>
                <el-checkbox v-for="item in ageRange" :key="item.id">{{ item.name }}</el-checkbox>
              </div>

              <div class="line"/>

              <div class="fl-1 content">
                <p class="header">{{ genI18n('incomeLevel') }}</p>
                <el-checkbox v-for="item in incomeLevel" :key="item.id">{{ item.name }}</el-checkbox>
              </div>
            </div>
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
      genderType: CampaignManagementConstants.DEMO_GRAPHIC.GENDER_TYPE,
      ageRange: CampaignManagementConstants.DEMO_GRAPHIC.AGE_RANGE,
      incomeLevel: CampaignManagementConstants.DEMO_GRAPHIC.INCOME_LEVEL,
      radio: 'all'
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.demographic.${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 5px 0;
  .h-title {
    margin-top: 0px;
  }
  .el-radio {
    margin: 0;
    padding-right: 15px;
  }
  .fl-1 {
    flex: 1;
  }
  .container-table {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    .header {
      margin: 0;
      text-align: center;
    }
    .line {
      width: 1px;
      align-self: stretch;
      background: #ddd;
      margin: 15px 0;
    }
    .content {
      padding: 10px;
      .el-checkbox {
        margin-left: 0;
        width: 100%;
        /deep/ .el-checkbox__inner {
          height: 28px;
          width: 28px;
        }
        /deep/ .el-checkbox__inner::after {
          height: 14px;
          width: 6px;
          left: 10px;
          top: 3px;
        }
      }
    }
  }
}
</style>
