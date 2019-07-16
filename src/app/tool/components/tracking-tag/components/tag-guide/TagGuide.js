import { mapGetters } from 'vuex'
import {
  SITE_TYPES,
  PLATFORM_PROVIDER_OPTIONS,
  XML_PANEL_LABELS
} from '@/common/tracking-tag/tagGuideCommon'
import { trackingTag as trackingTagConstants } from '@/common/constants'
import { getClientId } from '@/utils/auth'
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'TagGuide',
  components: { ContentLoader },
  data() {
    return {
      selectedPlatform: null,
      trackingTagOptions: null,
      checkAll: false,
      generated: false,
      deviceTypes: trackingTagConstants.DEVICE_TYPE,
      standaloneInstallationLabel: SITE_TYPES.STANDALONE_INSTALLATION,
      platformSystemBaseLabel: SITE_TYPES.PLATFORM_SYSTEM_BASE,
      siteType: SITE_TYPES.STANDALONE_INSTALLATION,
      platforms: PLATFORM_PROVIDER_OPTIONS,
      xmlPanelLabels: XML_PANEL_LABELS,
      informationList: null,
      trackingTagOptionsAll: null,
      trackingTagOptionsDefault: null,
      activeName: 'pcWeb',
      showLoading: true
    }
  },
  watch: {
    checkAll: function(val) {
      if (val) {
        this.trackingTagOptions.forEach(tag => {
          tag.isChecked = true
        })
      } else {
        this.trackingTagOptions.forEach(tag => {
          tag.isChecked = false
        })
      }
    },
    listData: function(val) {
      if (val.length >= 7) {
        const list = val.map(trackingTag => {
          return {
            ...trackingTag,
            label: trackingTag.custom_tag_name,
            isChecked: false
          }
        })
        if (val.length > 7) {
          this.trackingTagOptionsAll = list
        }
        if (val.length === 7) {
          this.trackingTagOptionsDefault = list
        }
      }
      this.trackingTagOptions = this.trackingTagOptionsDefault
      if (this.trackingTagOptionsAll && this.trackingTagOptionsDefault) {
        this.showLoading = false
      }
    }
  },
  computed: {
    ...mapGetters('tool', [
      'listData'
    ])
  },
  methods: {
    genI18n(params) {
      return this.$t(`trackingTag.tagGuide.${params}`)
    },
    onChange() {
      this.trackingTagOptions = null
      this.informationList = null
      if (this.siteType === SITE_TYPES.PLATFORM_SYSTEM_BASE) {
        this.checkAll = false
        this.trackingTagOptions = this.trackingTagOptionsAll
        this.trackingTagOptions.forEach(item => {
          item.isChecked = false
        })
      } else {
        this.checkAll = false
        this.trackingTagOptions = this.trackingTagOptionsDefault
        this.trackingTagOptions.forEach(item => {
          item.isChecked = false
        })
      }
    },
    onGenerate() {
      if (this.siteType === this.platformSystemBaseLabel && !this.selectedPlatform) {
        this.$refs.SelectPlatformComponent.focus()
        return
      }
      const generatedItems = this.informationList.map(item => item.id)
      this.trackingTagOptions
        .filter(item => item.isChecked)
        .forEach((item) => {
          if (!generatedItems.includes(item.tracking_tag_id)) {
            this.informationList.push({
              id: item.tracking_tag_id,
              wpHcuid: '',
              ti: getClientId(),
              ty: item.custom_value_name,
              device: 'web',
              items: [
                {
                  i: item.custom_tag_name,
                  t: item.custom_tag_name,
                  p: item.conversion_value,
                  q: 1
                }
              ]
            })
          }
        })
    },
    generateDefaultValue(value) {
      return value || ''
    },
    onClickDevice(item, device) {
      const newInformationList = this.informationList.map(inf => inf.id === item.id ? { ...inf, device } : inf)
      this.informationList = newInformationList
    },
    changeDevice(item) {
      this.onClickDevice(item, item.device === this.deviceTypes.MOBILE ? this.deviceTypes.WEB : this.deviceTypes.MOBILE)
    },
    getPlatformLabel(platform) {
      return this.genI18n('platforms.' + platform.label)
    }
  },
  created() {
    let getAllError = false
    let getDefaultError = false
    this.$store.dispatch('tool/getAllTrackingTags')
      .catch(() => {
        getAllError = true
        if (getDefaultError) {
          this.showLoading = false
        }
      })
    this.$store.dispatch('tool/getAllTrackingTags', { tag_type: 'DEFAULT' })
      .catch(() => {
        getDefaultError = true
        if (getAllError) {
          this.showLoading = false
        }
      })
  }
}
