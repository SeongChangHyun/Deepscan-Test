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
        v-model="adGroupName.name"
        :disabled="adGroupName.setExtraGroup"
        :placeholder="genI18n('placeholderName')"
      />

      <p v-if="showErr && !adGroupName.setExtraGroup" class="mess-error">{{ genI18n('error') }}</p>

      <el-checkbox
        v-model="adGroupName.setExtraGroup"
        class="h-pd-t-10"
      >{{ genI18n('setCampaignExtra') }}</el-checkbox>

      <el-row v-if="adGroupName.setExtraGroup" class="h-pd-t-10">
        <el-select
          :disabled="!adGroupName.setExtraGroup"
          v-model="adGroupName.id"
          :placeholder="genI18n('placeholderSelectGroup')"
          class="h-input-select-sub"
        >
          <el-option
            v-for="item in listAdGroup"
            :key="item.campaign_group_id"
            :label="item.campaign_group_name"
            :value="item.campaign_group_id"
          />
        </el-select>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showErr: false
    }
  },
  computed: {
    ...mapState('campaign', {
      adGroupName: state => state.dataCreateCampaign.adGroupName,
      setExtraGroup: state =>
        state.dataCreateCampaign.adGroupName.setExtraGroup,
      listAdGroup: state => state.listAdGroup
    }),
    name() {
      return this.adGroupName.name
    }
  },
  watch: {
    setExtraGroup: function(val) {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        adGroupName: {
          setExtraGroup: val,
          name: '',
          id: ''
        }
      })
    },
    name(val) {
      if (val === '') this.showErr = true
      else this.showErr = false
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListAdGroup', {})
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.adGroupName.${params}`)
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

