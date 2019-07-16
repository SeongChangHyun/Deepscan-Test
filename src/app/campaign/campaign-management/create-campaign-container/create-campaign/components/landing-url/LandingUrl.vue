<template>
  <el-row class="h-form-input">
    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="5">
      <p class="h-title">
        {{ genI18n('title') }}
        <sup>*</sup>:
      </p>
    </el-col>

    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="19">
      <el-form-item prop="landingUrl.url">
        <el-input
          :disabled="setAboutAppStatus"
          v-model="landingUrl.url"
          :placeholder="genI18n('placeholderUrl')"
        />
      </el-form-item>

      <el-checkbox
        v-model="landingUrl.setAboutApp.status"
        class="h-pd-t-5"
      >{{ genI18n('setAboutApp') }}</el-checkbox>

      <el-row v-if="setAboutAppStatus">
        <SetAboutApp
          :disabled="!setAboutAppStatus"
          :gen-i18n-parent="genI18n"
          :url-store="URL_CH_PLAY"
          type-app="android"
        />
        <SetAboutApp
          :disabled="!setAboutAppStatus"
          :gen-i18n-parent="genI18n"
          :url-store="URL_APP_STORE"
          type-app="ios"
        />
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import SetAboutApp from './components/SetAboutApp'
import { Common } from '@/common/constants'

export default {
  components: {
    SetAboutApp
  },
  data() {
    return {
      URL_CH_PLAY: Common.URL_CH_PLAY,
      URL_APP_STORE: Common.URL_APP_STORE
    }
  },
  computed: {
    ...mapState('campaign', {
      landingUrl: state => state.dataCreateCampaign.landingUrl,
      setAboutAppStatus: state =>
        state.dataCreateCampaign.landingUrl.setAboutApp.status,
      showErr: state => state.errorCampaign.landingUrl
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
        (val.search('https://') !== 0 && val.search('http://') !== 0)
      ) {
        this.$store.dispatch('campaign/setErrorCampaign', { landingUrl: true })
      } else {
        this.$store.dispatch('campaign/setErrorCampaign', {
          landingUrl: false
        })
      }
    }
  },
  created() {
    this.$store.dispatch('campaign/loadListCountry', {})
    this.$store.dispatch('campaign/loadListAppCampaign', {})
    this.$store.dispatch('campaign/loadListTrackingCompanies')
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

