<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-form-item :show-message="!setExtraGroup" prop="campaign_group.campaign_group_name">
        <el-input
          v-model="campaign_group.campaign_group_name"
          :disabled="setExtraGroup"
          :placeholder="genI18n('placeholderName')"
        />
      </el-form-item>
      <el-checkbox v-model="setExtraGroup" class="h-pd-t-5">{{ genI18n('setCampaignExtra') }}</el-checkbox>

      <el-row class="h-pd-t-10">
        <el-form-item :show-message="setExtraGroup" prop="campaign_group.campaign_group_id" class="h-input-select-sub">
          <el-select
            :disabled="!setExtraGroup"
            v-model="campaign_group.campaign_group_id"
            :placeholder="genI18n('placeholderSelectGroup')"
            class="w-100"
          >
            <el-option
              v-for="item in listAdGroup"
              :key="item.campaign_group_id"
              :label="item.campaign_group_name"
              :value="item.campaign_group_id"
            />
          </el-select>
        </el-form-item>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      setExtraGroup: false
    }
  },
  computed: {
    ...mapState('campaign', {
      campaign_group: state => state.dataCreateCampaign.campaign_group,
      listAdGroup: state => state.listAdGroup,
      showErr: state => state.errorCampaign.campaign_group
    }),
    name() {
      return this.campaign_group.campaign_group_name
    },
    id() {
      return this.campaign_group.campaign_group_id
    }
  },
  watch: {
    setExtraGroup: function(val) {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        campaign_group: {
          setExtraGroup: val,
          campaign_group_id: '',
          campaign_group_name: ''
        }
      })
      const path = 'campaign_group'
      const rule = {
        campaign_group_name: val ? [] : [
          { required: true, message: this.$t('createCampaign.stepCreateCampaign.adGroupName.error'), trigger: 'blur' },
          { validator: this.validateAdGroupNameExist, trigger: 'blur' }
        ],
        campaign_group_id: val ? [{ required: true, message: this.$t('createCampaign.stepCreateCampaign.adGroupName.errorSelect'), trigger: 'change' }] : []
      }
      this.$emit('update-rules', path, rule)
    }

  },
  created() {
    this.$store.dispatch('campaign/loadListAdGroup', {})
  },
  methods: {
    genI18n(params) {
      return this.$t(
        `createCampaign.stepCreateCampaign.adGroupName.${params}`
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

