<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">{{ genI18n('title') }}</p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <div>
        <span>지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다</span>
      </div>

      <el-row>
        <el-col :xs="24" :sm="24" :md="8" :lg="24" :xl="8" class="h-pd-t-5">
          <el-checkbox>목적에 따라 상세히</el-checkbox>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="12" :xl="8" class="h-pd-t-5">
          <el-input style="width: 70px" placeholder="1" type="number"/>
          <span>목적에 따라 상세히</span>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="12" :xl="8" class="h-pd-t-5">
          <el-select v-model="value">
            <el-option label="1 day (Default)" value="1d"/>
            <el-option label="1 hours" value="1h"/>
            <el-option label="2 hours" value="2h"/>
            <el-option label="3 hours" value="3h"/>
            <el-option label="4 hours" value="4h"/>
            <el-option label="5 hours" value="5h"/>
            <el-option label="6 hours" value="6h"/>
            <el-option label="12 hours" value="12h"/>
          </el-select>
        </el-col>
      </el-row>

      <el-checkbox class="h-pd-t-5">지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따</el-checkbox>
      <br>
      <el-checkbox>목적에 따라 상세히</el-checkbox>
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

