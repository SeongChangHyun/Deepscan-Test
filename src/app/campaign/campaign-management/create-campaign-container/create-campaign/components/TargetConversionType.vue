<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <div>
        <span>지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다 지정한 타겟에 대한 가능합니다</span>
      </div>
      <div class="w-100 container-table h-mg-t-10">
        <div class="fl-1 content">
          <p class="header">지정한 타겟에 대한 광고</p>

          <el-checkbox>1st Conversion</el-checkbox>
          <el-checkbox>2nd Conversion</el-checkbox>
        </div>

        <div class="line"/>

        <div class="fl-1 content">
          <p class="header">지정한 타겟에 대한 광고 송출</p>
          <!-- fixed -->
          <el-checkbox>회원가입(Join)</el-checkbox>
          <el-checkbox>상품결제(PurchaseComplete)</el-checkbox>

          <!-- dynamic -->
          <el-checkbox>1st Conversion</el-checkbox>
          <el-checkbox>2nd Conversion</el-checkbox>
        </div>

        <p>최소 1개의 값을 선택해 주세요</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      value: '1d'
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

