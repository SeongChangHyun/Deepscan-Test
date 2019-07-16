import { Auth, ADDRESS_SEARCH_ROAD_BASE_TYPE, AccountAndBillings, Common } from '@/common/constants'
import { validPassword, validTypeFile } from '@/utils/validate'
import { countdownTimer } from '@/utils'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import AddressSearch from '@/app/auth/components/register/components/address-search'
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'MemberAccount',
  components: { ContentLoader, AddressSearch },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.MAX_LENGTH_PASSWORD) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
        return
      }
      if (!validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      } else {
        this.memberAccountRules['confirmed_password'] = this.materialRules['confirmed_password']
        callback()
      }
    }
    const validateRepeatPassword = (rule, value, callback) => {
      if (value !== this.memberAccountForm.password) {
        callback(new Error(this.$t('register.errMsgRepeatPwd')))
      }
      callback()
    }
    const validatePhoneGroup = (rule, value, callback, dataField) => {
      const result = value.replace(/\D+/g, '')
      if (result.toString().length < 10 || result.toString().length > 11) {
        callback(new Error(this.$t('memberAccount.errMsgLengthRange', { fieldName: this.getFieldName(Object.keys(dataField)), min: '10', max: '11' })))
      }
      callback()
    }
    const validatePhoneOTP = (rule, value, callback, dataField) => {
      if (!this.isConfirmTelCode) {
        callback(new Error(this.$t('memberAccount.errCellPhoneRequired')))
      }
      callback()
    }
    const validateOTPCode = (rule, value, callback, dataField) => {
      if (!this.isOTPValid) {
        callback(new Error(this.$t('memberAccount.error.msgInvalidOtp')))
      }
      callback()
    }
    const validateCommissionFee = (rule, value, callback) => {
      if (!(this.memberAccountForm.commissionFee >= 0 && this.memberAccountForm.commissionFee <= 100)) {
        callback(new Error(this.$t('memberAccount.errMsgCommissionFee')))
      }
      callback()
    }
    const validateLicense = (rule, value, callback) => {
      if (value.length > 45) {
        callback(new Error(this.$t('register.error.validation')))
      }
      callback()
    }
    const validateNameRequired = (arrField) => {
      if (this.currentUser.isPersonal) {
        return ['last_name', 'first_name'].indexOf(arrField[0]) > -1
      } else {
        return ['president_last_name', 'president_first_name'].indexOf(arrField[0]) > -1
      }
    }
    const validateName = (rule, value, callback, dataField) => {
      if (value.trim().toString().length === 0 && validateNameRequired(Object.keys(dataField))) {
        callback(new Error(this.$t('memberAccount.errMsg1', { fieldName: this.getFieldName(Object.keys(dataField)) })))
      }
      if (Buffer.byteLength(value, 'shift_jis') > 20) {
        callback(new Error(this.$t('memberAccount.errMsgTextLengthRange', { fieldName: this.getFieldName(Object.keys(dataField)), num: 20 })))
      }
      callback()
    }
    const validateBusinessName = (rule, value, callback) => {
      if (Buffer.byteLength(value, 'shift_jis') > 50) {
        callback(new Error(this.$t('register.errMsgLimit', { fieldName: 'Business Name', num: 50 })))
      }
      callback()
    }
    const validateBankGroup = (rule, value, callback) => {
      if (!this.memberAccountForm.bank_name || !this.memberAccountForm.bank_account_number || !this.memberAccountForm.owner) {
        callback(new Error(this.$t('register.errMsgBankGroupRequired')))
      }
      callback()
    }
    return {
      AccountAndBillings,
      Auth,
      Common,
      addressSearchRoadBaseType: ADDRESS_SEARCH_ROAD_BASE_TYPE,
      validatePhoneGroup,
      loading: null,
      isCheckBankbook: false,
      isValidBankbook: false,
      isBusinessLicenseChecked: false,
      isBusinessLicenseValid: false,
      dialogVisible: false,
      isChanged: false,
      isLoading: true,
      isSuperAdmin: false,
      memberAccountForm: {},
      isSentCode: false,
      isConfirmTelCode: true,
      isOTPValid: true,
      isPhoneNumberValid: true,
      timeExpired: '',
      confirmTelCode: '',
      expiredLeft: '',
      interValid: '',
      listBank: [],
      initialMemberAccountForm: {
        password: '',
        confirmed_password: '',
        bankLicenseFile: undefined,
        bankBookFile: undefined,
        otp: undefined
      },
      memberAccountRules: {},
      cellPhoneOriginValue: '',
      isEnableButtonVerifyOtp: true,
      openConfirmationDialog: false,
      materialRules: {
        president_first_name: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        president_last_name: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        first_name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        last_name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        password: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgPwdLength') },
          { trigger: 'blur', validator: validatePassword }
        ],
        confirmed_password: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgRptPwdLength') },
          { trigger: 'blur', validator: validateRepeatPassword }
        ],
        business_name: [
          { required: true, trigger: 'blur', message: this.$t('memberAccount.error.msgLegalRequired') },
          { trigger: 'blur', validator: validateBusinessName }
        ],
        cell_phone: [
          { trigger: 'blur', validator: validatePhoneGroup }
        ],
        isConfirmTelCode: [
          { trigger: 'blur', validator: validatePhoneOTP }
        ],
        phone: [
          { trigger: 'blur', validator: validatePhoneGroup }
        ],
        otp: [
          { required: true, trigger: 'blur', message: this.$t('memberAccount.error.msgOTPRequired') },
          { trigger: 'blur', validator: validateOTPCode }
        ],
        commission_fee: [
          { required: true, trigger: 'blur', validator: validateCommissionFee }
        ],
        business_license: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgLicense') },
          { trigger: 'blur', validator: validateLicense }
        ],
        license: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFileLicense') }
        ],
        bankbook: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFileBankBook') }
        ],
        bankGroup: [
          { required: true, trigger: 'blur', validator: validateBankGroup }
        ],
        bank_account_number: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFileBankBook') }
        ],
        owner: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFileBankBook') }
        ],
        bank_name: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFileBankBook') }
        ]
      },
      errSubmit: {}
    }
  },
  computed: {
    ...mapGetters('user', [
      'currentUser'
    ]),
    ...mapGetters([
      'user',
      'getRoutersInfo'
    ]),
    ...mapGetters(['rolesRouter']),
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
    checkIsSuperAdminLogon: function() {
      return this.currentUser.account_id === 1
    }
  },
  created() {
    this.getInitialData()
    window.onbeforeunload = (event) => {
      if (this.isChanged) {
        return this.$t('confirmRouteLeaveMessage')
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interValid)
    window.formIsChanged = false
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isChanged) {
      next()
    } else {
      this.$dialog.destroy()
      this.$dialog.confirm(this.$t('confirmRouteLeaveMessage'), {
        customClass: 'confirmation-dialog',
        type: 'basic'
      })
        .then((dialog) => {
          window.onbeforeunload = null
          this.isChanged = false
          window.formIsChanged = false
          next()
          this.$dialog.destroy()
        })
        .catch(() => {
          next(false)
          this.$dialog.destroy()
        })
    }
  },
  watch: {
    isChanged(val) {
      window.formIsChanged = !!val
    },
    'memberAccountForm.business_license'() {
      this.errSubmit = {}
    },
    'memberAccountForm.otp'(val) {
      this.isOTPValid = true
      if (val) this.$refs.memberAccountForm.validate('otp')
    },
    'memberAccountForm.cell_phone'(val) {
      if (val && val !== this.cellPhoneOriginValue) {
        this.isConfirmTelCode = false
        this.isChanged = true
        const input = this.$refs.cellPhone
        const cellPhoneInput = document.querySelectorAll('input[name="cell_phone"')[0]
        let value = this.cellPhoneOriginValue
        if (input) {
          value = input.value
        }
        if (cellPhoneInput) {
          value = cellPhoneInput.value
        }
        value = value.replace(/[^0-9*]/g, '')
        if (cellPhoneInput) {
          cellPhoneInput.value = value
        }
        if (input) {
          input.setCurrentValue(value)
        }
        this.memberAccountForm['cell_phone'] = value
        this.memberAccountForm.cell_phone = value
        this.isConfirmTelCode = false
        if (this.memberAccountForm['cell_phone'] || this.memberAccountForm.cell_phone) {
          this.onChangeField(['cell_phone'])
          this.memberAccountRules['isConfirmTelCode'] = this.materialRules['isConfirmTelCode']
          this.$refs.memberAccountForm.validateField('cell_phone')
        } else {
          this.clearValidator(['cell_phone', 'isConfirmTelCode'])
        }
        this.isEnableButtonVerifyOtp = this.cellPhoneOriginValue === this.memberAccountForm['cell_phone']
      }
    },
    rolesRouter: {
      handler(newData) {
        this.getInitialData()
      },
      immediate: false
    }
  },
  methods: {
    getFieldName(key) {
      const fieldMapping = {
        phone: this.$t('memberAccount.legalPhoneNumber'),
        cell_phone: this.$t('memberAccount.cellPhone'),
        last_name: this.$t('memberAccount.lastName'),
        first_name: this.$t('memberAccount.firstName'),
        president_last_name: this.$t('memberAccount.presidentLastName'),
        president_first_name: this.$t('memberAccount.presidentFirstName')
      }
      return fieldMapping[key]
    },
    getInitialData() {
      this.isLoading = true
      // this.openLoading()
      let idCurrentUser = this.user.account_id
      if (this.getRoutersInfo) {
        if (this.getRoutersInfo.type === 'parent') {
          idCurrentUser = this.getRoutersInfo.userAccountId
        } else if (this.getRoutersInfo.type === 'client') {
          idCurrentUser = this.getRoutersInfo.accountParentId
        }
      }
      this.$store.dispatch('user/getFullInformationUser', idCurrentUser)
        .then(() => {
          this.isLoading = false
          this.getTimeExpired()
          this.memberAccountForm = Object.assign({}, this.currentUser, this.initialMemberAccountForm)
          this.isSuperAdmin = this.user.roles.includes(AccountAndBillings.SUPER_ADMIN_ROLE)
          // get cell_phone value origin
          this.cellPhoneOriginValue = this.currentUser.cell_phone
          this.phoneNumberOriginValue = this.currentUser.phone
          this.isConfirmTelCode = false
          this.isSentCode = false
          this.isOTPValid = true
          this.memberAccountRules = {}
          this.isEnableButtonVerifyOtp = true
          this.isChanged = false
          window.formIsChanged = false
        })
        .catch(() => {
          // this.closeLoading()
          this.isLoading = false
        })
    },
    uploadFile(e, type, typeName) {
      this.isChanged = true
      if (e.target.files[0].size > Auth.MAX_SIZE_FILE) {
        Message.error(this.$t('register.errMsgFileSize'))
        this.resetFileInput(type, typeName)
      } else if (validTypeFile(e.target.files[0])) {
        this.memberAccountForm[typeName] = e.target.files[0].name
        this.memberAccountForm[type] = e.target.files[0]
      } else {
        Message.error(this.$t('register.errMsgFileType'))
        this.resetFileInput(type, typeName)
      }
    },
    resetFileInput(type, typeName) {
      const input = this.$refs[type]
      input.type = 'text'
      input.type = 'file'
      this.memberAccountForm[type] = null
      this.memberAccountForm[typeName] = null
    },
    getTimeExpired() {
      this.interValid = setInterval(() => {
        if (this.timeExpired === '') { return }
        this.changes = countdownTimer(AccountAndBillings.LIFE_TIME_OF_CODE - (new Date().getTime() - new Date(this.timeExpired).getTime()))
      }, Common.ONE_SECOND)
    },
    getInstructions(text) {
      return `<div class="mb-1">${text.replace('\n', '<br />')}</div>`
    },
    onChangeType(e, value) {
      this.isChanged = this.memberAccountForm.isPersonal !== this.user.isPersonal
    },
    onChangeField(listField = []) {
      this.isChanged = true
      if (listField.length === 0) {
        return
      }
      if (typeof listField === 'object' && listField.constructor === Array) {
        listField.forEach((fieldName) => {
          if (this.memberAccountForm[fieldName] !== (this.currentUser[fieldName] ? this.currentUser[fieldName] : '')) {
            this.memberAccountRules[fieldName] = this.materialRules[fieldName]
            if (['bank_name', 'bank_account_number', 'owner', 'bankbook'].includes(fieldName)) {
              this.$refs.memberAccountForm.validateField('phone')
            }
          } else {
            delete this.memberAccountRules[fieldName]
            this.$refs.memberAccountForm.clearValidate(fieldName)
          }
        })
      }
    },
    onConfirmTelCode() {
      this.openLoading()
      this.$store.dispatch('user/verifyTelCode', {
        otp: this.confirmTelCode,
        phone_code: (this.memberAccountForm.country_code ? this.memberAccountForm.country_code === Common.JAPAN_COUNTRY_CODE
          ? AccountAndBillings.PHONE_COUNTRY_CODE_JP : AccountAndBillings.PHONE_COUNTRY_CODE_KR : ''),
        phone_number: this.memberAccountForm.cell_phone
      })
        .then((response) => {
          this.isConfirmTelCode = true
          this.isSentCode = false
          this.closeLoading()
        })
        .catch((error) => {
          this.closeLoading()
          let errorData = error.data
          if (typeof error.data === 'string') {
            errorData = JSON.parse(error.data)
          }
          if (errorData.message) {
            this.$message.error(this.$t('memberAccount.' + errorData.message))
          }
        })
    },
    replaceAll(str, find, replace) {
      return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace)
    },
    escapeRegExp(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
    },
    onChangeCellPhone(e, type) {
      this.isChanged = true
      const input = this.$refs.cellPhone
      const cellPhoneInput = document.querySelectorAll('input[name="cell_phone"')[0]
      let value = input.value
      if (cellPhoneInput) {
        value = cellPhoneInput.value
      }
      value = value.replace(/[^0-9]/g, '')
      cellPhoneInput.value = value
      input.setCurrentValue(value)
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      this.memberAccountForm[type] = e.target.value.replace(/[^0-9]/g, '')
      this.isConfirmTelCode = false
      if (this.memberAccountForm['cell_phone'] || this.memberAccountForm.cell_phone) {
        this.onChangeField(['cell_phone'])
        this.memberAccountRules['isConfirmTelCode'] = this.materialRules['isConfirmTelCode']
        this.$refs.memberAccountForm.validateField('cell_phone')
      } else {
        this.clearValidator(['cell_phone', 'isConfirmTelCode'])
      }
      this.isEnableButtonVerifyOtp = this.cellPhoneOriginValue === this.memberAccountForm['cell_phone']
    },
    onChangeOtp() {
      const input = this.$refs.confirmTelCode
      const otpInput = document.querySelectorAll('input[name="confirmTelCode"')[0]
      let value = otpInput.value
      value = value.replace(/[^0-9*]/g, '')
      otpInput.value = value
      this.memberAccountForm.otp = value
      input.setCurrentValue(value)
    },
    onChangePhoneNumber(e) {
      this.isChanged = true
      if (this.memberAccountForm['phone']) {
        this.onChangeField(['phone'])
        this.$refs.memberAccountForm.validateField('phone')
      } else {
        this.clearValidator(['phone'])
      }
      this.isChanged = this.phoneNumberOriginValue !== this.memberAccountForm['phone']
    },
    onChangePhone() {
      this.memberAccountRules['cell_phone'] = [
        { required: true, trigger: 'blur', message: this.$t('memberAccount.errCellPhoneRequired') },
        { trigger: 'blur', validator: this.validatePhoneGroup }
      ]
      this.$refs.memberAccountForm.validateField('cell_phone', (error) => {
        if (!error) {
          this.openLoading()
          this.$store.dispatch('user/changePhoneNumber', {
            phone_code: process.env.FAKE_COUNTRY_CODE ? 84 : (this.memberAccountForm.country_code ? this.memberAccountForm.country_code === Common.JAPAN_COUNTRY_CODE
              ? AccountAndBillings.PHONE_COUNTRY_CODE_JP : AccountAndBillings.PHONE_COUNTRY_CODE_KR : ''),
            phone_number: this.memberAccountForm.cell_phone
          })
            .then((response) => {
              this.isConfirmTelCode = true
              this.isSentCode = true
              this.onChangeField(['otp'])
              this.timeExpired = new Date()
              this.closeLoading()
            })
            .catch((error) => {
              this.closeLoading()
              this.isSentCode = false
              if (error) {
                if (error.status && error.status === 400) {
                  let errorData = error.data
                  if (typeof error.data === 'string') {
                    errorData = JSON.parse(error.data)
                  }
                  if (errorData.message && errorData.message !== '') {
                    this.$message.error(errorData.message)
                  }
                }
              }
            })
        }
      })
    },
    formatNumberEvent(e, type) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      this.memberAccountForm[type] = e.target.value.replace(/[^0-9]/g, '')
    },
    onInputPhone(e) {
      this.isConfirmTelCode = false
      this.isChanged = true
      if (this.memberAccountForm['cell_phone']) {
        this.onChangeField(['cell_phone'])
        this.memberAccountRules['isConfirmTelCode'] = this.materialRules['isConfirmTelCode']
      } else {
        this.clearValidator(['cell_phone', 'isConfirmTelCode'])
      }
      if (this.cellPhoneOriginValue === this.memberAccountForm['cell_phone']) {
        this.isEnableButtonVerifyOtp = true
      } else {
        this.isEnableButtonVerifyOtp = false
      }
    },
    formatCommissionFee(e) {
      let tmp = e.replace(/[^0-9.]/g, '')
      tmp = parseFloat(tmp)
      if (tmp) {
        this.memberAccountForm.commission_fee = (Math.round((tmp) * 10) / 10).toFixed(1)
      }
      this.$refs.memberAccountForm.validateField('commission_fee')
    },
    onSubmit() {
      if (this.isSuperAdmin) {
        this.updateCommissionFee()
        return
      }
      const listVariableNotTrim = [
        'isPersonal',
        'bankLicenseFile',
        'bankBookFile',
        'loginValidTime',
        'login_valid_time'
      ]
      for (const key in this.memberAccountForm) {
        if (this.memberAccountForm.hasOwnProperty(key) && !key.includes('term') && !listVariableNotTrim.includes(key)) {
          this.memberAccountForm[key] = this.memberAccountForm[key] ? this.memberAccountForm[key].toString().trim() : ''
        }
      }
      this.openLoading()
      // this.isLoading = true
      if (!this.memberAccountForm.isPersonal && this.isSuperAdmin) {
        // this.formatCommissionFee(this.memberAccountForm.commission_fee)
      }
      this.$refs.memberAccountForm.validate((valid, errorList) => {
        if (valid) {
          this.memberAccountForm['cell_phone'] = this.memberAccountForm['cell_phone'] ? this.memberAccountForm['cell_phone'].replace(/[^\d+]/g, '') : ''
          this.memberAccountForm['phone_code'] = process.env.FAKE_COUNTRY_CODE ? 84 : this.memberAccountForm.country_code ? this.memberAccountForm.country_code.toLowerCase() === Common.JP_CODE ? AccountAndBillings.PHONE_COUNTRY_CODE_JP : AccountAndBillings.PHONE_COUNTRY_CODE_KR : ''
          this.$store.dispatch('user/updateInformationUser', this.memberAccountForm)
            .then(() => {
              this.closeLoading()
              this.isChanged = false
              window.formIsChanged = false
              this.$forceUpdate()
              this.errSubmit = {}
              this.$message.success(this.$t('memberAccount.errMsg8'))
              this.getInitialData()
              this.$refs.memberAccountForm.resetFields()
              this.isConfirmTelCode = false
              this.isSentCode = false
              this.isOTPValid = true
              this.memberAccountRules = {}
              this.isEnableButtonVerifyOtp = true
              this.cellPhoneOriginValue = this.memberAccountForm['cell_phone']
              this.phoneNumberOriginValue = this.memberAccountForm['phone']
            })
            .catch((error) => {
              if (error.status && error.status === 400) {
                let errorData = error.data
                if (typeof error.data === 'string') {
                  errorData = JSON.parse(error.data)
                }
                this.errSubmit = errorData
                if (errorData.violations) {
                  this.$message.error(errorData.violations[0].field + ' ' + errorData.violations[0].message)
                } else {
                  if (errorData.message && errorData.message !== '') {
                    this.$message.error(this.$t('memberAccount.' + errorData.message))
                  }
                }
              }
              this.closeLoading()
            })
        } else {
          // this.isLoading = false
          this.closeLoading()
        }
      })
    },
    onCancel() {
      this.isChanged = false
      this.isSentCode = false
      this.isConfirmTelCode = false
      this.memberAccountRules = {}
      this.memberAccountForm = Object.assign({}, this.currentUser, this.initialMemberAccountForm)
      this.$refs.memberAccountForm.resetFields()
      this.isEnableButtonVerifyOtp = true
    },
    getPostalCodeAndAddress(postalAddress) {
      if (this.memberAccountForm.zip !== postalAddress.zip_no || this.memberAccountForm.addr1 !== postalAddress.road_addr) {
        this.memberAccountForm.zip = postalAddress.zip_no
        this.memberAccountForm.addr1 = postalAddress.road_addr
        this.dialogVisible = false
        this.onChangeField()
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    openAddressSearchDialog() {
      this.dialogVisible = true
    },
    onChooseFile(item) {
      this.$refs[item].click()
    },
    openLoading() {
      this.loading = this.$loading({
        lock: true,
        text: this.$t('memberAccount.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    closeLoading() {
      this.loading.close()
    },
    onChangeLicenseGroup() {
      if (this.memberAccountForm.isPersonal) {
        if (
          !this.memberAccountForm.business_license &&
          !this.memberAccountForm.license
        ) {
          this.onChangeField(['business_name'])
          this.clearValidator(['business_license', 'license'])
          if (!this.memberAccountForm.business_name) {
            this.clearValidator(['business_name'])
          }
          return
        }
      }
      this.onChangeGroup()
    },
    onChangeGroup(type = AccountAndBillings.LICENSE_CODE) {
      const listLicenseKey = type === AccountAndBillings.LICENSE_CODE ? ['business_name', 'business_license', 'license'] : ['bank_name', 'bank_account_number', 'owner', 'bankbook']
      const listValidator = type === AccountAndBillings.LICENSE_CODE ? ['business_name', 'business_license', 'license'] : ['bankGroup', 'bankbook']
      let flag = true
      let clearGroup = true
      listLicenseKey.forEach(element => {
        if (this.memberAccountForm[element]) {
          clearGroup = false
        }
        if (this.memberAccountForm[element] !== this.currentUser[element]) {
          flag = false
        }
      })
      if (clearGroup) {
        this.clearValidator(listValidator)
        return
      }
      if (!flag) {
        this.onChangeField(listValidator)
      } else {
        this.clearValidator(listValidator)
      }
    },
    clearValidator(listValidator) {
      listValidator.forEach(element => {
        delete this.memberAccountRules[element]
        this.$refs.memberAccountForm.clearValidate(element)
      })
    },
    onChangePass(type) {
      let flag = true
      type.forEach(element => {
        if (this.memberAccountForm[element]) {
          flag = false
        }
      })
      if (flag) {
        this.clearValidator(type)
      } else {
        this.onChangeField(type)
        this.memberAccountRules[type[0]] = this.materialRules[type[0]]
      }
    },
    updateCommissionFee() {
      let idCurrentUser = this.user.account_id
      if (this.getRoutersInfo) {
        if (this.getRoutersInfo.type === 'parent') {
          idCurrentUser = this.getRoutersInfo.userAccountId
        } else if (this.getRoutersInfo.type === 'client') {
          idCurrentUser = this.getRoutersInfo.accountParentId
        }
      }
      this.$store.dispatch('user/updateCommissionFee', {
        account_id: idCurrentUser,
        commission_fee: this.memberAccountForm.commission_fee
      })
        .then(() => {
          this.$message.success(this.$t('memberAccount.errMsg8'))
          this.getInitialData()
          this.memberAccountRules = {}
          this.$refs.memberAccountForm.resetFields()
        })
        .catch((error) => {
          if (error.status && error.status === 400) {
            let errorData = error.data
            if (typeof error.data === 'string') {
              errorData = JSON.parse(error.data)
            }
            if (errorData.message && errorData.message !== '') {
              this.$message.error(this.$t('memberAccount.' + errorData.message))
            }
          }
          this.isLoading = false
          // this.closeLoading()
        })
    }
  }
}
