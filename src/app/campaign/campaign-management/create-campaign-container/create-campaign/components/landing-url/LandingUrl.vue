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
      <p v-if="showErr && !setAboutAppStatus" class="mess-error">{{ genI18n('error') }}</p>

      <el-checkbox
        v-model="landingUrl.setAboutApp.status"
        class="h-pd-t-10"
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
  data() {
    return {
      showErr: false
    }
  },
  computed: {
    ...mapState('campaign', {
      landingUrl: state => state.dataCreateCampaign.landingUrl,
      setAboutAppStatus: state =>
        state.dataCreateCampaign.landingUrl.setAboutApp.status
    }),
    url() {
      return this.landingUrl.url
    }
  },
  watch: {
    setAboutAppStatus: function(val) {
      this.$store.dispatch('campaign/setDataCreateCampaign', {
        landingUrl: {
          ...this.landingUrl,
          url: ''
        }
      })
    },
    url(val) {
      if (
        !val ||
        (val.search('https://') !== 0 && val.search('http://')) !== 0
      ) {
        this.showErr = true
      } else this.showErr = false
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListCountry', {})
    this.$store.dispatch('campaign/loadListAppCampaign', {})
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

