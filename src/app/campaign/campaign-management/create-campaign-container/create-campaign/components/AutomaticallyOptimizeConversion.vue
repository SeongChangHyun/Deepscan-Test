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
        <span>{{ genI18n('description') }}</span>
      </div>
      <el-radio-group v-model="value">
        <el-radio class="h-pd-t-5" label="all">{{ genI18n('conversion') }}</el-radio>

        <div class="group-checkbox" >
          <el-checkbox>{{ genI18n('join') }}</el-checkbox>
          <el-checkbox>{{ genI18n('purchaseComplete') }}</el-checkbox>
          <el-checkbox>{{ genI18n('oneConversion') }}</el-checkbox>
          <el-checkbox>{{ genI18n('twoConversion') }}</el-checkbox>
        </div>
        <br>
        <el-radio class="h-pd-t-5" label="custom1">{{ genI18n('conversionOfNewVisitor') }}</el-radio>
        <br>
        <el-radio class="h-pd-t-5" label="custom2">{{ genI18n('longTermDormant') }}</el-radio>
      </el-radio-group>
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
        `createCampaign.stepCreateCampaign.automaticallyOptimizeConversion.${params}`
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
  .group-checkbox{
    padding: 0 20px;
    .el-checkbox{
      margin-left: 0;
      margin-right: 20px;
    }

  }
}
</style>

