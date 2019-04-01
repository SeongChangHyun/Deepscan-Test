<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-radio-group v-model="dataCreateCampaign.language.value">
        <el-radio label="all">{{ genI18n('optionAll') }}</el-radio>
        <el-radio label="custom">{{ genI18n('optionCustom') }}</el-radio>
      </el-radio-group>
      <el-row v-if="dataCreateCampaign.language.value == 'custom' ">
        <div class="content-custom">
          <el-input
            v-model="valueSearch"
            :placeholder="genI18n('placeholderSearch')"
            class="input-with-select"
          >
            <!-- <el-button slot="append" icon="el-icon-search"/> -->
          </el-input>
          <div class="content-list">
            <ItemList
              v-for="item in languages"
              :key="item.id"
              :item="item"
              :status="item.status"
              :click-target="selectLanguageTarget"
              :click-exclude="selectLanguageExclude"
            />
          </div>
          <!-- <p style="text-align: right; color: #3498db; margin-right: 60px;">Remove all</p> -->
          <p>{{ genI18n('selectedTitle') }}</p>
          <div class="content-list-select" style="background:#fff">
            <div v-if="!!languageSelected.length">
              <ItemTable
                v-for="item in languageSelected"
                :key="item.id"
                :item="item"
                :on-delete="deleteLanguage"
              />
            </div>

            <p v-else>{{ $t('noData') }}</p>
          </div>
        </div>
      </el-row>
    </el-col>
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
      valueSearch: ''
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listLanguage']),
    languageSelected() {
      return this.dataCreateCampaign.language.selected
    },
    languages() {
      return this.listLanguage
        .filter(v => {
          const index = v.name.search(this.valueSearch)
          return index > -1
        })
        .map(v => {
          const index = _.findIndex(this.languageSelected, { id: v.id })
          v.status =
            { ...this.languageSelected[index] }.status ||
            CampaignManagementConstants.TARGETING_TYPE.DEFAULT
          return v
        })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListLanguage', {})
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.language.${params}`)
    },
    selectLanguageTarget(item) {
      this.languageSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.TARGETED
      })
    },
    selectLanguageExclude(item) {
      this.languageSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED
      })
    },
    deleteLanguage(item) {
      const index = _.findIndex(this.languageSelected, { id: item.id })
      this.languageSelected.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  .h-title {
    margin-top: 0px;
  }
  .el-radio {
    margin: 0;
    padding-right: 30px;
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
