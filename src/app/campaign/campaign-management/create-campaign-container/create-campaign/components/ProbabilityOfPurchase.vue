<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">{{ genI18n('title') }}</p>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div>
        <span>지정한 타겟에 대한 광고 송출 조건을 선택하신 목적에 따라 상세히 설정이 가능합니다 지정한 타겟에 대한 가능합니다</span>
      </div>
      <div class="container-table">
        <table class="w-100 h-mg-t-10 h-table">
          <tr class="bg-gray">
            <th :colspan="2">Grage bid</th>
            <th>Group</th>
            <th>Target UV</th>
            <th>Conv.rate</th>
            <th>Visit UV</th>
            <th>Conv.UV</th>
            <th>Appeared User</th>
          </tr>

          <ProbabilityOfPurchaseItem
            v-for="(item,k) in probabilityOfPurchases"
            :key="k"
            :data="{item, k}"
          />
          <tr>
            <td>
              <input type="text" placeholder="-">
            </td>
            <td class="bg-gray">
              <span>KRW</span>
            </td>
            <td>
              <span>Unknown</span>
            </td>
            <td class="disable"/>
            <td>
              <div class="convrate w-100">
                <input type="text" placeholder="-">
                <span>i</span>
              </div>
            </td>
            <td class="disable"/>
            <td class="disable"/>
            <td class="disable"/>
          </tr>
        </table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import ProbabilityOfPurchaseItem from './ProbabilityOfPurchaseItem'
import _ from 'lodash'
export default {
  components: {
    ProbabilityOfPurchaseItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('campaign', {
      probabilityOfPurchases: state =>
        state.dataCreateCampaign.probabilityOfPurchases
    })
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.probabilityOfPurchase.${params}`
      )
    },
    calcEstimate: _.debounce(function() {
      this.$store.dispatch('campaign/bidDetailsCalcEstimate', this.bidDetails)
    }, 500)
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
  .container-table {
    overflow: scroll;
    .h-table {
      min-width: 650px;
      font-family: arial, sans-serif;
      border-collapse: collapse;
      .bg-gray {
        background: #eee;
      }
      td,
      th {
        border: 1px solid #dddddd;
        text-align: center;
        span {
          margin: 0 10px;
          font-weight: bold;
        }
      }
      input {
        border: none;
        text-align: right;
        height: 20px;
        margin: 10px 0;
        padding: 0 10px;
      }
      input:focus {
        outline: none;
      }
      td.disable {
        background: #efefef;
      }
      .convrate {
        align-items: center;
        display: flex;
        flex-direction: row;
      }
    }
  }
}
</style>

