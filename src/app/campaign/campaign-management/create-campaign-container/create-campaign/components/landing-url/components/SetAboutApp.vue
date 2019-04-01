<template>
  <div class="h-input-sub">
    <el-row>
      <el-select
        v-model="dataApp.appId"
        :disabled="disabled"
        :placeholder="genI18n('placeholderSelectApp')"
        class="w-100 h-pd-t-10"
      >
        <el-option v-for="item in listDataApp" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="24" :xl="8" class="h-pd-t-10">
        <el-select
          :disabled="disabled"
          v-model="dataApp.countryId"
          :placeholder="genI18n('placeholderCounty')"
          class="w-100"
        >
          <el-option
            v-for="item in listCountry"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="24" :xl="8" class="h-pd-t-10">
        <!-- <el-input placeholder="Enter a URL for your website or webpage" :disabled="showSelect"/> -->
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

      <el-col :xs="24" :sm="12" :md="8" :lg="24" :xl="8" class="h-pd-t-10">
        <el-select
          v-model="dataApp.partyTrackingId"
          :disabled="disabled"
          :placeholder="genI18n('placeholderPartyTracking')"
          class="w-100"
        >
          <el-option
            v-for="item in listCountry"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-input
        v-model="dataApp.urlApp"
        :disabled="disabled"
        :placeholder="genI18n('placeholderUrl')"
        class="h-pd-t-10"
      />
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
            :class="{'w-100' : true , 'h-mg-t-10': true, 'h-table': true , 'table-disabled': disabled || !dataApp.urlPattern.status }"
          >
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
              <th>Country</th>
            </tr>

            <tr v-for="item in dataTable" :key="item.id">
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>

            <tr v-if="!dataTable.length">
              <td :colspan="4">No data</td>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
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
      showSelect: false,
      value: ''
    }
  },
  computed: {
    ...mapState('campaign', {
      dataApp(state) {
        return state.dataCreateCampaign.landingUrl.setAboutApp[this.typeApp]
      },
      listDataApp(state) {
        const name = this.typeApp.charAt(0).toUpperCase() + this.typeApp.slice(1)
        return state[`list${name}App`]
      },
      listCountry: state => state.listCountry
    }),
    dataTable() {
      const { urlPattern } = this.dataApp
      if (urlPattern.status) {
        return [{}, {}, {}, {}]
      }
      return []
    }
  },
  created() {
    const name = this.typeApp.charAt(0).toUpperCase() + this.typeApp.slice(1)
    this.$store.dispatch(`campaign/loadList${name}App`, {})
  },
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
.h-input-sub {
  width: 100%;
  padding-left: 25px;
  .w-100 {
    width: 100%;
  }
  .btn-append-input {
    background: #3498db !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    color: #fff;
    border: 0;
  }
  .of-x-auto {
    overflow-x: auto;
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

