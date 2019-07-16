<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-form-item prop="campaign_device_id">
        <el-select v-model="dataCreateCampaign.campaign_device_id" class="h-input-select-sub">
          <el-option
            :label="genI18n('allAvailableDevices')"
            :value="allDevices"
          />
          <el-option
            v-for="item in listDevice"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
            <div>
              <span>{{ item.name }}</span>
              <span v-if="!!item.statCount" class="fl-right">{{ item.statCount }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { ALL } from '@/common/constants'

export default {
  data() {
    return {
      allDevices: ALL
    }
  },
  computed: {
    ...mapState('campaign', {
      dataCreateCampaign: state => state.dataCreateCampaign,
      listDevice: state => state.listDevice
    })
  },
  created() {
    this.$store.dispatch('campaign/loadListDevice', {})
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.device.${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.h-input-select-sub {
  width: 100%;
}
</style>

