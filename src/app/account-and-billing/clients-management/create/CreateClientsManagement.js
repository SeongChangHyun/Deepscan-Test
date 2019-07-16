import { AccountAndBillings, Common, Auth, ADDRESS_SEARCH_ROAD_BASE_TYPE } from '@/common/constants'
import { countdownTimer } from '@/utils'
import { mapGetters } from 'vuex'
import { validEmailFormat, validFormWebUrl } from '@/utils/validate'
import AddressSearch from '@/components/address-search'
import { createClientModel } from '../ModelCreateClient'
import { getRoleClient } from '../permission'
import moment from 'moment-timezone'
import { ClientsManagementMixin } from '../ClientsManagementMixin'
import { ListLoader } from 'vue-content-loader'

export default {
  name: 'CreateClientForm',
  components: { ListLoader, AddressSearch },
  mixins: [ClientsManagementMixin],
  props: {
    clientDetail: {
      type: Object,
      default: () => ({})
    },
    advertiserTerms: {
      type: String,
      default: ''
    },
    accountInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const validWebUrl = validFormWebUrl.bind(this)
    const validateClientName = (rule, value, callback, dataField) => {
      if (value.trim() === '') {
        callback(new Error(this.$t('memberAccount.errMsg1', { fieldName: this.$t('client.clientName') })))
        return
      }
      if (Buffer.byteLength(value, 'shift_jis') > 60) {
        callback(new Error(this.$t('client.errMsgLimit', { fieldName: this.$t('client.clientName'), num: 60 })))
        return
      }
      callback()
    }
    const validateCellPhone = (rule, value, callback, dataField) => {
      if (!value) {
        callback()
        return
      }
      if (value.toString().length < Common.MIN_LENGTH_PHONE_NUMBER || value.toString().length > Common.MAX_LENGTH_PHONE_NUMBER) {
        callback(new Error(this.$t('memberAccount.errMsgLengthRange', { fieldName: this.$t('memberAccount.cellPhone'), min: Common.MIN_LENGTH_PHONE_NUMBER, max: Common.MAX_LENGTH_PHONE_NUMBER })))
        return
      }
      callback()
    }
    const validateBusinessPhone = (rule, value, callback, dataField) => {
      if (!value) {
        callback()
        return
      }
      if (value.toString().length < Common.MIN_LENGTH_PHONE_NUMBER || value.toString().length > Common.MAX_LENGTH_PHONE_NUMBER) {
        callback(new Error(this.$t('memberAccount.errMsgLengthRange', { fieldName: this.$t('memberAccount.legalPhoneNumber'), min: Common.MIN_LENGTH_PHONE_NUMBER, max: Common.MAX_LENGTH_PHONE_NUMBER })))
        return
      }
      callback()
    }
    const validateOtp = (rule, value, callback, dataField) => {
      if (this.isDisableButtonVerifyOtp) {
        callback()
        return
      }
      if (!this.clientForm.cell_phone) {
        callback()
        return
      }
      if (!value) {
        callback(new Error(this.$t('memberAccount.errMsg1', { fieldName: this.$t('memberAccount.otp') })))
        return
      }
      callback()
    }
    const validateEmail = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error(this.$t('client.errEmail1')))
        return
      }
      if (!validEmailFormat(value)) {
        const array = value.split('@')
        if (array[0].length <= 20) {
          callback(new Error(this.$t('user.errorMessage.msgInvalidEmail')))
          return
        } else {
          callback(new Error(this.$t('user.errorMessage.msgInvalidEmailLimit')))
          return
        }
      }
      callback()
    }
    return {
      value: '',
      common: Common,
      accountAndBillings: AccountAndBillings,
      isLoading: true,
      isReadTermErr: false,
      isSentCode: false,
      timeExpired: '',
      expiredLeft: '',
      interValid: '',
      clientForm: createClientModel(),
      clientRules: {},
      materialRules: {
        client_name: [
          { validator: validateClientName, trigger: 'blur' }
        ],
        website_url: [
          { validator: validWebUrl, trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', message: this.$t('client.errEmail1') },
          { trigger: 'blur', validator: validateEmail }
        ],
        postal_code: [
          { required: true, trigger: 'blur', message: this.$t('memberAccount.errMsg1', { fieldName: this.$t('client.postalCode') }) }
        ],
        category_code: [
          { required: true, trigger: 'blur', message: this.$t('memberAccount.errMsg1', { fieldName: this.$t('client.industry') }) }
        ],
        currency: [
          { required: true, trigger: 'blur', message: this.$t('memberAccount.errMsg1', { fieldName: this.$t('client.currency') }) }
        ],
        cell_phone: [
          { validator: validateCellPhone, trigger: 'blur' }
        ],
        business_phone: [
          { validator: validateBusinessPhone, trigger: 'blur' }
        ],
        otp: [
          { validator: validateOtp, trigger: 'blur' }
        ]
      },
      listIns: [],
      dialogVisible: false,
      addressSearchRoadBaseType: ADDRESS_SEARCH_ROAD_BASE_TYPE,
      getRoleClient,
      typeForm: Common.CREATE,
      cellPhoneOriginValue: '',
      clientFormOrigin: null,
      isChanged: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    timezone() {
      return this.accountInfo.timezone ? `(UTC ${moment().tz(this.accountInfo.timezone).format('Z')}) ${this.accountInfo.timezone}` : ''
    },
    changes: {
      get: function() {
        return this.expiredLeft
      },
      set: function(value) {
        if (value) {
          this.expiredLeft = value
        } else {
          this.isSentCode = value
        }
      }
    },
    isDisableButtonVerifyOtp: function() {
      const cellPhone = this.clientForm.cell_phone.replace(/[^0-9]/g, '')
      return cellPhone === '' || cellPhone === this.cellPhoneOriginValue
    }
  },
  created() {
    if (this.$route.params.hasOwnProperty('client_id')) {
      this.typeForm = Common.EDIT
    } else {
      if (this.user.roles.indexOf(Common.ROLE_SUPER_ADMIN) > -1) {
        this.clientForm.tax_invoice_issuer = 'client'
      }
    }
    this.getIndustry()
    this.getTimeExpired()
    if (this.typeForm === Common.CREATE) {
      this.isLoading = false
    }
  },
  watch: {
    clientDetail: function(val) {
      if (val) this.updateValueChildObjectFromParent()
      let itemSelected = {}
      for (const i in this.listIns) {
        const item = this.listIns[i]
        if (item.code === val.category_code) {
          itemSelected = item
        }
        const itemLv2 = item.sub_items
        for (const j in itemLv2) {
          if (itemLv2[j].code === val.category_code) {
            itemSelected = itemLv2[j]
          }
        }
        const itemLv3 = itemLv2.sub_items
        for (const k in itemLv3) {
          if (itemLv3[k].code === val.category_code) {
            itemSelected = itemLv3[k]
          }
        }
      }
      if (itemSelected && itemSelected.name) {
        this.value = itemSelected.name
      }
    },
    'clientForm': {
      deep: true,
      handler(val) {
        if (val && JSON.stringify(val) !== this.clientFormOrigin) {
          this.isChanged = true
        }
      }
    },
    isChanged: function(val) {
      window.formIsChanged = !!val
    },
    accountInfo: function(val) {
      if (Object.keys(val).length === 0) {
        return
      }
      this.clientForm.currency = val.view_currency
      this.clientForm.email = val.email_address
      this.accountInfo = val
      this.updateOriginValue(this.clientForm)
    }
  },
  methods: {
    handleNodeClick(value) {
      const arrayValue = value.split(',')
      this.clientForm.category_code = arrayValue[0]
      this.value = arrayValue[1]
    },
    formatNumberEvent(e, field) {
      this.clientForm[field] = e.target.value.replace(/[^0-9]/g, '')
    },
    filterIndustry(val) {
      this.$refs.treeIndustry.filter(val)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1 && data.sub_items === undefined
    },
    getIndustry() {
      this.$store.dispatch('user/getListIndustryInClientManage')
        .then((response) => {
          this.listIns = response
        })
        .catch((error) => {
          this.showErrorApi(error)
        })
    },
    getTimeExpired() {
      this.interValid = setInterval(() => {
        if (this.timeExpired === '') { return }
        this.changes = countdownTimer(AccountAndBillings.LIFE_TIME_OF_CODE - (new Date().getTime() - new Date(this.timeExpired).getTime()))
      }, Common.ONE_SECOND)
    },
    onChangePhone() {
      this.clientRules['cell_phone'] = this.materialRules['cell_phone']
      this.$refs.clientForm.validateField('cell_phone', (error) => {
        if (!error) {
          this.showLoading()
          let phoneCode = this.accountInfo.country_code === AccountAndBillings.KOREA_CODE ? AccountAndBillings.PHONE_COUNTRY_CODE_KR : AccountAndBillings.PHONE_COUNTRY_CODE_JP
          this.clientForm.phone_code = this.accountInfo.country_code === AccountAndBillings.KOREA_CODE ? AccountAndBillings.PHONE_COUNTRY_CODE_KR : AccountAndBillings.PHONE_COUNTRY_CODE_JP
          if (process.env.ENV_CONFIG === Common.ENV_DEV || process.env.ENV_CONFIG === Common.ENV_SIT) {
            phoneCode = 84
            this.clientForm.phone_code = 84
          }
          const data = {
            phone_code: phoneCode,
            phone_number: this.clientForm.cell_phone
          }
          this.$store.dispatch('user/verifyPhoneNumberInClientManage', data)
            .then((response) => {
              this.isSentCode = true
              this.timeExpired = new Date()
              this.hideLoading()
            })
            .catch((error) => {
              this.showErrorApi(error)
              this.hideLoading()
            })
        }
      })
    },
    onSubmit() {
      // Reset all the fields and remove validation result
      for (const prop in this.materialRules) {
        if (!this.materialRules.hasOwnProperty(prop)) continue
        this.clientRules[prop] = this.materialRules[prop]
        this.$refs.clientForm.validateField(prop)
      }
      return new Promise((resolve, reject) => {
        this.$refs.clientForm.validate((valid) => {
          if (valid) {
            return resolve({
              status: valid,
              data: this.clientForm
            })
          } else {
            return reject({
              status: valid,
              type: 'create'
            })
          }
        })
      })
    },
    getCountryName(countryCode) {
      let countryName = ''
      Auth.LIST_COUNTRY.forEach(countryInfo => {
        if (countryInfo.value === countryCode) {
          countryName = countryInfo.label
        }
      })
      return countryName
    },
    openAddressSearchDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
      this.$store.dispatch('ClearPostalAddresses')
      this.$store.dispatch('ToggleResetAddressesDialog')
    },
    getPostalCodeAndAddress(postalAddress) {
      this.clientForm.postal_code = postalAddress.zip_no
      this.clientForm.address1 = postalAddress.road_addr
      this.dialogVisible = false
      this.$store.dispatch('ClearPostalAddresses')
      this.$store.dispatch('ToggleResetAddressesDialog')
    },
    updateValueChildObjectFromParent() {
      Object.keys(this.clientForm).forEach((key, index, array) => {
        if (this.clientDetail.hasOwnProperty(key)) {
          this.clientForm[key] = this.clientDetail[key]
          if (key === 'cell_phone') {
            this.cellPhoneOriginValue = this.clientDetail[key]
          }
        }
        if (index === (array.length - 1)) {
          this.isLoading = false
        }
      })
      this.updateOriginValue(this.clientForm)
    },
    updateOriginValue(val) {
      if (val) this.clientFormOrigin = JSON.stringify(val)
    },
    showAgencyName(name) {
      if (!this.clientForm.agencyUser) {
        return name
      }
      return `${name}-${this.clientForm.agencyUser.contact_name}`
    },
    showErrorApi(error) {
      if (error.status && error.status === 400) {
        if (error.data) {
          let errorData = error.data
          if (typeof error.data === 'string') {
            errorData = JSON.parse(error.data)
          }
          const message = errorData.hasOwnProperty('message') ? errorData.message : errorData.error_description
          if (message.includes('timeout')) {
            this.$message.error(this.$t(`client.messageFromApi.timeout`))
          } else {
            this.$message.error(this.$t(`client.messageFromApi.${message}`))
          }
        }
      }
    }
  }
}
