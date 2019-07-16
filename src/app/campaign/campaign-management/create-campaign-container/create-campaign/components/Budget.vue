<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-checkbox v-model="applyBudgetByDay " class="w-100">
        <span class="dl-bg-op">{{ genI18n('applyBudgetByDay') }}</span>
      </el-checkbox>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item prop="campaign_budget.budget_count">
            <el-input
              v-model="campaign_budget.budget_count"
              :disabled="applyBudgetByDay"
              :placeholder="genI18n('placeholderBudget')"
              type="number"
              class="h-pd-b-5"
            >
              <template slot="append">{{ unitCurrency }}</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-select v-model="campaign_budget.budget_type" :disabled="applyBudgetByDay" class="h-pd-b-5 w-100">
            <el-option :value="budgetType.LIMITED_TIME_TYPE.PER_DAY" :label="genI18n('perDay')"/>
            <el-option :value="budgetType.LIMITED_TIME_TYPE.PER_WEEK" :label=" genI18n('perWeek')"/>
            <el-option
              :value="budgetType.LIMITED_TIME_TYPE.PER_MONTH"
              :label="genI18n('perMonth')"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row v-if="applyBudgetByDay" :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="budget-by-day-container">
            <el-row v-for="date in campaign_budget.budge_dates" :key="date.date" class="date-row">
              <el-col :span="12"><span class="date-label">{{ genI18n(date.date.toLowerCase()) }}</span></el-col>
              <el-col :span="12"><el-input v-model="date.count" class="date-value"/></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      {{ campaign_budget.start_date }}
      {{ campaign_budget.end_date }}
      <el-checkbox v-model="dailyBudgetOption " class="w-100">
        <span class="dl-bg-op">{{ genI18n('dailyBudgetOption') }}</span>
      </el-checkbox>

      <div v-if="dailyBudgetOption">
        <el-radio-group v-model="campaign_budget.budget_expenses_distribute" class="h-pd-t-5 h-mg-l-10">
          <el-radio
            :label="budgetType.DISTRIBUTION_TYPE.ACCELERATED"
            class="w-100"
          >{{ genI18n('accelerated') }}</el-radio>
          <el-radio
            :label="budgetType.DISTRIBUTION_TYPE.STANDARD"
            class="w-100"
          >{{ genI18n('standard') }}</el-radio>
        </el-radio-group>

        <el-card class="h-mg-t-10">
          <el-select v-model="campaign_budget.type" class="h-pd-b-5 w-100">
            <el-option
              :value="budgetType.LIVE_TIME_OF_CAMPAIGN_TYPE.LIVE_AD_FROM_TODAY"
              :label="genI18n('liveAd')"
            />
            <el-option
              :value="budgetType.LIVE_TIME_OF_CAMPAIGN_TYPE.START_AND_END_DATE_SETTING"
              :label="genI18n('startAndEndDate')"
            />
          </el-select>

          <div>
            <div class="content-end-date">
              <div class="label start">
                <span>{{ genI18n('start') }}</span>
              </div>
              <div>
                <el-date-picker
                  v-model="startDate"
                  :disabled="campaign_budget.type === budgetType.LIVE_TIME_OF_CAMPAIGN_TYPE.LIVE_AD_FROM_TODAY"
                  type="date"
                  placeholder="YYYY-MM-DD"
                  class="h-pd-t-5 mw-170px"
                />
                <el-time-picker
                  v-model="startTime"
                  :disabled="campaign_budget.type === budgetType.LIVE_TIME_OF_CAMPAIGN_TYPE.LIVE_AD_FROM_TODAY"
                  format="HH:mm"
                  placeholder="HH:mm"
                  class="h-pd-t-5 h-pd-b-5 mw-120px"
                />
              </div>
            </div>

            <div class="content-end-date">
              <div class="label end">
                <span class="n-wrap">{{ genI18n('end') }}</span>
              </div>
              <div>
                <el-checkbox v-model="noEndDate" class="h-pd-t-5 n-wrap">{{ genI18n('noEndDate') }}</el-checkbox>
                <br>
                <el-date-picker
                  v-model="endDate"
                  :disabled="noEndDate"
                  type="date"
                  placeholder="YYYY-MM-DD"
                  class="h-pd-t-5 mw-170px"
                />
                <el-time-picker
                  v-model="endTime"
                  :disabled="noEndDate"
                  format="HH:mm"
                  placeholder="HH:mm"
                  class="h-pd-t-5 h-pd-b-5 mw-120px"
                />
                <br>
                <span class="n-wrap">
                  <i>{{ timeZone }}</i>
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { CampaignManagementConstants, Common } from '@/common/constants'
import moment from 'moment'

