<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-radio-group v-model="dataCreateCampaign.carrier.value">
      <el-radio :label="CARRIER.ALL" class="w-100">{{ genI18n('allCarrier') }}</el-radio>
      <el-radio :label="CARRIER.CUSTOM" class="w-100">{{ genI18n('specificCarrier') }}</el-radio>
    </el-radio-group>
    <el-row
      v-if="dataCreateCampaign.carrier.value === CARRIER.CUSTOM"
      class="container-block target-exclude-container h-mg-t-10"
    >
      <el-row class="content-custom">
        <el-input
          v-model="valueSearch"
          :placeholder="genI18n('placeholderSearch')"
          class="input-with-select"
        >
          <!-- <el-button slot="append" icon="el-icon-search"/> -->
        </el-input>
        <el-row class="container-item">
          <ItemList
            v-for="item in carriers"
            :key="item.id"
            :item="item"
            :status="item.status"
            :click-target="selectCarrierTarget"
            :click-exclude="selectCarrierExclude"
            :name="item.carrier_name"
            :total="item.stat_count || 0"
          />
        </el-row>

        <div class="line"/>
        <el-row class="h-form-input container-item line-top">
          <span class="h-title">{{ genI18n('selected') }} {{ genI18n('title') }}</span>
        </el-row>

        <el-row class="h-form-input container-item">
          <div v-if="!!carrierSelected.length">
            <ItemTable
              v-for="item in carrierSelected"
              :key="item.id"
              :item="item"
              :on-delete="deleteCarrier"
              :name="item.carrier_name"
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
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
import _ from 'lodash'
import { CampaignManagementConstants } from '@/common/constants'
export default {
  components: {
    ItemList,
    ItemTable,
    HeaderItemCreateCampaign
  },
  data() {
    return {
      valueSearch: '',
      CARRIER: CampaignManagementConstants.LANGUAGE
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listCarrier']),
    carrierSelected() {
      return this.dataCreateCampaign.carrier.selected
    },
    carriers() {
      return this.listCarrier
        .filter(v => {
          const index = v.carrier_name
            .toLowerCase()
            .search(this.valueSearch.toLowerCase())
          return index > -1
        })
        .map(v => {
          const index = _.findIndex(this.carrierSelected, { id: v.id })
          v.status =
            { ...this.carrierSelected[index] }.status ||
            CampaignManagementConstants.TARGETING_TYPE.DEFAULT
          return v
        })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListCarrier', {})
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.carrier.${params}`)
    },
    selectCarrierTarget(item) {
      this.carrierSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.TARGETED
      })
    },
    selectCarrierExclude(item) {
      this.carrierSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED
      })
    },
    deleteCarrier(item) {
      const index = _.findIndex(this.carrierSelected, { id: item.id })
      this.carrierSelected.splice(index, 1)
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
