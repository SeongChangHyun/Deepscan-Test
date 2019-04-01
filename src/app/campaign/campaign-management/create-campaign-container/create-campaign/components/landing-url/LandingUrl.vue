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
        :disabled="setAboutAppStatus"
        v-model="landingUrl.url"
        :placeholder="genI18n('placeholderUrl')"
      />

      <el-checkbox
        v-model="landingUrl.setAboutApp.status"
        class="h-pd-t-5"
      >{{ genI18n('setAboutApp') }}</el-checkbox>

      <el-row v-if="setAboutAppStatus">
        <SetAboutApp :disabled="!setAboutAppStatus" :gen-i18n-parent="genI18n" type-app="android"/>
        <SetAboutApp :disabled="!setAboutAppStatus" :gen-i18n-parent="genI18n" type-app="ios"/>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import SetAboutApp from './components/SetAboutApp'

export default {
  components: {
    SetAboutApp
  },
  computed: {
    ...mapState('campaign', {
      landingUrl: state => state.dataCreateCampaign.landingUrl,
      setAboutAppStatus: state =>
        state.dataCreateCampaign.landingUrl.setAboutApp.status
    })
  },
  watch: {
    setAboutAppStatus: function(val) {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        landingUrl: {
          ...this.landingUrl,
          url: ''
        }
      })
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListCountry', {})
  },
  methods: {
    genI18n(params) {
      return this.$t(`createCampaign.stepCreateCampaign.landingUrl.${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

