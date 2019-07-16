<template>
  <div class="h-content">
    <div class="icon-app">
      <svg-icon :icon-class="`${typeApp}-logo`"/>
    </div>
    <div class="h-input-sub fl-1">
      <el-row>
        <el-select
          v-model="dataApp.appId"
          :placeholder="genI18n('placeholderSelectApp')"
          class="w-100 h-pd-t-10"
        >
          <el-option :label="genI18n('placeholderSelectApp')" :value="''"/>
          <el-option
            v-for="item in listDataApp"
            :key="item.client_app_id"
            :label="`${item.os.toUpperCase()}   ${item.country_code.toUpperCase()}   ${item.client_app_id}`"
            :value="item.client_app_id"
          />
          <el-option :label="genI18n('customInput')" :value="'customInput'"/>
        </el-select>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="h-pd-t-10">
          <el-select
            :disabled="!isCustom"
            v-model="dataApp.countryId"
            :placeholder="genI18n('placeholderCounty')"
            class="w-100"
          >
            <el-option
              v-for="item in listCountry"
              :key="item.code"
              :label="item[`${language()}Name`]"
              :value="item[`${language()}Name`]"
            />
          </el-select>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="10" class="h-pd-t-10">
          <el-input
            v-model="dataApp.appIdCheck"
            :disabled="!isCustom"
            :placeholder="genI18n('placeholderAppCheck')"
          >
            <el-button
              v-if="isCustom"
              slot="append"
              :disabled="disabled"
              :class="{ 'btn-append-input': !disabled} "
              type="primary"
              @click="checkApp"
            >{{ genI18nParent('btnVerify') }}</el-button>
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
          <UploadInput :value="dataApp.app_icon" :on-change="changeAppIcon"/>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="h-pd-t-10">
          <el-select
            v-model="dataApp.partyTrackingId"
            :disabled="disabled"
            :placeholder="genI18n('placeholderPartyTracking')"
            class="w-100"
          >
            <el-option :label="genI18n('partyTrackingNone')" :value="''"/>
            <el-option
              v-for="item in listTrackingCompanies"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" el-col class="h-pd-t-10">
          <el-input
            v-if="!!dataApp.partyTrackingId"
            v-model="dataApp.urlApp"
            :placeholder="genI18n('placeholderUrl')"
          />
          <el-input
            v-else
            v-model="dataApp.urlApp"
            :placeholder="genI18n('placeholderCampaignDeepLink')"
          />
        </el-col>
      </el-row>

      <el-row v-if="!!dataApp.partyTrackingId" class="group-chexbox-input h-pd-t-10">
        <el-checkbox
          v-model="dataApp.urlPattern.status"
          :disabled="disabled"
          class="checkbox-left"
        >{{ genI18n('urlPattern.select') }}</el-checkbox>

        <div class="w-input-checkbox w-100">
          <el-input
            v-model="dataApp.urlPattern.url"
            :disabled="disabled || !dataApp.urlPattern.status"
            :placeholder="genI18n('urlPattern.placeholder')"
            class="w-100"
          />

          <div class="table-container">
            <table class="h-mg-t-10 h-table">
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
                  <div :class="{status:true, [formatClassName(item.status)]: true}">
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

      <el-row v-if="!dataApp.partyTrackingId" class="group-chexbox-input h-pd-t-10">
        <el-checkbox
          :disabled="disabled"
          v-model="dataApp.urlPromotion.status"
          class="checkbox-left"
        >{{ genI18n('urlPromotion.select') }}</el-checkbox>

        <el-input
          v-model="dataApp.urlPromotion.url"
          :disabled="disabled || !dataApp.urlPromotion.status"
          :placeholder="genI18n('urlPromotion.placeholder')"
          class="w-input-checkbox w-100"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
