<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <span class="label">
        {{ $t(`createCampaign.stepSelectCampaignObjectives.campaignGoalList.${dataCreateCampaign.campaignGoal}.title`) }}
        {{ ' > ' }}
        {{ $t(`createCampaign.stepSelectCampaignObjectives.targetingTypeList.${dataCreateCampaign.targetingType}.title`) }}
      </span>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.targetingGoleAndType.${params}`
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.h-form-input {
  .h-title {
    margin: 0;
  }
  .label{
    font-size: 0.9em;
  }
}
</style>

