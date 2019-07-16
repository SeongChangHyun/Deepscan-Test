<template>
  <HeaderItemCreateCampaign :title="genI18n('title')" :desc="genI18n('description')">
    <div>
      <el-radio-group v-model="radio">
        <el-radio :label="STRING_NUMBER.ONE" class="h-pd-t-5">{{ genI18n('sendToALl') }}</el-radio>
        <el-radio :label="STRING_NUMBER.ZERO" class="h-pd-t-5">{{ genI18n('sendToSpecific') }}</el-radio>
      </el-radio-group>

      <div v-if="radio === STRING_NUMBER.ZERO" class="w-100 container-table h-mg-t-10">
        <div class="fl-1 content">
          <p class="header">{{ genI18n('gender') }}</p>
          <el-checkbox-group v-model="gender">
            <el-checkbox v-for="item in genderType" :key="item.id" :label="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="line"/>

        <div class="fl-1 content">
          <p class="header">{{ genI18n('age') }}</p>
          <el-checkbox-group v-model="age_levels">
            <el-checkbox v-for="item in ageRange" :key="item.id" :label="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="line"/>

        <div class="fl-1 content">
          <p class="header">{{ genI18n('incomeLevel') }}</p>
          <el-checkbox-group v-model="income_level">
            <el-checkbox v-for="item in incomeLevel" :key="item.id" :label="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </HeaderItemCreateCampaign>
</template>

<script>
import { mapState } from 'vuex'
import { CampaignManagementConstants, STRING_NUMBER } from '@/common/constants'
import HeaderItemCreateCampaign from '@/components/HeaderItemCreateCampaign'
export default {
  components: {
    HeaderItemCreateCampaign
  },
  data() {
    return {
      genderType: CampaignManagementConstants.DEMO_GRAPHIC.GENDER_TYPE,
      ageRange: CampaignManagementConstants.DEMO_GRAPHIC.AGE_RANGE,
      incomeLevel: CampaignManagementConstants.DEMO_GRAPHIC.INCOME_LEVEL,
      STRING_NUMBER,
      radio: STRING_NUMBER.ONE,
      gender: CampaignManagementConstants.DEMO_GRAPHIC.GENDER_TYPE.map(item => item.value),
      income_level: CampaignManagementConstants.DEMO_GRAPHIC.INCOME_LEVEL.map(item => item.value),
      age_levels: CampaignManagementConstants.DEMO_GRAPHIC.AGE_RANGE.map(item => item.value)
    }
  },
  computed: {
    ...mapState('campaign', ['dataCreateCampaign'])
  },
  watch: {
    radio(val) {
      this.dataCreateCampaign.demographic.is_all = val
    },
    gender(val) {
      this.dataCreateCampaign.demographic.gender = val
    },
    income_level(val) {
      this.dataCreateCampaign.demographic.income_level = val
    },
    age_levels(val) {
      this.dataCreateCampaign.demographic.age_levels = val
    }
  },
  created() {
    this.dataCreateCampaign.demographic.gender = this.gender
    this.dataCreateCampaign.demographic.income_level = this.income_level
    this.dataCreateCampaign.demographic.age_levels = this.age_levels
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.demographic.${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.h-form-input {
  border-bottom: 1px dotted #ddd;
  padding: 5px 0;
  .setting-header {
    display: flex;
  }
  .h-title {
    flex: 1;
    margin-top: 0px;
  }
  .el-radio {
    display: block;
    margin: 0;
    padding-right: 15px;
  }
  .fl-1 {
    flex: 1;
  }
  .container-table {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    padding: 0;
    .header {
      margin: 0;
      background-color: #e8ebee;
      padding: 10px 20px;
    }
    .line {
      width: 1px;
      align-self: stretch;
      background: #ddd;
      margin: 0;
    }
    .content {
      .el-checkbox-group {
        padding: 20px;
        .el-checkbox {
          margin-left: 0;
          width: 100%;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .container-table   {
    display: block !important;
  }
}
</style>
