<template>
  <el-row class="h-form-input w-100 pt-0 pb-1 bottom-dotline schedule-field">
    <table class="w-100" @click="showContent=!showContent">
      <tr>
        <td class="el-col-md-6 el-col-sm-6 el-col-xs-24 align-middle float-none p-0 h-title">
          {{ genI18n('title') }}
        </td>
        <td class="el-col-md-14 el-col-sm-14 el-col-xs-24 align-middle float-none p-0">
          {{ genI18n('description') }}
        </td>
        <td class="el-col-md-4 el-col-sm-4 el-col-xs-24 align-middle float-none p-0 text-right">
          <el-button :icon="showContent ? 'el-icon-minus' : 'el-icon-plus'" type="default" class="border-0 p-1 expand-btn" @click="showContent=!showContent"/>
        </td>
      </tr>
    </table>
    <div
      :class="{ 'show': showContent }"
      class="col-md-9 col-sm-9 col-xs-12 px-0 content-hide transition-height"
    >
      <div v-show="showContent" class="content-fields h-form-input w-100">
        <el-radio-group v-model="value">
          <el-radio label="all" class="w-100">{{ genI18n('allDeviceMode') }}</el-radio>
          <el-radio label="custom" class="w-100">{{ genI18n('specificDeviceMode') }}</el-radio>
        </el-radio-group>
        <el-row v-if="value == 'custom' ">
          <div class="content-custom">
            <el-input v-model="valueSearch" placeholder="Please input" class="input-with-select">
              <!-- <el-button slot="append" icon="el-icon-search"/> -->
            </el-input>
            <div class="content-list">
              <ItemList
                v-for="item in listLocation"
                :key="item.id"
                :item="item"
                :status="item.status"
                :click-target="selectLocationTarget"
                :click-exclude="selectLocationExclude"
              />
            </div>
            <!-- <p style="text-align: right; color: #3498db; margin-right: 60px;">Remove all</p> -->
            <p>{{ genI18n('select') }} {{ genI18n('title') }}</p>
            <div class="content-list-select" style="background:#fff">
              <ItemTable
                v-for="item in locationSelected"
                :key="item.id"
                :item="item"
                :on-delete="deleteLocation"
              />
            </div>
          </div>
        </el-row>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import ItemList from './location/components/ItemList'
import ItemTable from './location/components/ItemTable'
import _ from 'lodash'
import { CampaignManagementConstants } from '@/common/constants'
export default {
  components: {
    ItemList,
    ItemTable
  },
  data() {
    return {
      showContent: false,
      value: 'all',
      valueSearch: '',
      locations: [
        { id: 1, name: 'a', total: 10000 },
        { id: 2, name: 'b', total: 10000 },
        { id: 3, name: 'ba', total: 10000 }
      ],
      locationSelected: []
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listCampaign']),
    listLocation() {
      return this.locations
        .filter(v => {
          const index = v.name.search(this.valueSearch)
          return index > -1
        })
        .map(v => {
          const index = _.findIndex(this.locationSelected, { id: v.id })
          v.status =
            { ...this.locationSelected[index] }.status ||
            CampaignManagementConstants.TARGETING_TYPE.DEFAULT
          return v
        })
    }
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.manufactureBrand.${params}`
      )
    },
    selectLocationTarget(item) {
      this.locationSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.TARGETED
      })
    },
    selectLocationExclude(item) {
      this.locationSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED
      })
    },
    deleteLocation(item) {
      const index = _.findIndex(this.locationSelected, { id: item.id })
      this.locationSelected.splice(index, 1)
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
  .content-custom {
    background: #f5f7fa;
    padding: 20px;
    margin-top: 10px;
    margin-left: 20px;
    .content-list {
      border: 1px solid #ccc;
      background: #fff;
      max-height: 100px;
      overflow-y: scroll;
    }
    .content-list-select {
      border: 1px solid #ccc;
      background: #fff;
    }
  }
}
</style>
