<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">{{ genI18n('title') }}:</p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-checkbox
        v-model="dataCreateCampaign.premiumCampaign"
        class="h-pd-t-5"
      >{{ genI18n('setPremium') }}</el-checkbox>
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
        `createCampaign.stepCreateCampaign.premiumCampaign.${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.h-title {
  margin-top: 5px;
}
</style>

