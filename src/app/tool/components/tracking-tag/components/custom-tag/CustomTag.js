import { mapGetters } from 'vuex'
import moment from 'moment'
import { Common, trackingTag, SUCCESS, ERROR } from '@/common/constants'
import CurrencyInput from '@/components/CurrencyInput'
import Cookies from 'js-cookie'
import { getClientId } from '@/utils/auth'
import { XML_PANEL_LABELS } from '@/common/tracking-tag/tagGuideCommon'
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'CustomTag',
  components: { CurrencyInput, ContentLoader },
  data() {
    return {
      activeName: 'pcWeb',
      max_custom_tag_create: 20,
      language: Cookies.get('language') || Common.EN_CODE,
      currencyType: Common.CURRENCY.KOREA_TYPE,
      labelPosition: Common.LEFT_VALUE,
      formData: {
        custom_tag_name: '',
        rule: trackingTag.ruleValues.default,
        category: trackingTag.conversionValues.default,
        custom_value_name: '',
        destination_url: '',
        referer_url: '',
        set_conversion_value: false,
        conversion_value: null,
        following_information: '',
        dateFormat: Common.FORMAT_FULL_DATE_TIME,
        device: trackingTag.DEVICE_TYPE.WEB,
        conversion: false
      },
      tableData: [],
      ruleValues: trackingTag.ruleValues,
      conversionValues: trackingTag.conversionValues,
      listStatus: trackingTag.listStatus,
      deviceTypes: trackingTag.DEVICE_TYPE,
      rules: {
        custom_tag_name: [
          { required: true, message: 'Please input destination url', trigger: 'blur' }
        ],
        destination_url: [
          { required: true, message: 'Please input destination url', trigger: 'blur' },
          { pattern: Common.URL_PATTERN,
            message: this.genI18n('validateValueMessage'), trigger: 'submit'
          }
        ],
        referer_url: [
          { pattern: Common.URL_PATTERN,
            message: this.genI18n('validateValueMessage'), trigger: 'submit'
          }
        ],
        conversion_value: [
          {
            pattern: Common.NUMBER_WITH_COMMA_PATTERN,
            message: this.genI18n('validateValueMessage'), trigger: 'submit'
          }
        ]
      },
      xmlPanelLabels: XML_PANEL_LABELS,
      getClientId,
      generateFlag: false,
      isLoadingSave: false,
      destinationUrlInvalid: null,
      customValueNameInvalid: null,
      showLoading: false,
      loadingTagIndex: []
    }
  },
  watch: {
    listData: function(val) {
      this.tableData = val.map(item => {
        return {
          ...item,
          create_date: this.formatDate(item.create_date),
          checked_date: this.formatDate(item.checked_date)
        }
      })
    },
    createdTrackingTag: function(val) {
      if (val && Object.keys(val).length > 0) {
        this.showMessage(SUCCESS, 'trackingTagCreatedSuccessfully')
        this.$store.dispatch('tool/getAllTrackingTags', { tag_type: 'CUSTOM' })
      }
    }
  },
  computed: {
    ...mapGetters('tool', [
      'listData',
      'createdTrackingTag'
    ])
  },
  methods: {
    genI18n(params) {
      return this.$t(`trackingTag.customTag.${params}`)
    },
    formatDate(date) {
      return moment(date).format(`${Common.FORMAT_DATE_YYYY_MM_DD} ${Common.FORMAT_TIME}`)
    },
    getCurrencyType() {
      let currencyType
      switch (this.language) {
        case Common.KO_CODE:
          currencyType = Common.CURRENCY.KOREA_TYPE
          break
        case Common.EN_CODE:
          currencyType = Common.CURRENCY.USA_TYPE
          break
        default:
          currencyType = Common.CURRENCY.JAPAN_TYPE
          break
      }
      return currencyType
    },
    getNoteMessage() {
      let message
      switch (this.language) {
        case Common.KO_CODE:
          message = trackingTag.CUSTOM_TAG.NOTE_MESSAGE_KO1 + this.max_custom_tag_create + trackingTag.CUSTOM_TAG.NOTE_MESSAGE_KO2 + this.tableData.length + trackingTag.CUSTOM_TAG.NOTE_MESSAGE_KO3
          break
        case Common.EN_CODE:
          message = trackingTag.CUSTOM_TAG.NOTE_MESSAGE_EN1 + this.max_custom_tag_create + trackingTag.CUSTOM_TAG.NOTE_MESSAGE_EN2 + this.tableData.length
          break
        default:
          message = trackingTag.CUSTOM_TAG.NOTE_MESSAGE_EN1 + this.max_custom_tag_create + trackingTag.CUSTOM_TAG.NOTE_MESSAGE_EN2 + this.tableData.length + ' [' + this.language + ']'
          break
      }
      return message
    },
    getFollowingInformation() {
      return `
      <!-- WIDERPLANET PURCHASE SCRIPT START 2018.4.11 -->
      wp_hcuid:"",
      ti:"` + getClientId() + `",
      ty:"` + this.formData.custom_value_name + `",
      device:"` + this.formData.device + `",
      items:[
      {i:"` + this.formData.custom_tag_name + `", t:"` + this.formData.custom_tag_name + ` ", p:"` + this.formData.conversion_value + ` ", q:"1"}]
      <!-- // WIDERPLANET PURCHASE SCRIPT END 2018.4.11 -->
      `
    },
    changeSetConversionValue() {
      this.formData.set_conversion_value = !this.formData.set_conversion_value
    },
    changeRule() {
      this.$refs.setConversionValue.$el.click()
    },
    onGenerate() {
      this.generateFlag = true
    },
    numberWithCommas(value) {
      return value ? value.toString().replace(Common.NUMBER_WITH_COMMA_FORMAT_PATTERN, ',') : ''
    },
    onChangeConversionValue(value) {
      this.formData.conversion_value = value
    },
    displayConversionValue() {
      return this.numberWithCommas(this.formData.conversion_value)
    },
    changeStatus(index, trackingTag) {
      const params = {
        trackingTagId: trackingTag.tracking_tag_id,
        payload: {
          status: !trackingTag.usage_status
        }
      }
      this.loadingTagIndex.push(index)
      this.$store.dispatch('tool/changeTrackingTagStatus', { params, callback: (error) => {
        this.loadingTagIndex.splice(this.loadingTagIndex.indexOf(index), 1)
        if (error) {
          this.showMessage(ERROR, 'errMsgCallAPIFailed')
          return
        }
        this.tableData[index].usage_status = !this.tableData[index].usage_status
      } })
    },
    changeDevice(tab) {
      this.formData.device = tab.index === '0' ? this.deviceTypes.WEB : this.deviceTypes.MOBILE
      this.onGenerate()
    },
    editCustomTag(data) {
      // TO DO: Handle edit custom tag
      for (const item in this.formData) {
        if (data[item]) {
          this.formData[item] = data[item]
        }
      }
    },
    changeCategory() {
      this.formData.conversion = this.formData.set_conversion_value = false
    },
    onSubmit() {
      this.$refs.customTagForm.validate((valid) => {
        if (valid) {
          const {
            custom_tag_name,
            rule,
            category,
            custom_value_name,
            destination_url,
            referer_url,
            conversion_value
          } = this.formData
          const payload = {
            custom_tag_name,
            rule,
            category,
            custom_value_name,
            destination_url,
            refer_url: referer_url,
            conversion_value
          }
          if (this.tableData.length > 20) {
            this.showMessage(ERROR, 'errMsgLimitationViolate')
            return false
          }
          this.checkDestinationUrl()
          if (this.destinationUrlInvalid) {
            return false
          }
          this.isLoadingSave = true
          this.$store.dispatch('tool/createTrackingTag', payload)
            .then((response) => {
              this.isLoadingSave = false
            })
            .catch(() => {
              this.isLoadingSave = false
            })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$refs.customTagForm.resetFields()
    },
    showMessage(type, message) {
      this.$message({
        message: this.genI18n(message),
        type: type
      })
    },

    checkDestinationUrl() {
      this.doCheck(true)
    },
    checkCustomValueName() {
      this.doCheck(false)
    },

    doCheck(isDestinationUrl) {
      const field = isDestinationUrl ? 'destination_url' : 'custom_value_name'
      this.$refs.customTagForm.validateField(field)
      let error = false
      this.tableData.forEach((item) => {
        if (item[field] === this.formData[field]) {
          error = true
          return
        }
      })
      if (error) {
        this.showMessage(ERROR, 'errorMessage.msgDestinationUrlExist')
        this.destinationUrlInvalid = isDestinationUrl
        this.customValueNameInvalid = !isDestinationUrl
      } else {
        this.destinationUrlInvalid = !isDestinationUrl
        this.customValueNameInvalid = isDestinationUrl
      }
    },
    generateDefaultValue(value) {
      return value || ''
    }
  },
  created() {
    this.showLoading = true
    this.$store.dispatch('tool/getAllTrackingTags', { tag_type: 'CUSTOM' })
      .then(() => {
        this.showLoading = false
      })
      .catch(() => {
        this.showLoading = false
      })
  }
}
