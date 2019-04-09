<template>
  <div class="h-content">
    <div class="icon-app">
      <svg-icon :icon-class="`${typeApp}-logo`"/>
    </div>
    <div class="h-input-sub fl-1">
      <el-row>
        <el-select
          v-model="dataApp.appId"
          :disabled="disabled || !listDataApp.length"
          :placeholder="genI18n('placeholderSelectApp')"
          class="w-100 h-pd-t-10"
        >
          <el-option
            v-for="item in listDataApp"
            :key="item.client_app_id"
            :label="`${item.os.toUpperCase()}   ${item.country_code.toUpperCase()}   ${item.bundleid}`"
            :value="item.client_app_id"
          />
        </el-select>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="h-pd-t-10">
          <el-select
            :disabled="disabled"
            v-model="dataApp.countryId"
            :placeholder="genI18n('placeholderCounty')"
            class="w-100"
          >
            <el-option
              v-for="item in listCountry"
              :key="item.country_id"
              :label="item.name_eng"
              :value="item.country_id"
            />
          </el-select>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="h-pd-t-10">
          <el-input
            v-model="dataApp.appIdCheck"
            :disabled="disabled"
            :placeholder="genI18n('placeholderAppCheck')"
          >
            <el-button
              slot="append"
              :disabled="disabled"
              :class="{ 'btn-append-input': !disabled} "
              type="primary"
              @click="checkApp"
            >{{ genI18nParent('btnCheck') }}</el-button>
          </el-input>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" el-col class="h-pd-t-10">
          <UploadInput/>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="h-pd-t-10">
          <el-select
            v-model="dataApp.partyTrackingId"
            :disabled="disabled"
            :placeholder="genI18n('placeholderPartyTracking')"
            class="w-100"
          >
            <el-option
              v-for="item in listPartyTracking"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" el-col class="h-pd-t-10">
          <el-input
            v-model="dataApp.urlApp"
            :disabled="disabled"
            :placeholder="genI18n('placeholderUrl')"
          />
        </el-col>
      </el-row>

      <el-row class="group-chexbox-input h-pd-t-10">
        <el-checkbox
          v-model="dataApp.urlPattern.status"
          :disabled="disabled"
          class="checkbox-left"
        >{{ genI18n('urlPattern.select') }}</el-checkbox>

        <div class="w-input-checkbox">
          <el-input
            v-model="dataApp.urlPattern.url"
            :disabled="disabled || !dataApp.urlPattern.status"
            :placeholder="genI18n('urlPattern.placeholder')"
          />

          <div class="w-100 of-x-auto">
            <table
              :class="{'w-100' : true , 'h-mg-t-10': true, 'h-table': true , 'table-disabled': false }"
            >
              <tr>
                <th>{{ genI18nParent('standardParameter') }}</th>
                <th>{{ genI18nParent('inputParameter') }}</th>
                <th>{{ genI18nParent('type') }}</th>
                <th>{{ genI18nParent('status') }}</th>
              </tr>

              <tr v-for="item in dataTable" :key="item.id">
                <td>{{ item.standardParameter }}</td>
                <td>{{ item.inputParameter }}</td>
                <td>{{ genI18nParent(`aboutAppType.${item.type}`) }}</td>
                <td>
                  <div :class="{status:true, [item.status | formatClassName]: true}">
                    <div class="dot"/>
                    {{ genI18nParent(`aboutAppStatus.${item.status}`) }}
                  </div>
                </td>
              </tr>

              <tr v-if="!dataTable.length">
                <td :colspan="4">{{ genI18nParent('noData') }}</td>
              </tr>
            </table>
          </div>
        </div>
      </el-row>

      <el-row class="group-chexbox-input h-pd-t-10">
        <el-checkbox
          :disabled="disabled"
          v-model="dataApp.urlPromotion.status"
          class="checkbox-left"
        >{{ genI18n('urlPromotion.select') }}</el-checkbox>

        <el-input
          v-model="dataApp.urlPromotion.url"
          :disabled="disabled || !dataApp.urlPromotion.status"
          :placeholder="genI18n('urlPromotion.placeholder')"
          class="w-input-checkbox"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { SetAboutAppCampaignType } from '@/common/constants'
