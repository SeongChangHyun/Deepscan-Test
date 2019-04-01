<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="24" :lg="12" :xl="12">
          <el-input :placeholder="genI18n('placeholderBudget')" class="h-pd-b-5">
            <template slot="append">{{ unitCurrency }}</template>
          </el-input>
        </el-col>

        <el-col :xs="24" :sm="12" :md="24" :lg="12" :xl="12">
          <el-select v-model="budget.limitedTime" class="h-pd-b-5 w-100">
            <el-option :value="budgetType.LIMITED_TIME_TYPE.PER_DAY" :label="genI18n('perDay')"/>
            <el-option :value="budgetType.LIMITED_TIME_TYPE.PER_WEEK" :label=" genI18n('perWeek')"/>
            <el-option :value="budgetType.LIMITED_TIME_TYPE.PER_MONTH" :label="genI18n('perMonth')"/>
          </el-select>
        </el-col>
      </el-row>

      <span
        class="dl-bg-op"
        @click="budget.dailyBudgetOption = !budget.dailyBudgetOption "
      >{{ genI18n('dailyBudgetOption') }}</span>
      <div v-if="budget.dailyBudgetOption">
        <el-radio-group v-model="budget.distribution" class="h-pd-t-5">
          <el-radio
            :label="budgetType.DISTRIBUTION_TYPE.STANDARD"
            class="w-100"
          >{{ genI18n('standard') }}</el-radio>
          <el-radio
            :label="budgetType.DISTRIBUTION_TYPE.ACCELERATED"
            class="w-100"
          >{{ genI18n('accelerated') }}</el-radio>
        </el-radio-group>

        <el-select
          v-model="budget.liveTimeOfCampaign"
          class="h-pd-t-5 h-pd-b-5 w-100"
        >
          <el-option
            :value="budgetType.LIVE_TIME_OF_CAMPAIGN_TYPE.LIVE_AD_FROM_TODAY"
            :label="genI18n('liveAd')"
          />
          <el-option
            :value="budgetType.LIVE_TIME_OF_CAMPAIGN_TYPE.START_AND_END_DATE_SETTING"
            :label="genI18n('startAndEndDate')"
          />
        </el-select>

        <div
          v-if="budget.liveTimeOfCampaign == budgetType.LIVE_TIME_OF_CAMPAIGN_TYPE.START_AND_END_DATE_SETTING"
        >
          <div>
            <span>{{ genI18n('start') }}</span>
            <el-date-picker
              v-model="budget.start.date"
              type="date"
              placeholder="YYYY-MM-DD"
              class="h-pd-t-5 mw-170px"
            />
            <el-time-picker
              v-model="budget.start.time"
              format="HH:mm"
              placeholder="HH:mm"
              class="h-pd-t-5 h-pd-b-5 mw-120px"
            />
            <span class="n-wrap">{{ genI18n('end') }}</span>
          </div>

          <div>
            <el-checkbox v-model="budget.end.noEnd" class="h-pd-t-5 n-wrap">{{ genI18n('noEndDate') }}</el-checkbox>
            <el-date-picker
              v-model="budget.end.date"
              :disabled="budget.end.noEnd"
              type="date"
              placeholder="YYYY-MM-DD"
              class="h-pd-t-5 mw-170px"
            />
            <el-time-picker
              v-model="budget.end.time"
              :disabled="budget.end.noEnd"
              format="HH:mm"
              placeholder="HH:mm"
              class="h-pd-t-5 h-pd-b-5 mw-120px"
            />
          </div>
          <span class="n-wrap">{{ timeZone }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { CampaignManagementConstants } from '@/common/constants'

export default {
  data() {
    return {
      budgetType: CampaignManagementConstants.BUDGET
    }
  },
  computed: {
    ...mapState('campaign', {
      budget: state => state.dataCreateCampaign.budget,
      unitCurrency: state => state.unitCurrency,
      timeZone: state => state.timeZone
    })
  },
  watch: {
    setExtraGroup: function(val) {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        adGroupName: {
          setExtraGroup: val,
          name: '',
          id: ''
        }
      })
    }
  },
  created() {

  },
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
  color: #3498db;
  text-decoration: underline;
  cursor: pointer;
}
</style>
