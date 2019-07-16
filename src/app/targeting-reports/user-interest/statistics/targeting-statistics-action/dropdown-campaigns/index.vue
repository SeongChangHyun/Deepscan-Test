<template>
  <el-select v-model="selectedCampaign" :placeholder="genI18n('allCampaigns')" multiple collapse-tags class="dropdown-campaigns" @change="onChange">
    <el-row class="search-campaign">
      <el-input v-model="campaignFilterKeyword" @input="keywordOnchange">
        <img slot="append" class="icon-search" src="@/assets/icon/search-icon.png">
      </el-input>
    </el-row>
    <template v-if="displayedCampaigns.length > 0">
      <el-option v-for="campaign in displayedCampaigns" :key="campaign.campaign_id" :label="campaign.campaign_name" :value="campaign.campaign_id" class="list-campaign"/>
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
      selectedCampaign: []
    }
  },
  watch: {
    campaigns: {
      immediate: true,
      handler(val) {
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
