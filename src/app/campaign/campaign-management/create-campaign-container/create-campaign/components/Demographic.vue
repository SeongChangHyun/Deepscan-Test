<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
          {{ genI18n('title') }}
        </td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          {{ genI18n('description') }}
        </td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'" type="default" class="border-0 p-1 expand-btn" @click="showContent=!showContent"/>
        </td>
      </tr>
    </table>
    <div
      :class="{ 'show': showContent }"
      class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height"
    >
      <div v-show="showContent" class="content-fields h-form-input">
        <el-radio-group>
          <el-radio class="h-pd-t-5" label="all">지정한 타겟에 대한 광고 송출 조건을 선택하신 (default)</el-radio>
          <el-radio class="h-pd-t-5" label="all">지정한 타겟에 대한 광고 송출 조건을 선택하신 (default)</el-radio>
        </el-radio-group>

        <div class="w-100 container-table h-mg-t-10">
          <div class="fl-1 content">
            <p class="header">Gender</p>

            <el-checkbox>Male</el-checkbox>
            <el-checkbox>Fermale</el-checkbox>
          </div>

          <div class="line"/>

          <div class="fl-1 content">
            <p class="header">Age</p>
            <!-- fixed -->
            <el-checkbox>16~18</el-checkbox>
            <el-checkbox>19~26</el-checkbox>
            <el-checkbox>27~34</el-checkbox>
            <el-checkbox>35~44</el-checkbox>
            <el-checkbox>Over 45</el-checkbox>
            <el-checkbox>Unknown</el-checkbox>
            <!-- dynamic -->
          </div>

          <div class="line"/>

          <div class="fl-1 content">
            <p class="header">지정한 타겟에 대한 광고 송출</p>
            <!-- fixed -->
            <el-checkbox>Less than 20 million won</el-checkbox>
            <el-checkbox>20 ~ 30 million won</el-checkbox>
            <el-checkbox>30 ~ 40 million won</el-checkbox>
            <el-checkbox>40 ~ 50 million won</el-checkbox>
            <el-checkbox>50 ~ 70 million won</el-checkbox>
            <el-checkbox>70 ~ 100 million won</el-checkbox>
            <el-checkbox>More than 100 million won</el-checkbox>
            <el-checkbox>Unknown</el-checkbox>
          </div>
        </div>

        <p>최소 1개의 값을 선택해 주세요</p>
      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.demographic.${params}`
      )
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
