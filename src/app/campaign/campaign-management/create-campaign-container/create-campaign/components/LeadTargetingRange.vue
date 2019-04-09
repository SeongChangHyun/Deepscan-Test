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
      <div class="container-btn">
        <div class="group-btn">
          <button class="active">{{ genI18n('topRange') }} (50,000)</button>
          <button :class="{ active: isMiddleActive ? 'active' : '' }" @click="middleClick">{{ genI18n('middleRange') }} (75,000)</button>
          <button :class="{ active: isLowActive ? 'active' : '' }" @click="lowClick">{{ genI18n('lowRange') }} (100,000)</button>
        </div>
        <div class="footer">
          <span>← {{ genI18n('highSimilarity') }}</span>
          <span>{{ genI18n('lowSimilarity') }} →</span>
        </div>
      </div>
      <el-checkbox class="h-pd-t-5">{{ genI18n('excludeUsers') }}</el-checkbox>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
    },
    lowClick() {
      this.isLowActive = !this.isLowActive
      if (!this.isMiddleActive) {
        this.isMiddleActive = true
      }
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
  .container-btn {
    padding: 20px;
    border: 1px solid #ddd;
    .group-btn {
      border: 1px solid #ddd;
      border-left: none;
      display: flex;
      button {
        flex: 1;
        border: none;
        padding: 10px;
        border-left: 1px solid #ddd;
        cursor: pointer;
      }
      button:focus {
        outline: none;
      }
      button.active {
        background: #ccc;
      }
    }
    .footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>