export default {
  data() {
    return {
      budgetType: CampaignManagementConstants.BUDGET,
      dailyBudgetOption: false,
      applyBudgetByDay: false,
      startDate: '',
      startTime: '',
      noEndDate: true,
      endDate: '',
      endTime: ''
    }
  },
  computed: {
    ...mapState('campaign', {
      campaign_budget: state => state.dataCreateCampaign.campaign_budget,
      unitCurrency: state => state.unitCurrency,
      timeZone: state => state.timeZone,
      showErr: state => state.errorCampaign.budget
    }),
    value() {
      return this.campaign_budget.budget
    }
  },
  watch: {
    value(val) {
      this.$store.dispatch('campaign/setErrorCampaign', { budget: !val })
    },
    startDate(val) {
      this.campaign_budget.period.date_from = moment(
        `${moment(this.startDate).format(Common.FORMAT_DATE_YYYY_MM_DD)} ${moment(
          this.startTime
        ).format(Common.FORMAT_TIME)}`,
        `${Common.FORMAT_DATE_YYYY_MM_DD} ${Common.FORMAT_TIME}`
      )
    },
    startTime(val) {
      this.campaign_budget.period.date_from = moment(
        `${moment(this.startDate).format(Common.FORMAT_DATE_YYYY_MM_DD)} ${moment(
          this.startTime
        ).format(Common.FORMAT_TIME)}`,
        `${Common.FORMAT_DATE_YYYY_MM_DD} ${Common.FORMAT_TIME}`
      )
    },
    noEndDate(val) {
      this.endDate = ''
      this.endTime = ''
    },
    endDate(val) {
      if (!this.noEndDate) {
        this.campaign_budget.period.date_to = moment(
          `${moment(this.endDate).format(Common.FORMAT_DATE_YYYY_MM_DD)} ${moment(
            this.endTime
          ).format(Common.FORMAT_TIME)}`,
          `${Common.FORMAT_DATE_YYYY_MM_DD} ${Common.FORMAT_TIME}`
        )
      } else {
        this.campaign_budget.period.date_to = null
      }
    },
    endTime(val) {
      if (!this.noEndDate) {
        this.campaign_budget.period.date_to = moment(
          `${moment(this.endDate).format(Common.FORMAT_DATE_YYYY_MM_DD)} ${moment(
            this.endTime
          ).format(Common.FORMAT_TIME)}`,
          `${Common.FORMAT_DATE_YYYY_MM_DD} ${Common.FORMAT_TIME}`
        )
      } else {
        this.campaign_budget.period.date_to = null
      }
    }
  },
  created() {},
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.budget.${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-radio {
  margin: 0;
  padding-right: 15px;
}
.n-wrap {
  white-space: nowrap;
}
.mw-170px {
  max-width: 170px;
}
.mw-120px {
  max-width: 120px;
}
.dl-bg-op {
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
}
.content-end-date {
  display: flex;
  .label {
    width: 50px;
  }
  .label.start {
    padding-top: 15px;
  }
  .label.end {
    padding-top: 5px;
  }
}
.budget-by-day-container {
	border: 1px solid #DEE3E9;
	border-radius: 3px;
	background-color: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  padding: 10px;
}
.date-row {
  margin-bottom: 10px;
}
.date-label {
  height: 36px;
  line-height: 36px;
}
</style>
