<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">{{ genI18n('title') }}:</p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-radio-group v-model="bidDetails.valueType">
        <el-radio v-if="landingUrl.setAboutApp.status" label="CPC">{{ genI18n('CPC') }}</el-radio>
        <el-radio label="CPM">{{ genI18n('CPM') }}</el-radio>
        <el-radio label="CPVc">{{ genI18n('CPVc') }}</el-radio>
        <el-radio label="CPMg">{{ genI18n('CPMg') }}</el-radio>
        <el-radio v-if="landingUrl.setAboutApp.status" label="CPI">{{ genI18n('CPI') }}</el-radio>
        <el-radio v-if="landingUrl.setAboutApp.status" label="CPA">{{ genI18n('CPA') }}</el-radio>
      </el-radio-group>

      <table class="w-100 h-mg-t-10 h-table">
        <tr>
          <td :colspan="2">{{ genI18n('bid') }}</td>
          <td>{{ genI18n('estimateMonthlyClick') }}</td>
          <td>{{ genI18n('estimateImpressionsClick') }}</td>
          <td>{{ genI18n('estimateMonthlySpend') }}</td>
        </tr>

        <tr>
          <td>
            <input
              v-model="bidDetails.bidValue"
              :max="bidDetailsMinMax.max"
              :min="bidDetailsMinMax.min"
              type="number"
              placeholder="-"
            >
          </td>
          <td>{{ unitCurrency }}</td>
          <td>{{ bidDetails.estimateMonthlyClick }}</td>
          <td>{{ bidDetails.estimateImpressionsClick }}</td>
          <td>{{ bidDetails.estimateMonthlySpend }}</td>
        </tr>
      </table>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      showSelect: false
    }
  },
  computed: {
    ...mapState('campaign', {
      landingUrl: state => state.dataCreateCampaign.landingUrl,
      bidDetails: state => state.dataCreateCampaign.bidDetails,
      unitCurrency: state => state.unitCurrency,
      bidDetailsMinMax: state => state.bidDetailsMinMax
    }),
    bidValue() {
      return this.bidDetails.bidValue
    }
  },
  watch: {
    bidValue(bidValue) {
      this.calcEstimate()
    }
  },
  created() {},
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.bidDetail.${params}`)
    },
    calcEstimate: _.debounce(function() {
      this.$store.dispatch('campaign/bidDetailsCalcEstimate', this.bidDetails)
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  .h-title {
    margin-top: 0px;
  }
  .h-table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    td,
    th {
      border: 1px solid #dddddd;
      padding: 10px;
      text-align: center;
      input {
        border: none;
        text-align: right;
        height: 20px;
        margin: 0;
        padding: 0;
        min-width: 100px;
      }
      input:focus {
        outline: none;
      }
    }
  }
}
</style>
