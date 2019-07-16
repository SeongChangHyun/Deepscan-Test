<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-form-item prop="campaign_name">
        <el-input
          v-model="dataCreateCampaign.campaign_name"
          :placeholder="genI18n('placeholderName')"
        />
      </el-form-item>

      <el-checkbox v-model="useCampaignSetting" class="h-pd-t-5">{{ genI18n('useCampaignSetting') }}</el-checkbox>

      <el-row class="h-pd-t-10">
        <el-form-item class="h-input-select-sub">
          <el-select
            :disabled="!useCampaignSetting"
            v-model="campaign_id"
            :placeholder="genI18n('placeholderSelectCampaign')"
            class="w-100"
          >
            <el-option
              v-for="item in listCampaign"
              :key="item.campaign_id"
              :label="item.campaign_name"
              :value="item.campaign_id"
            />
          </el-select>
        </el-form-item>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import find from 'lodash/find'

export default {
  data() {
    return {
      useCampaignSetting: false,
      campaign_id: ''
    }
  },
  computed: {
    ...mapState('campaign', {
      dataCreateCampaign: state => state.dataCreateCampaign,
      campaign_name: state => state.dataCreateCampaign.campaign_name,
      listCampaign: state => state.listCampaign,
      showErr: state => state.errorCampaign.campaignName
    })
  },
  watch: {
    campaign_id: function(val) {
      const campaign = find(this.listCampaign, { campaign_id: val })
      this.dataCreateCampaign.campaign_name = campaign.campaign_name
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListCampaign', {
      // TO DO: uncomment these two fields when BE returns the correct values
      // goal: this.dataCreateCampaign.g_type,
      // c_type: this.dataCreateCampaign.c_type
    })
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.campaignName.${params}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.h-input-select-sub {
  width: 100%;
  padding-left: 25px;
}
</style>
