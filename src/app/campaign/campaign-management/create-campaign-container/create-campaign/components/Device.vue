<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-select v-model="value" class="h-input-select-sub">
        <el-option
          v-for="item in listDevice"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        >
          <div>
            <span>{{ item.name }}</span>
            <span v-if="!!item.effected_number" class="fl-right">{{ item.effected_number }}</span>
          </div>
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showSelect: false,
      value: 'all'
    }
  },
  computed: {
    ...mapState('campaign', {
      deviceValue: state => state.dataCreateCampaign.device,
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

