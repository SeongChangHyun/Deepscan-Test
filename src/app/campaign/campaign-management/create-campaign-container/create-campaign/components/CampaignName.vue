<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-input
        v-model="campaignName.name"
        :disabled="campaignName.useCampaignSetting"
        :placeholder="genI18n('placeholderName')"
      />

      <el-checkbox
        v-model="campaignName.useCampaignSetting"
        class="h-pd-t-5"
      >{{ genI18n('useCampaignSetting') }}</el-checkbox>

      <el-row v-if="campaignName.useCampaignSetting" class="h-pd-t-5">
        <el-select
          :disabled="!campaignName.useCampaignSetting"
          v-model="campaignName.id"
          :placeholder="genI18n('placeholderSelectCampaign')"
          class="h-input-select-sub"
        >
          <el-option
            v-for="item in listCampaign"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('campaign', {
      campaignName: state => state.dataCreateCampaign.campaignName,
      useCampaignSetting: state =>
        state.dataCreateCampaign.campaignName.useCampaignSetting,
      listCampaign: state => state.listCampaign
    })
  },
  watch: {
    useCampaignSetting: function(val) {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        campaignName: {
          useCampaignSetting: val,
          name: '',
          id: ''
        }
      })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListCampaign', {})
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.campaignName.${params}`)
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