import _ from 'lodash'
import { SetAboutAppCampaignType, Common } from '@/common/constants'
import UploadInput from '@/components/UploadInput'
import { formatClassName } from '@/filter'

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
    },
    urlStore: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      SetAboutAppCampaignType,
      language() {
        const language = Cookies.get('language') || Common.KO_CODE
        switch (language) {
          case Common.JA_CODE:
            return Common.JP_CODE
          case Common.KO_CODE:
            return Common.KR_CODE
          default:
            return Common.EN_CODE
        }
      }
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
      listCountry: state => state.listCountry,
      listTrackingCompanies: state => state.listTrackingCompanies,
      isCustom() {
        return this.dataApp.appId === 'customInput'
      }
    }),
    partyTrackingId() {
      return this.dataApp.partyTrackingId
    },
    urlApp() {
      return this.dataApp.urlApp
    },
    appId() {
      return this.dataApp.appId
    },
    dataTable() {
      const { urlPattern, urlApp } = this.dataApp
      if (urlPattern.url) {
        const arrStandardPattern = urlApp.substring(urlApp.indexOf('?') + 1).split(/\&/)
        const arrPattern = urlPattern.url.split(/\&/)
        const inputObj = {}
        arrPattern.reduce(function(obj, el) {
          const [key, value] = el.split('=')
          obj[key] = value
          return obj
        }, inputObj)

        return arrStandardPattern.map(v => {
          const standardParameter = v
          const [key] = v.split('=')
          const inputParameter = Object.keys(inputObj).includes(key) ? `${key}=${inputObj[key]}` : ''

          const type = v
            ? SetAboutAppCampaignType.type.REQUIRED
            : SetAboutAppCampaignType.type.OPTIONAL
          const status = SetAboutAppCampaignType.status.NORMAL // !inputParameter ? SetAboutAppCampaignType.status.DO_NOT_INCLUDE: inputParameter === standardParameter ? SetAboutAppCampaignType.status.NORMAL: SetAboutAppCampaignType.status.ERROR
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
      if (value) {
        const data = _.findLast(this.listTrackingCompanies, { id: parseInt(value) })
        this.dataApp.urlApp = data && data.url ? data.url : ''
      }
    },
    urlApp(value) {
      const length = value.length
      const indexStart = value.search(/\?/) + 1
      const data = toString(value).slice(indexStart, length)
      this.dataApp.urlPattern.url = data
    },
    appId(value) {
      if (value) {
        const appSelected = _.findLast(this.listDataApp, {
          client_app_id: value
        })
        if (appSelected) {
          this.dataApp.countryId = appSelected.country_code
          this.dataApp.appIdCheck = appSelected.client_app_id
          this.dataApp.app_icon = appSelected.app_icon
        }
      }
    }
  },
  created() {},
  methods: {
    genI18n(params) {
      return this.genI18nParent(`${this.typeApp}.${params}`)
    },
    formatClassName,
    checkApp() {
      const { countryId, appIdCheck } = this.dataApp
      if (countryId && appIdCheck) {
        const url = this.urlStore
          .replace('{country_id}', countryId)
          .replace('{app_id}', appIdCheck)
        window.open(url)
      }
    },
    changeAppIcon(app_icon) {
      this.dataApp.app_icon = app_icon
      this.$forceUpdate()
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
    border-left: 1px solid #dcdfe6;
    font-weight: bold;
  }
  .table-container {
    // width: 100%;
    overflow: auto;
    display: flex;
    flex: 1
  }
  .h-table {
    // font-family: arial, sans-serif;
    border-collapse: collapse;
    border: 1px solid #dddddd;
    width: 100%;
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
      // padding-top: 10px;
    }
    .w-input-checkbox {
      float: left;
      width: calc(100% - 80px);
    }
  }
}
@media only screen and (max-width: 768px) {
  .h-content {
    display: block;
  }
  .checkbox-left {
    float: inherit !important;
    width: 100% !important;
  }
  .w-input-checkbox {
    float: inherit !important;
    width: 100% !important;
  }
}
</style>