import UploadInput from '@/components/UploadInput'

export default {
  components: {
    UploadInput
  },
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    typeApp: {
      type: String,
      required: true
    },
    genI18nParent: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      SetAboutAppCampaignType,
      listPartyTracking: [
        {
          id: 'abc2',
          name: '1313',
          url:
            'https://play.google.com/store/apps/details?id={abc_id}&hl={hl_id}&abc={123_id}'
        },
        {
          id: 'abc',
          name: '1313',
          url:
            'https://play.google.com/store/apps/details?id={abc_id}&hl={hl_id}&abc={123_id}'
        }
      ]
    }
  },
  computed: {
    ...mapState('campaign', {
      dataApp(state) {
        return state.dataCreateCampaign.landingUrl.setAboutApp[this.typeApp]
      },
      listDataApp(state) {
        const name =
          this.typeApp.charAt(0).toUpperCase() + this.typeApp.slice(1)
        return state[`list${name}App`]
      },
      listCountry: state => state.listCountry
    }),
    partyTrackingId() {
      return this.dataApp.partyTrackingId
    },
    urlApp() {
      return this.dataApp.urlApp
    },
    dataTable() {
      const { urlPattern } = this.dataApp
      if (urlPattern.url) {
        const arrPattern = urlPattern.url.split(/\&/)
        return [...arrPattern].map(v => {
          const standardParameter = v
          const inputParameter = v
          const type = v
            ? SetAboutAppCampaignType.type.REQUIRED
            : SetAboutAppCampaignType.type.OPTIONAL
          const status = !inputParameter
            ? SetAboutAppCampaignType.status.DO_NOT_INCLUDE
            : inputParameter === standardParameter
              ? SetAboutAppCampaignType.status.NORMAL
              : SetAboutAppCampaignType.status.ERROR

          return {
            standardParameter,
            inputParameter,
            type,
            status
          }
        })
      }
      return []
    }
  },
  watch: {
    partyTrackingId(value) {
      const data = _.findLast(this.listPartyTracking, { id: value })
      this.dataApp.urlApp = data.url
    },
    urlApp(value) {
      const length = value.length
      const indexStart = value.search(/\?/) + 1
      const data = (value + '').slice(indexStart, length)
      this.dataApp.urlPattern.url = data
    }
  },
  created() {},
  methods: {
    genI18n(params) {
      return this.genI18nParent(`${this.typeApp}.${params}`)
    },
    checkApp() {
      // TO DO : check app function
    }
  }
}
</script>

<style lang="scss" scoped>
.h-content {
  display: flex;
  .icon-app {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #e8ebee;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-top: 15px;
  }
}
.h-input-sub {
  width: 100%;
  .w-100 {
    width: 100%;
  }
  .btn-append-input {
    background: #3498db !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    color: #fff;
    border: 0;
    margin: 0px -21px;
    font-weight: bold;
  }
  .of-x-auto {
    overflow-x: auto;
  }
  .h-table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #dddddd;
    th {
      background-color: #e8ebee;
    }
    td,
    th {
      border-top: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      padding: 10px;
      text-align: left;
      font-size: 0.9em;
      .status {
        display: flex;
        align-items: center;
        .dot {
          height: 6px;
          width: 6px;
          border-radius: 3px;
          margin-right: 5px;
        }
      }
      .status.do_not_include {
        color: #f79f43;
        .dot {
          background-color: #f79f43;
        }
      }
      .status.normal {
        color: #40c76f;
        .dot {
          background-color: #40c76f;
        }
      }
      .status.error {
        color: #ea5455;
        .dot {
          background-color: #ea5455;
        }
      }
    }
  }
  .table-disabled {
    background: #f5f7fa;
    th,
    td {
      color: #ccc;
    }
  }
  .group-chexbox-input {
    .checkbox-left {
      float: left;
      width: 80px;
      padding-top: 10px;
    }
    .w-input-checkbox {
      float: left;
      width: calc(100% - 80px);
    }
  }
}
</style>

