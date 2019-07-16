<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-radio-group v-model="radioSelection">
      <el-radio :label="STRING_NUMBER.ZERO" class="h-pd-t-5">{{ genI18n('selectDefault') }}</el-radio>
      <br>
      <el-radio :label="STRING_NUMBER.ONE" class="h-pd-t-5">{{ genI18n('selectCustom') }}</el-radio>
    </el-radio-group>
    <el-row v-if="radioSelection === STRING_NUMBER.ONE" :gutter="20">
      <el-col :span="24">
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <table class="w-100 h-mg-t-10 h-table">
            <tr>
              <td class="bold">{{ genI18n('range') }}</td>
              <td class="bold">{{ genI18n('group') }}</td>
            </tr>

            <tr v-for=" n in 20" :key="n">
              <td class="text-align-l">
                <el-checkbox :value="selection[`g${n-1}`]" class="mg-r-10" @change="val => onChange(val, n-1)"/>
                <span>{{ `${(n-1)*5 || 0.1}%~${(n-1)*5+4.9}%` }}</span>
              </td>
              <td>{{ `G${n-1}` }}</td>
            </tr>
          </table>
        </el-col>
        <el-col :xs="24" :sm="13" :md="13" :lg="13" :xl="13">
          <table class="w-100 h-mg-t-10 h-table">
            <tr>
              <td class="bold">{{ genI18n('totalUV') }}</td>
              <td class="bold">{{ genI18n('targetUV') }}</td>
              <td class="bold">{{ genI18n('convRate') }}</td>
            </tr>

            <tr>
              <td>{{ calculatedForecastOfConversion.total_user_count }}</td>
              <td>{{ calculatedForecastOfConversion.target_user_count }}</td>
              <td>{{ calculatedForecastOfConversion.probability_value }}</td>
            </tr>
          </table>
        </el-col>
      </el-col>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
import { STRING_NUMBER } from '@/common/constants'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      showContent: false,
      radioSelection: STRING_NUMBER.ZERO,
      selection: {},
      rangeItems: [],
      STRING_NUMBER
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listCampaign', 'calculatedForecastOfConversion'])
  },
  watch: {
    rangeItems(val) {
      const min = this.getMin()
      const max = this.getMax()
      this.$store.dispatch('campaign/calForecastOfConversion', {
        from_grade: min,
        to_grade: max
      })
      this.dataCreateCampaign.forecast_conversion = {
        from: min,
        to: max
      }
    }
  },
  created() {
    for (let i = 0; i < 20; i++) {
      Vue.set(this.selection, `g${i}`, true)
    }
    this.rangeItems.push(...[0, 19])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.forecastOfConversion.${params}`
      )
    },
    getMin() {
      return Math.min(this.rangeItems[0], this.rangeItems[1])
    },
    getMax() {
      return Math.max(this.rangeItems[0], this.rangeItems[1])
    },
    onChange(val, n) {
      this.rangeItems.shift()
      this.rangeItems.push(n)
      const min = this.getMin()
      const max = this.getMax()
      for (let i = 0; i < 20; i++) {
        if (i < min || i > max) {
          this.selection[`g${i}`] = false
        } else {
          this.selection[`g${i}`] = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 5px 0;
  .h-title {
    margin-top: 0px;
  }
  .el-radio {
    margin: 0;
    padding-right: 15px;
  }
  .fl-1 {
    flex: 1;
  }
  .h-table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #dddddd;

    td,
    th {
      border-bottom: 1px solid #dddddd;
      padding: 10px;
      text-align: center;
    }
    .text-align-l {
      text-align: left;
    }
  }
  .blackDot {
    width: 7px;
    height: 7px;
    background-color: black;
    margin-right: 15px;
  }
}
.tables {
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
}
.bold {
  font-weight: 600;
  background-color: rgb(215, 221, 221);
}
.fl-r {
  float: right;
}
.mg-r-10 {
  margin-right: 10px;
}
</style>
