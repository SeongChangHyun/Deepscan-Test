<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>
      </p>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div>
        <span>{{ genI18n('description') }}</span>
      </div>
      <el-radio-group v-model="automaticallyOptimizeConversion.value">
        <el-radio :label="TypeConversion.CONVERSION" class="h-pd-t-5">{{ genI18n('conversion') }}</el-radio>

        <div class="group-checkbox">
          <el-checkbox
            :disabled="automaticallyOptimizeConversion.value !== TypeConversion.CONVERSION"
          >{{ genI18n('join') }}</el-checkbox>
          <el-checkbox
            :disabled="automaticallyOptimizeConversion.value !== TypeConversion.CONVERSION"
          >{{ genI18n('purchaseComplete') }}</el-checkbox>
          <el-checkbox
            :disabled="automaticallyOptimizeConversion.value !== TypeConversion.CONVERSION"
          >{{ genI18n('oneConversion') }}</el-checkbox>
          <el-checkbox
            :disabled="automaticallyOptimizeConversion.value !== TypeConversion.CONVERSION"
          >{{ genI18n('twoConversion') }}</el-checkbox>
        </div>
        <br>
        <el-radio
          :label="TypeConversion.CONVERSION_OF_NEW_VISITOR"
          class="h-pd-t-5"
        >{{ genI18n('conversionOfNewVisitor') }}</el-radio>
        <br>
        <el-radio
          :label="TypeConversion.LONG_TERM_DORMANT"
          class="h-pd-t-5"
        >{{ genI18n('longTermDormant') }}</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { AutomaticallyOptimizeConversion } from '@/common/constants'

export default {
  data() {
    return {
      TypeConversion: AutomaticallyOptimizeConversion
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign']),
    automaticallyOptimizeConversion() {
      return this.dataCreateCampaign.automaticallyOptimizeConversion
    }
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
  .group-checkbox {
    padding: 0 20px;
    .el-checkbox {
      margin-left: 0;
      margin-right: 20px;
    }
  }
}
</style>

