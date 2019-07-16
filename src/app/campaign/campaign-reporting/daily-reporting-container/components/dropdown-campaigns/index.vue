<template>
  <el-select :value="selectedCampaign" :placeholder="genI18n('allCampaigns')" class="dropdown-campaigns" @change="onChange">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-input :value="campaignFilterKeyword" @input="keywordOnchange" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <el-button class="black-btn">{{ genI18n('search') }}</el-button>
      </el-col>
    </el-row>
    <template v-if="displayedCampaigns.length > 0">
      <el-option v-for="campaign in displayedCampaigns" :key="campaign.campaign_id" :value="campaign.campaign_id">
        <span style="color: #8492a6; font-size: 13px">{{ campaign.campaign_name }}</span>
      </el-option>
    </template>
    <template v-else>
      <el-option :value="''"/>
    </template>
  </el-select>
</template>

<script>
export default {
  name: 'DropdownCampaigns',
  props: {
    campaigns: {
      type: Array,
      required: true
    },
    genI18n: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      campaignFilterKeyword: '',
      displayedCampaigns: [],
      selectedCampaign: ''
    }
  },
  watch: {
    campaigns: {
      immediate: true,
      handler(val, oldVal) {
        this.displayedCampaigns = val
      }
    }
  },
  methods: {
    keywordOnchange(value) {
      this.campaignFilterKeyword = value
      this.displayedCampaigns = this.campaigns.filter(camp => `${camp.campaign_id}`.includes(this.campaignFilterKeyword) || camp.campaign_name.includes(this.campaignFilterKeyword))
    },
    onChange(campaign_id) {
      this.selectedCampaign = this.campaigns.find(c => c.campaign_id === campaign_id).campaign_name
      this.campaignFilterKeyword = ''
      this.displayedCampaigns = this.campaigns
      this.$emit('on-select-campaign', campaign_id)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './style.scss'
</style>
