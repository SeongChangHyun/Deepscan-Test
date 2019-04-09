<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td
          class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title"
        >{{ genI18n('title') }}</td>
        <td
          class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0"
        >{{ genI18n('description') }}</td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button
            :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'"
            type="default"
            class="border-0 p-1 expad-btn"
          />
        </td>
      </tr>
    </table>
    <div
      :class="{ 'show': showContent }"
      class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height"
    >
      <div v-show="showContent" class="content-fields h-form-input w-100">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <table class="w-100 h-mg-t-10 h-table">
                <tr>
                  <td>{{ genI18n('range') }}</td>
                  <td>{{ genI18n('group') }}</td>
                </tr>

                <tr v-for=" n in 10" :key="n">
                  <td class="rowItem">
                    <div class="blackDot"/>
                    <span>%~9.9%</span>
                  </td>
                  <td>{{ genI18n('krw') }}</td>
                </tr>
              </table>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <table class="w-100 h-mg-t-10 h-table">
                <tr>
                  <td>{{ genI18n('totalUV') }}</td>
                  <td>{{ genI18n('targetUV') }}</td>
                  <td>{{ genI18n('convRate') }}</td>
                </tr>

                <tr>
                  <td>9,214</td>
                  <td>461</td>
                  <td>2.18%</td>
                </tr>
              </table>
            </el-col>
          </el-col>
        </el-row>

      </div>
    </div>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showContent: false
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listCampaign'])
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.forecastOfConversion.${params}`
      )
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
    td,
    th {
      border: 1px solid #dddddd;
      padding: 10px;
      text-align: center;
    }
  }
  .rowItem {
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .blackDot {
    width: 7px;
    height: 7px;
    background-color: black;
    margin-right: 15px;
  }
}
</style>
