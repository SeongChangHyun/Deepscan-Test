<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('title')">
    <el-radio-group v-model="grade">
      <el-radio :label="0" class="h-pd-t-5">{{ genI18n('sendToAllGrade') }}</el-radio>
      <br>
      <el-radio :label="1" class="h-pd-t-5">{{ genI18n('sendToSpecificGrade') }}</el-radio>
    </el-radio-group>
    <div class="content-fields h-form-input w-100">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="container-table">
          <table class="w-100 h-mg-t-10 h-table">
            <tr class="bg-gray">
              <th :colspan="2">{{ genI18n('gradeBid') }}</th>
              <th>{{ genI18n('group') }}</th>
              <th>{{ genI18n('targetUv') }}</th>
              <th>{{ genI18n('convRate') }}</th>
              <th>{{ genI18n('visitUv') }}</th>
              <th>{{ genI18n('convUv') }}</th>
              <th>{{ genI18n('appearedUser') }}</th>
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
                <span>{{ genI18n('krw') }}</span>
              </td>
              <td>
                <span>{{ genI18n('unknown') }}</span>
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
    </div>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import { getClientId } from '@/utils/auth'
import { BE_C_TYPES } from '@/common/constants'
import ProbabilityOfPurchaseItem from './ProbabilityOfPurchaseItem'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    ProbabilityOfPurchaseItem,
    HeaderItemCreateCampaign
  },
  data() {
    return {
      grade: 0
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listProbabilityGrades']),
    probabilityOfPurchases() {
      return [...new Array(20)].reduce((accumulator, currentValue, k) => {
        let isExist = false
        this.listProbabilityGrades.forEach(prob => {
          if (`g${k}` === prob.probability_rank.toLowerCase()) {
            isExist = true
            accumulator[`g${k}`] = {
              gradeBid: '',
              group: `g${k}`,
              targetUV: prob.tg_user,
              convRate: prob.average_estimated_probability,
              visitUV: prob.visit_user,
              convUV: prob.conversion_user,
              appearedUser: prob.total_user
            }
          }
        })
        if (!isExist) {
          accumulator[`g${k}`] = {
            gradeBid: '',
            group: '',
            targetUV: '',
            convRate: '',
            visitUV: '',
            convUV: '',
            appearedUser: ''
          }
        }
        return accumulator
      }, {})
    }
  },
  created() {
    this.$store.dispatch('campaign/loadProbabilityGrades', {
      c_type: BE_C_TYPES[this.dataCreateCampaign.c_type],
      client_id: getClientId()
    })
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.probabilityOfPurchase.${params}`
      )
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
  .container-table {
    overflow: scroll;
    .h-table {
      min-width: 650px;
      font-family: arial, sans-serif;
      border-collapse: collapse;
      .bg-gray {
        background: #eee;
        th {
          width: 12.5%;
        }
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

