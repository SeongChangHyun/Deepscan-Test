<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-radio-group v-model="dataCreateCampaign.campaign_language.selected_language_type">
        <el-radio :label="LANGUAGE.ALL">{{ genI18n('optionAll') }}</el-radio>
        <el-radio :label="LANGUAGE.CUSTOM">{{ genI18n('optionCustom') }}</el-radio>
      </el-radio-group>
      <el-row
        v-if="dataCreateCampaign.campaign_language.selected_language_type === LANGUAGE.CUSTOM"
        class="container-block target-exclude-container h-mg-t-10"
      >
        <!-- <el-row class="container-block target-exclude-container"> -->
        <el-row class="content-custom">
          <el-select
            :placeholder="genI18n('placeholderSearch')"
            multiple
            class="input-with-select"
          >
            <el-option
              v-for="item in languages"
              :key="item.value"
              :label="item.name"
              :value="item.name">
              <el-row class="item">
                <el-col :span="10">{{ item.name }}</el-col>
                <el-col :span="6">{{ item.stat_count }}</el-col>
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
                    <span class="target" @click="clickTarget(item)">{{ $t('targetingType.target') }}</span>
                    {{ ' | ' }}
                    <span
                      class="exclude"
                      @click="clickExclude(item)"
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
            <div v-if="!!languageSelected.length">
              <ItemTable
                v-for="item in languageSelected"
                :key="item.id"
                :item="item"
                :on-delete="deleteLanguage"
                :name="item.name"
                :total="''"
                :status="item.status"
              />
            </div>

            <p v-else>{{ $t('noData') }}</p>
            <p v-if="showErr" class="mess-error">{{ genI18n('error') }}</p>
          </el-row>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import ItemTable from './location/components/ItemTable'
import findIndex from 'lodash/findIndex'
import { CampaignManagementConstants } from '@/common/constants'

export default {
  components: {
    ItemTable
  },
  data() {
    return {
      LANGUAGE: CampaignManagementConstants.LANGUAGE,
      targetingType: CampaignManagementConstants.TARGETING_TYPE
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign', 'listLanguage', 'errorCampaign']),
    languageSelected() {
      return this.dataCreateCampaign.campaign_language.language_list
    },
    languages() {
      return this.listLanguage.map(v => {
        const index = findIndex(this.languageSelected, { id: v.id })
        const status =
          { ...this.languageSelected[index] }.status ||
          CampaignManagementConstants.TARGETING_TYPE.DEFAULT
        return {
          ...v,
          status
        }
      })
    },
    showErr() {
      return this.errorCampaign.language
    }
  },
  watch: {
    languageSelected(val) {
      this.$store.dispatch('campaign/setErrorCampaign', { language: !val.length })
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
      const index = findIndex(this.languageSelected, { id: item.id })
      this.languageSelected.splice(index, 1)
    },
    clickTarget(item) {
      this.languageSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.TARGETED
      })
    },
    clickExclude(item) {
      this.languageSelected.push({
        ...item,
        status: CampaignManagementConstants.TARGETING_TYPE.EXCLUDED
      })
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
