<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">{{ genI18n('title') }}:</p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-radio-group v-model="bid_detail.bid_type">
        <template v-for="item in revenueRange">
          <el-radio v-if="landingUrl.setAboutApp.status && item.bid_type === revenueRangeBidType.cpi" :label="item.bid_type" :key="item.bid_type">{{ revenueRangeBidType[item.bid_type] }}</el-radio>
          <el-radio v-else :label="item.bid_type" :key="item.bid_type">{{ revenueRangeBidType[item.bid_type] }}</el-radio>
        </template>
      </el-radio-group>

      <el-row class="table-container">
        <table class="h-mg-t-10 h-table">
          <tr>
            <th :colspan="2">{{ genI18n('bid') }}</th>
            <th>{{ genI18n('estimateMonthlyClick') }}</th>
            <th>{{ genI18n('estimateImpressionsClick') }}</th>
            <th>{{ genI18n('estimateMonthlySpend') }}</th>
          </tr>

          <tr>
            <td>
              <el-form
                ref="ruleForm"
                :model="bid_detail"
                :rules="rules"
                label-width="0px"
                class="demo-ruleForm"
              >
                <el-form-item prop="bidValue">
                  <el-input
                    v-model.number="bid_detail.bid"
                    :max="bidDetailsMinMax.max"
                    :min="bidDetailsMinMax.min"
                    type="number"
                    placeholder="-"
                  />
                </el-form-item>
              </el-form>
            </td>
            <td class="bg-gray">{{ unitCurrency }}</td>
            <td>{{ estimateMonthlyClick }}</td>
            <td>{{ estimateImpressionsClick }}</td>
            <td>{{ estimateMonthlySpend }}</td>
          </tr>
        </table>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { RevenueRangeType, REVENUE_RANGE_BID_TYPE } from '@/common/constants'
import _ from 'lodash'

export default {
  data() {
    return {
      estimateMonthlyClick: 0,
      estimateImpressionsClick: 0,
      estimateMonthlySpend: 0,
      revenueRangeBidType: REVENUE_RANGE_BID_TYPE
    }
  },
  computed: {
    ...mapState('campaign', {
      landingUrl: state => state.dataCreateCampaign.landingUrl,
      bid_detail: state => state.dataCreateCampaign.bid_detail,
      unitCurrency: state => state.unitCurrency,
      revenueRange: state => state.revenueRange
    }),
    bidDetailsMinMax() {
      let bidDetailsMinMax = {
        min: 0,
        max: false
      }
      const revenueRangeValue = this.revenueRange[`${this.bid_detail.bid_type}`.toLowerCase()]
      if (revenueRangeValue) {
        const revenueRangeValueBidDevice = revenueRangeValue[this.landingUrl.setAboutApp.status ? RevenueRangeType.MOBILE : RevenueRangeType.PC]
        if (revenueRangeValueBidDevice) {
          bidDetailsMinMax = {
            max: parseInt(revenueRangeValueBidDevice.max),
            min: parseInt(revenueRangeValueBidDevice.min)
          }
        }
      }
      return bidDetailsMinMax
    },
    bidValue() {
      return this.bid_detail.bid
    },
    rules() {
      return {
        bid_detail: [
          {
            validator: this.checkBidValue,
            trigger: 'blur'
          }
        ]
      }
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
    calcEstimate: _.debounce(async function() {
      const data = await this.$store.dispatch(
        'campaign/bidDetailsCalcEstimate',
        this.bid_detail
      )
      this.estimateMonthlyClick = data.monthly_click
      this.estimateImpressionsClick = data.monthly_impression
      this.estimateMonthlySpend = data.monthly_spend
    }, 500),
    checkBidValue(rule, value, callback) {
      if (!Number.isInteger(value)) {
        callback()
      } else {
        if (value < this.bidDetailsMinMax.min) {
          callback(
            new Error(
              `${this.genI18n('title')} should be ${
                this.bidDetailsMinMax.min
              } to ${this.bidDetailsMinMax.max}`
            )
          )
        } else if (
          this.bidDetailsMinMax.max &&
          value > this.bidDetailsMinMax.max
        ) {
          callback(
            new Error(
              `${this.genI18n('title')} should be ${
                this.bidDetailsMinMax.min
              } to ${this.bidDetailsMinMax.max}`
            )
          )
        } else {
          callback()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  .h-title {
    margin-top: 0px;
  }
  .el-radio {
    margin: 0;
    padding-right: 15px;
  }
  .table-container {
    overflow: auto;
  }
  .h-table {
    border-collapse: collapse;
    width: 100%;
    td,
    th {
      border: 1px solid #dee3e9;
      padding: 10px;
      text-align: center;
      font-size: 0.9em;
      .el-input {
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
    .bg-gray {
      background-color: #f9fafd;
      color: #979fa7;
    }
  }
}
</style>
