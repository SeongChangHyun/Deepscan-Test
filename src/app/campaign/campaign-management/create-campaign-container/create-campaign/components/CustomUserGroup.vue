<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <el-radio-group v-model="dataCreateCampaign.customUserGroup.value">
      <el-radio :label="LANGUAGE.ALL">{{ genI18n('optionAll') }}</el-radio>
      <el-radio :label="LANGUAGE.CUSTOM">{{ genI18n('optionCustom') }}</el-radio>
    </el-radio-group>
    <el-row
      v-if="dataCreateCampaign.customUserGroup.value === LANGUAGE.CUSTOM"
      class="container-block target-exclude-container h-mg-t-10"
    >
      <el-row class="content-custom">
        <el-select
          v-model="valueSearch"
          :placeholder="genI18n('placeholderSearch')"
          multiple
          class="input-with-select"
        >
          <el-option
            v-for="item in dataFilter"
            :key="item.campaign_library_id"
            :label="item.label"
            :value="item.campaign_library_id">
            <el-row class="item">
              <el-col :span="10">{{ item.label }}</el-col>
              <el-col :span="8" class="actions">
                <span
                  v-if="item.status === targetingType.TARGETED"
                  class="targeted"
                >{{ $t('targetingType.targeted') }}</span>
                <span
                  v-if="item.status === targetingType.EXCLUDED"
                  class="excluded"
                >{{ $t('targetingType.excluded') }}</span>
                <span v-if="item.status === targetingType.DEFAULT">
                  <span class="target" @click="selectTarget(item)">{{ $t('targetingType.target') }}</span>
                  {{ ' | ' }}
                  <span
                    class="exclude"
                    @click="selectExclude(item)"
                  >{{ $t('targetingType.exclude') }}</span>
                </span>
              </el-col>
            </el-row>
          </el-option>
        </el-select>

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
              :name="`${item.targeting_device} / ${item.targeting_name}`"
              :status="item.status"
              total=""
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
import findIndex from 'lodash/findIndex'
import ItemTable from './location/components/ItemTable'
import { CampaignManagementConstants } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    ItemTable,
    HeaderItemCreateCampaign
  },
  data() {
    return {
      valueSearch: '',
      LANGUAGE: CampaignManagementConstants.LANGUAGE,
      targetingType: CampaignManagementConstants.TARGETING_TYPE
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listCustomUserGroup']),
    selected() {
      return this.dataCreateCampaign.customUserGroup.selected
    },
    dataFilter() {
      return this.listCustomUserGroup.map(v => {
        const index = findIndex(this.selected, { campaign_library_id: v.campaign_library_id })
        v.status =
          { ...this.selected[index] }.status ||
          CampaignManagementConstants.TARGETING_TYPE.DEFAULT
        return {
          ...v,
          label: `${v.targeting_device}   ${v.register_date} ${v.targeting_name}`
        }
      })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListCustomUserGroup')
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.customUserGroup.${params}`
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
      const index = findIndex(this.selected, { campaign_library_id: item.campaign_library_id })
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
    .el-select {
      width: 100%;
    }
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
.actions {
  float: right !important;
  text-align: right !important;
  .targeted,.target {
    color: #6DC0B7;
    cursor: pointer;
  }
  .exclude,.excluded {
    color: #9E99DB;
    cursor: pointer;
  }
}
</style>
