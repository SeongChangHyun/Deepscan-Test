<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-radio-group v-model="dataCreateCampaign.manufacture.value">
      <el-radio :label="LANGUAGE.ALL">{{ genI18n('optionAll') }}</el-radio>
      <el-radio :label="LANGUAGE.CUSTOM">{{ genI18n('optionCustom') }}</el-radio>
    </el-radio-group>
    <el-row
      v-if="dataCreateCampaign.manufacture.value === LANGUAGE.CUSTOM"
      class="container-block target-exclude-container h-mg-t-10"
    >
      <el-row class="content-custom">
        <el-input
          v-model="valueSearch"
          :placeholder="genI18n('placeholderSearch')"
          class="input-with-select"
        />
        <el-row class="container-item">
          <ItemList
            v-for="item in dataFilter"
            :key="item.id"
            :item="item"
            :status="item.status"
            :click-target="selectTarget"
            :click-exclude="selectExclude"
            :name="`${item.manufacture} ${item.brand}`"
            :total="item.stat_count || 0"
          />
        </el-row>

        <div class="line"/>
        <el-row class="h-form-input container-item line-top">
          <span class="h-title">{{ genI18n('selectedTitle') }}</span>
        </el-row>

        <el-row class="h-form-input container-item">
          <div v-if="!!selected.length">
            <ItemTable
              v-for="item in selected"
              :key="item.id"
              :item="item"
              :on-delete="deleteItem"
              :name="`${item.manufacture} ${item.brand}`"
              :total="item.stat_count || 0"
              :status="item.status"
            />
          </div>
          <p v-else>{{ $t('noData') }}</p>
        </el-row>
      </el-row>
    </el-row>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import ItemList from './location/components/ItemList'
import ItemTable from './location/components/ItemTable'
import _ from 'lodash'
import { CampaignManagementConstants } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    ItemList,
    ItemTable,
    HeaderItemCreateCampaign
  },
  data() {
    return {
      valueSearch: '',
      LANGUAGE: CampaignManagementConstants.LANGUAGE
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listManufactures']),
    selected() {
      return this.dataCreateCampaign.manufacture.selected
    },
    dataFilter() {
      return this.listManufactures
        .filter(v => {
          const index = `${v.manufacture} ${v.carrier_name}`
            .toLowerCase()
            .search(this.valueSearch.toLowerCase())
          return index > -1
        })
        .map(v => {
          const index = _.findIndex(this.selected, { id: v.id })
          v.status =
            { ...this.selected[index] }.status ||
            CampaignManagementConstants.TARGETING_TYPE.DEFAULT
          return v
        })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListManufactures')
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.manufactureBrand.${params}`
      )
    },
    selectTarget(item) {
      this.selected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.TARGETED
      })
    },
    selectExclude(item) {
      this.selected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED
      })
    },
    deleteItem(item) {
      const index = _.findIndex(this.selected, { id: item.id })
      this.selected.splice(index, 1)
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
  .h-title {
    margin-top: 0px;
  }
  .el-radio {
    margin: 0;
    padding-right: 30px;
  }
  .content-custom {
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
