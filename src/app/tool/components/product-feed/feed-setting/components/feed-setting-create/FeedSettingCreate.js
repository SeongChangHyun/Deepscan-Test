import _ from 'lodash'
import { FeedSetting } from '@/common/product-feed/feedSetting'
import { ScheduleHour } from '@/common/product-feed/scheduleHour'
import { Message } from 'element-ui'
export default {
  name: 'FeedSetting',
  data() {
    function validateTextHttp(str) {
      var tarea = str
      if (tarea.indexOf('http://') === 0 || tarea.indexOf('https://') === 0) {
        return true
      }
      return false
    }
    var validateFeedNameUrl = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.genI18n('validateMessage.feedName')))
      } else {
        callback()
      }
    }
    function validateFeedFileName(str) {
      if (str.indexOf('//') >= 0) {
        const text = str.substr(str.indexOf('//') + 2, str.length)
        if (text.lastIndexOf('/') >= 0) {
          if (text.substr(text.lastIndexOf('/') + 1, text.length) !== '') {
            return true
          }
          return false
        }
        return false
      }
      return false
    }
    var validateFullFeedUrl = (rule, value, callback) => {
      if (!value) {
        this.isCheckFullFeedDisable = false
        callback(new Error(this.genI18n('validateMessage.fullFeedURL')))
      } else if (!validateTextHttp(value)) {
        this.isCheckFullFeedDisable = true
        callback(new Error('Full feed ' + this.genI18n('validateMessage.startHttpAndHttps')))
      } else if (!validateFeedFileName(value)) {
        this.isCheckFullFeedDisable = true
        callback(new Error(this.genI18n('validateMessage.fullFeedFileName')))
      } else {
        this.isCheckFullFeedDisable = false
        this.defaultSettingFormModel.fullFeedURL = value
        callback()
      }
    }
    var validateAddingFeedUrl = (rule, value, callback) => {
      if (!value) {
        this.checkAddingFeedResult = true
      } else if (!validateTextHttp(value)) {
        this.isCheckAddingFeedDisable = true
        callback(new Error('Adding feed ' + this.genI18n('validateMessage.startHttpAndHttps')))
      } else if (!validateFeedFileName(value)) {
        this.isCheckAddingFeedDisable = true
        callback(new Error(this.genI18n('validateMessage.addingFeedFileName')))
      } else {
        this.isCheckAddingFeedDisable = false
        this.additionalOptions.addingFeedURL = value
        callback()
      }
    }
    var validateSoldoutFeedUrl = (rule, value, callback) => {
      if (!value) {
        this.checkSoldoutFeedResult = true
      } else if (!validateTextHttp(value)) {
        this.isCheckSoldoutFeedDisable = true
        callback(new Error('Soldout feed ' + this.genI18n('validateMessage.startHttpAndHttps')))
      } else if (!validateFeedFileName(value)) {
        this.isCheckSoldoutFeedDisable = true
        callback(new Error(this.genI18n('validateMessage.soldoutFeedFileName')))
      } else {
        this.isCheckSoldoutFeedDisable = false
        this.additionalOptions.soldoutFeedURL = value
        callback()
      }
    }
    var validateDesktopWebsite = (rule, value, callback) => {
      if (!value) {
        return true
      }
      if (!validateTextHttp(value)) {
        callback(new Error('Desktop website ' + this.genI18n('validateMessage.startHttpAndHttps')))
      } else {
        callback()
      }
    }
    var validateMobileWebsite = (rule, value, callback) => {
      if (!value) {
        return true
      }
      if (!validateTextHttp(value)) {
        callback(new Error('Mobile website ' + this.genI18n('validateMessage.startHttpAndHttps')))
      } else {
        callback()
      }
    }
    var validateChangeValue = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.genI18n('validateMessage.changeValue')))
      } else {
        callback()
      }
    }
    var validatesScheduleValue = (rule, value, callback) => {
      if (this.generateListHour().length === 0) {
        callback(new Error(this.genI18n('validateMessage.scheduleValid')))
      } else {
        callback()
      }
    }
    return {
      maxLength: 200,
      checkFullFeedResult: false,
      checkAddingFeedResult: true,
      checkSoldoutFeedResult: true,
      isCheckFullFeedDisable: true,
      isCheckFullFeedApi: false,
      isCheckAddingFeedDisable: true,
      isCheckSoldoutFeedDisable: true,
      accountTimeZone: '',
      defaultSettingFormModel: {
        usageStatus: '',
        feedName: '',
        currency: '',
        fullFeedURL: null,
        schedule: ''
      },
      additionalOptions: {
        addingFeedURL: null,
        soldoutFeedURL: null,
        feedGroupName: '',
        setFeedToExtraGroud: false,
        groud: ''
      },
      urlPattern: {
        desktopWebsite: null,
        mobileWebsite: null,
        androidApp: '',
        iOSApp: ''
      },
      clickURLParameter: {
        desktopWebsite: '',
        mobileWebsite: '',
        androidApp: '',
        iOSApp: ''
      },
      impressionURLParameter: {
        desktopWebsite: '',
        mobileWebsite: '',
        androidApp: '',
        iOSApp: ''
      },
      advancedSettings: {
        currencyMarking: '',
        feedType: '',
        encodingType: '',
        regularExpression: [
          {
            id: 0,
            field: '',
            pattern: '',
            replacement: ''
          }
        ],
        existingValue: '',
        changedValue: ''
      },
      // Create list data value component
      usageStatusOptions: FeedSetting.usageStatus,
      currencyOptions: FeedSetting.currencyOptions,
      scheduleHourOptions: ScheduleHour,
      hourSelectedList: [],
      currencyMarkingOptions: FeedSetting.currencyMarking,
      feedTypeOptions: FeedSetting.feedType,
      encodingTypeOptions: FeedSetting.encodingType,
      regularExpressionOptions: FeedSetting.regularExperssion,
      groupOption: [
        {
          label: this.genI18n('selectGroup'),
          value: 'selectGroup'
        },
        {
          label: '2018 Group', // fix value to create UI
          value: '2018'
        }
      ],
      listTime: [],
      defaultSettingFormRules: {
        feedName: [
          { validator: validateFeedNameUrl, trigger: 'blur' }
        ],
        fullFeedURL: [
          { validator: validateFullFeedUrl, trigger: 'blur' },
          { validator: validateFullFeedUrl, trigger: 'submit' }
        ],
        addingFeedURL: [
          { validator: validateAddingFeedUrl, trigger: 'blur' }
        ],
        soldoutFeedURL: [
          { validator: validateSoldoutFeedUrl, trigger: 'blur' }
        ],
        desktopWebsite: [
          { validator: validateDesktopWebsite, trigger: 'submit' }
        ],
        mobileWebsite: [
          { validator: validateMobileWebsite, trigger: 'submit' }
        ],
        changedValue: [
          { validator: validateChangeValue, trigger: 'change' }
        ],
        schedule: [
          { validator: validatesScheduleValue, trigger: 'submit' }
        ]
      }
    }
  },
  computed: {
    checkListHasItemSeleted: function() {
      this.hourSelectedList = _.filter(this.scheduleHourOptions, (item) => item.selected)
      return this.hourSelectedList.length > 0
    },
    generateReviewCurrencry: function() {
      let label = ''
      if (this.advancedSettings.currencyMarking === 1) {
        label = this.currencyMarkingOptions[1].label + ' ' + FeedSetting.moneyExample
      } else {
        label = FeedSetting.moneyExample + ' ' + this.currencyMarkingOptions[0].label
      }
      return label
    }
  },
  created() {
    const timeZone = this.$store.getters.user.timeZone
    if (timeZone) {
      this.accountTimeZone = timeZone
    }
    this.setDefaultValueForm()
  },
  methods: {
    onChangeRegularExpression(value) {
      const indexItem = this.regularExpressionOptions.findIndex(item => item.value === value)
      this.regularExpressionOptions[indexItem].selected = !this.regularExpressionOptions[indexItem].selected
    },
    genI18n(params) {
      return this.$t(`productFeed.${params}`)
    },
    setDefaultValueForm() {
      this.defaultSettingFormModel.usageStatus = this.usageStatusOptions[0].value
      this.defaultSettingFormModel.currency = this.currencyOptions[0].value
      this.additionalOptions.groud = this.groupOption[0].value
      this.advancedSettings.currencyMarking = this.currencyMarkingOptions[0].value
      this.advancedSettings.feedType = this.feedTypeOptions[0].value
      this.advancedSettings.encodingType = this.encodingTypeOptions[0].value
    },
    checkHasValueRegularExpression(field) {
      return field === 'none'
    },
    selectHour(hour) {
      if (this.hourSelectedList.length === FeedSetting.timeZoneLengthLimit && !hour.selected) return
      const indexItemSelect = _.findIndex(this.scheduleHourOptions, (item) => item.value === hour.value)
      this.scheduleHourOptions[indexItemSelect].selected = !this.scheduleHourOptions[indexItemSelect].selected
      this.scheduleHourOptions = [...this.scheduleHourOptions]
      this.$refs.defaultSettingForm.validateField('schedule')
    },
    generateLabelHourSelected(item, index) {
      return FeedSetting.timeZonePosition[index].label + item.label
    },
    createNewProductFeedSetting() {
      this.$refs.defaultSettingForm.validate((valid) => {
        if (!valid) {
          Message.error(this.genI18n('validateMessage.submitFormFail'))
          return
        }
      })
      this.$refs.additionalOptionsForm.validate((valid) => {
        if (!valid) {
          Message.error(this.genI18n('validateMessage.submitFormFail'))
          return
        }
      })
      this.$refs.urlPatternForm.validate((valid) => {
        if (!valid) {
          Message.error(this.genI18n('validateMessage.submitFormFail'))
          return
        }
      })
      this.$refs.advancedSettins.validate((valid) => {
        if (!valid) {
          Message.error(this.genI18n('validateMessage.submitFormFail'))
          return
        }
      })
      if (this.generateListHour().length === 0) {
        Message.error(this.genI18n('validateMessage.scheduleValid'))
        return
      }
      if (!this.isCheckFullFeedApi) {
        Message.error(this.genI18n('validateMessage.isCheckFullFeedUrl'))
        return
      }
      for (const i in this.advancedSettings.regularExpression) {
        const item = this.advancedSettings.regularExpression[i]
        if (item.field) {
          if (!item.pattern || !this.checkByteLength(item.pattern)) {
            Message.error(this.genI18n('validateMessage.submitFormFail'))
            return
          }
          if (!item.replacement || !this.checkByteLength(item.pattern)) {
            Message.error(this.genI18n('validateMessage.submitFormFail'))
            return
          }
        }
      }
      if (this.checkFullFeedResult && this.checkAddingFeedResult && this.checkSoldoutFeedResult) {
        this.$emit('createNewFeedSetting', this.createDataToCreateFeedSetting())
      } else {
        Message.error(this.genI18n('validateMessage.submitFormFail'))
      }
    },
    cancelCreateNew() {
      this.$emit('updateStatusCreateNew')
    },
    checkFeedType() {
      if (this.defaultSettingFormModel.fullFeedURL === '') return
      this.$store.dispatch('tool/checkFeedType', this.defaultSettingFormModel.fullFeedURL).then((response) => {
        if (response.feed_type) {
          this.advancedSettings.feedType = response.feed_type
        } else {
          // TO DO : handel error
        }
      })
    },
    checkByteLength(value) {
      const valueTrim = value.trim()
      if (Buffer.byteLength(valueTrim, 'shift_jis') > 200) {
        return false
      }
      return true
    },
    handleChangeAddingFeed() {
      this.checkAddingFeedResult = false
    },
    handleChangeSoldoutFeed() {
      this.checkSoldoutFeedResult = false
    },
    checkFullFeed() {
      if (this.defaultSettingFormModel.fullFeedURL === '') return
      const params = {
        adding_feed_url: this.defaultSettingFormModel.fullFeedURL
      }
      this.$store.dispatch('tool/checkFeedFull', params).then((response) => {
        this.isCheckFullFeedApi = true
        if (response[0].result === 'valid') {
          this.checkFullFeedResult = true
          Message.success(this.genI18n('validateMessage.feedURLValid'))
        } else {
          this.checkFullFeedResult = false
          Message.error(this.genI18n('validateMessage.feedURLUnique'))
        }
      }).catch(() => {
        this.checkFullFeedResult = false
        Message.error(this.genI18n('validateMessage.checkFullFeedURL'))
      })
    },
    checkAddingFeedURL() {
      this.$store.dispatch('tool/checkFeedUrl', this.additionalOptions.addingFeedURL).then((response) => {
        if (response[0].result === 'valid') {
          this.checkAddingFeedResult = true
          Message.success(this.genI18n('validateMessage.feedURLValid'))
        } else {
          this.checkAddingFeedResult = false
          Message.error(this.genI18n('validateMessage.feedURLUnique'))
        }
      }).catch(() => {
        this.checkAddingFeedResult = false
        Message.error(this.genI18n('validateMessage.checkAddingFeedURL'))
      })
    },
    checkSoldoutFeedURL() {
      this.$store.dispatch('tool/checkFeedUrl', this.additionalOptions.soldoutFeedURL).then((response) => {
        if (response[0].result === 'valid') {
          this.checkSoldoutFeedResult = true
          Message.success(this.genI18n('validateMessage.feedURLValid'))
        } else {
          this.checkSoldoutFeedResult = false
          Message.error(this.genI18n('validateMessage.feedURLUnique'))
        }
      }).catch(() => {
        this.checkSoldoutFeedResult = false
        Message.error(this.genI18n('validateMessage.checkSoldoutFeedURL'))
      })
    },
    onChangeFeedGroupNameSelect(value) {
      this.additionalOptions.group = value
      this.additionalOptions.feedGroupName = value
    },
    addFieldRegularExpression() {
      const currentLength = this.advancedSettings.regularExpression.length
      const newObject = {
        id: currentLength,
        field: '',
        pattern: '',
        replacement: ''
      }
      this.advancedSettings.regularExpression.push(newObject)
    },
    deleteFieldRegularExpression(index) {
      const indexItem = this.regularExpressionOptions.findIndex(item => item.value === this.advancedSettings.regularExpression[index].field)
      this.regularExpressionOptions[indexItem].selected = false
      this.advancedSettings.regularExpression.splice(index, 1)
    },
    generateListHour() {
      const arrayFilter = []
      for (const i in this.scheduleHourOptions) {
        if (this.scheduleHourOptions[i].selected) {
          const item = {
            time: this.scheduleHourOptions[i].label
          }
          arrayFilter.push(item)
        }
      }
      return arrayFilter
    },
    createDataToCreateFeedSetting() {
      const dataParams = {
        usage_status: this.defaultSettingFormModel.usageStatus,
        feed_name: this.defaultSettingFormModel.feedName,
        currency: this.defaultSettingFormModel.currency,
        full_feed_url: this.defaultSettingFormModel.fullFeedURL,
        schedule: this.generateListHour(),

        adding_feed_url: this.additionalOptions.addingFeedURL,
        soldout_feed_url: this.additionalOptions.soldoutFeedURL,
        feed_group: this.additionalOptions.feedGroupName,

        desktop_url_pattern: this.urlPattern.desktopWebsite,
        mobile_url_pattern: this.urlPattern.mobileWebsite,
        android_url_pattern: this.urlPattern.androidApp,
        ios_url_pattern: this.urlPattern.iOSApp,

        desktop_click_url_parameter: this.clickURLParameter.desktopWebsite,
        mobile_click_url_parameter: this.clickURLParameter.mobileWebsite,
        android_click_url_parameter: this.clickURLParameter.androidApp,
        ios_click_url_parameter: this.clickURLParameter.iOSApp,

        desktop_impression_url_parameter: this.impressionURLParameter.desktopWebsite,
        mobile_impression_url_parameter: this.impressionURLParameter.mobileWebsite,
        android_impression_url_parameter: this.impressionURLParameter.androidApp,
        ios_impression_url_parameter: this.impressionURLParameter.iOSApp,

        currency_marking: this.advancedSettings.currencyMarking,
        feed_type: this.advancedSettings.feedType,
        encoding_type: this.advancedSettings.encodingType,
        feed_preg_replace: this.advancedSettings.regularExpression.filter(item => {
          return item.field
        })
      }
      return dataParams
    }
  }
}
