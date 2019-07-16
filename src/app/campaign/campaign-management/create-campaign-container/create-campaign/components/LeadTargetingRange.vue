<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="container-btn">
        <div class="group-btn">
          <button class="active">{{ genI18n('topRange') }} (50,000)</button>
          <button
            :class="{ active: isMiddleActive ? 'active' : '' }"
            @click="middleClick"
          >{{ genI18n('middleRange') }} (75,000)</button>
          <button
            :class="{ active: isLowActive ? 'active' : '' }"
            @click="lowClick"
          >{{ genI18n('lowRange') }} (100,000)</button>
        </div>
        <div class="footer">
          <span>← {{ genI18n('highSimilarity') }}</span>
          <span>{{ genI18n('lowSimilarity') }} →</span>
        </div>
      </div>
      <el-checkbox v-model="dataCreateCampaign.lead_targeting_range.impression" class="h-pd-t-5">{{ genI18n('excludeUsers') }}</el-checkbox>
    </el-col>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import { LEAD_TARGETING_COVERAGE } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      isMiddleActive: false,
      isLowActive: false
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.leadTargetingRange.${params}`
      )
    },
    middleClick() {
      this.isMiddleActive = !this.isMiddleActive
      if (this.isLowActive) {
        this.isLowActive = false
      }
      this.dataCreateCampaign.lead_targeting_range.coverage = this.isMiddleActive ? LEAD_TARGETING_COVERAGE.MIDDLE : LEAD_TARGETING_COVERAGE.TOP
    },
    lowClick() {
      this.isLowActive = !this.isLowActive
      if (!this.isMiddleActive) {
        this.isMiddleActive = true
      }
      this.dataCreateCampaign.lead_targeting_range.coverage = this.isLowActive ? LEAD_TARGETING_COVERAGE.LOW : LEAD_TARGETING_COVERAGE.MIDDLE
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 10px 0;
  .h-title {
    margin-top: 0px;
  }
  .container-btn {
    padding-top: 20px;
    .group-btn {
      // border: 1px solid #ddd;
      border-left: none;
      display: flex;
      button {
        flex: 1;
        border: none;
        padding: 10px;
        border-left: 1px solid #e1e1e1;
        background-color: #f1f1f1;
        cursor: pointer;
        font-weight: bold;
      }
      button:focus {
        outline: none;
      }
      button.active {
        // background: #ccc;
        background-color: #1d93cf;
        color: #ffffff;
        font-size: 14px;
      }
    }
    .footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-weight: 600;
    }
  }
}
</style>

