import { validPassword, validEmail, validTypeFile } from '@/utils/validate'
import { Common, Auth, ADDRESS_SEARCH_ROAD_BASE_TYPE } from '@/common/constants'
import AccountApiService from '@/app/services/accountApiService'
import { Message } from 'element-ui'
import AddressSearch from './components/address-search'

/*
  Version: v0.5
  Documentation: WP_TG3.0_Functional Requirement Specification_Authentication_v0.5
*/

// TODO: skip postal code checker - 3rd api not ready yet!

// Init api services
const AccountService = AccountApiService.build()

export default {
  name: 'RegisterForm',
  components: { AddressSearch },
  data() {
    const validateEmail = (rule, value, callback) => {
      this.isMailValid = true
      if (!validEmail(value)) {
        this.isMailValid = false
        callback(new Error(this.$t('register.errMsgEmailFormat')))
      }
      if (value.split('@')[0].length > 20) {
        this.isMailValid = false
        callback(new Error(this.$t('register.errMsgLimit', { fieldName: 'Email', num: 20 })))
      }
      if (!this.isMailChecked) {
        callback(new Error(this.$t('register.errMsgEmailChecked')))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.MAX_LENGTH_PASSWORD) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      }
      if (!validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      } else {
        callback()
      }
    }
    const validateRepeatPassword = (rule, value, callback) => {
      if (value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.MAX_LENGTH_PASSWORD) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      }
      if (!validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      }
      if (value !== this.registerForm.password) {
        callback(new Error(this.$t('register.errMsgRepeatPwd')))
      }
      callback()
    }
    const validateAdr = (rule, value, callback) => {
      if (this.registerForm.code === '' || this.registerForm.adr1 === '') {
        callback(new Error(this.$t('register.errMsgAdr')))
      }
      callback()
    }
    const validateLicense = (rule, value, callback) => {
      if (value.length > 45) {
        callback(new Error(this.$t('register.error.validation')))
      }
      if (!this.isBusinessLicenseChecked) {
        callback(new Error(this.$t('register.errMsgLicenseCheck')))
      }
      if (!this.isBusinessLicenseValid) {
        callback(new Error(this.$t('register.errMsgLicenseInvalid')))
      }
      callback()
    }
    const validateBankGroup = (rule, value, callback) => {
      if (this.registerForm.bank === '' || this.registerForm.bankNumber === '' || this.registerForm.owner === '') {
        callback(new Error(this.$t('register.errMsgBankGroupRequired')))
      }
      if (!this.isCheckBankbook) {
        callback(new Error(this.$t('register.errMsgBankGroupCheck')))
      }
      if (!this.isValidBankbook) {
        callback(new Error(this.$t('register.errMsgBankGroupInvalid')))
      }
      callback()
    }
    const validateLastName = (rule, value, callback) => {
      if (Buffer.byteLength(value, 'shift_jis') > 20) {
        callback(new Error(this.$t('register.errMsgLastNameLang')))
      }
      callback()
    }
    const validateFirstName = (rule, value, callback) => {
      if (Buffer.byteLength(value, 'shift_jis') > 20) {
        callback(new Error(this.$t('register.errMsgFirstNameLang')))
      }
      callback()
    }
    const validateBusinessName = (rule, value, callback) => {
      if (Buffer.byteLength(value, 'shift_jis') > 50) {
        callback(new Error(this.$t('register.errMsgLimit', { fieldName: 'Business Name', num: 50 })))
      }
      callback()
    }
    return {
      Common,
      isChanging: false,
      openTermPopup: false,
      termContent: '',
      isCheckFName: false,
      Auth,
      listCountry: Auth.LIST_COUNTRY,
      typeRegister: Auth.PERSONAL_TYPE,
      addressSearchRoadBaseType: ADDRESS_SEARCH_ROAD_BASE_TYPE,
      registerForm: {
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        searchAdr: '',
        code: '',
        adr1: '',
        adr2: '',
        licenseNumber: '',
        bankBook: '',
        license: '',
        country: '',
        password: '',
        passwordRpt: '',
        bank: '',
        bankNumber: '',
        owner: '',
        term: false,
        term1: false,
        term2: false,
        term3: false
      },
      registerRules: {},
      personRules: {
        firstName: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFirstName') },
          { trigger: 'blur', validator: validateFirstName }
        ],
        lastName: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgLastName') },
          { trigger: 'blur', validator: validateLastName }
        ],
        email: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgEmailRequired') },
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgPwdLength') },
          { trigger: 'blur', validator: validatePassword }
        ],
        passwordRpt: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgRptPwdLength') },
          { trigger: 'blur', validator: validateRepeatPassword }
        ],
        country: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgCountry') }
        ],
        searchAdr: [
          { required: true, trigger: 'blur', validator: validateAdr }
        ]
      },
      businessRules: {
        businessName: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgBusinessName') },
          { trigger: 'blur', validator: validateBusinessName }
        ],
        licenseNumber: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgLicense') },
          { trigger: 'blur', validator: validateLicense }
        ],
        license: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFileLicense') }
        ],
        bankBook: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFileBankBook') }
        ],
        bankGroup: [
          { required: true, trigger: 'blur', validator: validateBankGroup }
        ]
      },
      isMailValid: false,
      isMailChecked: false,
      isCheckBankbook: false,
      isValidBankbook: false,
      isBusinessLicenseChecked: false,
      isBusinessLicenseValid: false,

      isValidAdr: false,
      allowRegister: true,
      isShowReceiveBtn: false,
      isSentReactive: false,
      passwordType: Auth.TYPE_PASSWORD_FIELD,
      loading: false,
      isReadTermErr: false,
      dialogVisible: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.$store.dispatch('ClearPostalAddresses')
      }
      document.body.style.position = val ? 'fixed' : 'static'
      this.$store.dispatch('ToggleResetAddressesDialog')
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  created() {
    this.registerRules = this.typeRegister === Auth.PERSONAL_TYPE ? this.personRules : {
      ...this.personRules,
      ...this.businessRules
    }
  },
  methods: {
    isCheckFirstName() {
      this.isCheckFName = true
    },
    onEmailChange(e) {
      this.isMailValid = false
      this.isShowReceiveBtn = false
      this.isMailChecked = false
      if (e.code !== Common.TAB_KEY) {
        this.registerForm.email = e.target.value
      }
      this.isMailValid = validEmail(this.registerForm.email)
    },
    onChangeType(type) {
      this.isChanging = true
      this.allowRegister = true
      this.isMailChecked = false
      this.isShowReceiveBtn = false
      this.isReadTermErr = false
      if (type === Auth.BUSINESS_TYPE) {
        this.registerRules = {
          ...this.personRules,
          ...this.businessRules
        }
      } else {
        this.registerRules = this.personRules
      }
      setTimeout(() => {
        this.isChanging = false
      }, 0)
    },
    goToLogin() {
      this.$router.push({ path: '/login' })
    },
    onCheckEmail() {
      this.isMailChecked = true
      this.$refs.registerForm.validateField('email')
      if (this.isShowReceiveBtn) {
        this.loading = true
        // Send reactivation email ET 1 Activation Email again.
        AccountService.verifyAccount({ email: this.registerForm.email }).then((response) => {
          this.isSentReactive = true
          Message.success(this.$t('register.msgEmailReactivated'))
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else if (validEmail(this.registerForm.email)) {
        this.allowRegister = false
        this.loading = true
        AccountService.validateEmail({
          email: this.registerForm.email
        }).then(() => {
          this.allowRegister = true
          Message.success(this.$t('register.error.msgEmailUnActivated'))
          this.$refs.registerForm.validateField('email')
          this.loading = false
        })
          .catch((error) => {
            let errorData = error.response.data
            if (typeof errorData === 'string') {
              errorData = JSON.parse(errorData)
            }
            Message.error(this.$t(`register.${errorData.message}`))
            if (errorData.errorKey === Auth.SHOW_REACTIVE) {
              this.isShowReceiveBtn = true
            }
            this.isMailChecked = false
            this.loading = false
          })
      } else {
        this.$refs.registerForm.validateField('email')
      }
    },
    onSearchAdr(queryString, cb) {
      AccountService.checkAddress(queryString).then((response) => {
        cb(response.data)
      })
    },
    onSelectAdr(item) {
      this.registerForm.searchAdr = item.adr_name
      this.registerForm.code = item.postal_code
      this.registerForm.adr1 = item.adr_name
      this.$refs.registerForm.validateField('searchAdr')
    },
    onCertification() {
      this.isBusinessLicenseChecked = true
      if (this.registerForm.licenseNumber.length === 0 ||
        this.registerForm.licenseNumber.length > 45 ||
        this.registerForm.businessName.length === 0) {
        this.$refs.registerForm.validateField('licenseNumber')
        this.$refs.registerForm.validateField('businessName')
        return
      }
      this.loading = true
      AccountService.checkBusinessLicense({
        business_license_number: this.registerForm.licenseNumber,
        business_name: this.registerForm.businessName
      })
        .then((response) => {
          this.isBusinessLicenseValid = response.result === 'success'
          if (response.result === 'success') {
            this.$message({
              message: this.$t('register.msgLicenseValid'),
              type: 'success'
            })
          } else {
            Message.error(this.$t('register.msgLicenseInvalid'))
          }
          this.$refs.registerForm.validateField('licenseNumber')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          Message.error(this.$t('register.msgLicenseInvalid'))
        })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = error => reject(error)
      })
    },
    uploadFile(e, type) {
      if (e.target.files[0].size > Auth.MAX_SIZE_FILE) {
        Message.error(this.$t('register.errMsgFileSize'))
        this.resetFileInput(type)
      } else if (validTypeFile(e.target.files[0])) {
        this.registerForm[type] = e.target.files[0].name
        this.getBase64(e.target.files[0]).then(data => {
          this.registerForm[`${type}Data`] = data
          this.$refs.registerForm.validateField(type)
        })
      } else {
        Message.error(this.$t('register.errMsgFileType'))
        this.resetFileInput(type)
      }
    },
    resetFileInput(type) {
      const input = this.$refs[type]
      input.type = 'text'
      input.type = 'file'
    },
    onCheckBankbook() {
      this.registerForm.bankNumber = this.registerForm.bankNumber.trim()
      this.registerForm.owner = this.registerForm.owner.trim()
      if (this.registerForm.bank === '' || this.registerForm.bankNumber === '' || this.registerForm.owner === '') {
        this.$refs.registerForm.validateField('bankGroup')
        return
      }
      this.isCheckBankbook = true
      this.loading = true
      AccountService.checkBankBook({
        account_holder_info: this.registerForm.owner,
        account_num: this.registerForm.bankNumber,
        bank_code_std: this.registerForm.bank
      })
        .then((response) => {
          this.isValidBankbook = response.result === 'success'
          this.$refs.registerForm.validateField('bankGroup')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onSelectCountry(country) {
      const input = document.querySelector('.country .el-select input')
      input.setAttribute('readonly', 'readonly')
      if (this.registerForm.country && (this.registerForm.code || this.registerForm.adr1)) {
        this.$confirm(this.$t('register.confirmationClearPostalAddressSearchData'), '', {})
          .then(() => {
            this.registerForm.country = country
            this.registerForm.code = ''
            this.registerForm.adr1 = ''
            this.$refs.registerForm.validateField('country')
          })
          .catch(() => {
            return
          })
          .finally(() => {
            this.$refs.country.blur()
          })
      } else {
        this.registerForm.country = country
      }
    },
    onChangeBankbook() {
      const input = document.querySelector('.require-doc .el-select input')
      input.setAttribute('readonly', 'readonly')
      this.isValidBankbook = false
      this.isCheckBankbook = false
      if (this.registerForm.bank === '' && this.registerForm.bankNumber === '' && this.registerForm.owner === '') {
        this.$refs.registerForm.validateField('bankGroup')
      }
    },
    onRegister() {
      const listVariableNotTrim = [
        'email',
        'password',
        'passwordRpt'
      ]
      for (const key in this.registerForm) {
        if (this.registerForm.hasOwnProperty(key) && !key.includes('term') && !listVariableNotTrim.includes(key)) {
          this.registerForm[key] = this.registerForm[key] ? this.registerForm[key].toString().trim() : ''
        }
      }
      this.$refs.registerForm.validate((valid, errorList) => {
        this.isReadTermErr = !this.registerForm.term && (!this.registerForm.term1 || !this.registerForm.term2)
        if (this.isReadTermErr) {
          Message.error(this.$t('register.errMsgTerm'))
          return
        }
        if (valid) {
          this.loading = true
          let dataPost = {
            last_name: this.registerForm.lastName,
            first_name: this.registerForm.firstName,
            email: this.registerForm.email,
            password: this.registerForm.password,
            confirmed_password: this.registerForm.passwordRpt,
            country: this.registerForm.country,
            postal_code: this.registerForm.code,
            address1: this.registerForm.adr1,
            address2: this.registerForm.adr2
          }
          if (this.typeRegister === Auth.BUSINESS_TYPE) {
            dataPost = Object.assign(dataPost, {
              lastName: this.registerForm.lastName,
              firstName: this.registerForm.firstName,
              confirmedPassword: this.registerForm.passwordRpt,
              postalCode: this.registerForm.code,
              businessName: this.registerForm.businessName,
              licenseNumber: this.registerForm.licenseNumber,
              bankName: this.registerForm.bank,
              bankAccountNumber: this.registerForm.bankNumber,
              owner: this.registerForm.owner,
              bankLicenseFile: this.registerForm.license,
              bankBookFile: this.registerForm.bankBook,
              bankLicenseFileData: this.registerForm.licenseData,
              bankBookFileData: this.registerForm.bankBookData
            })
            AccountService.businessRegister(dataPost).then(() => {
              this.showSuccessfulMessage()
            }).catch((error) => {
              this.handleError(error)
            })
          } else {
            AccountService.personalRegister(dataPost).then(() => {
              this.showSuccessfulMessage()
            }).catch((error) => {
              this.handleError(error)
            })
          }
        } else {
          for (const key in errorList) {
            if (errorList.hasOwnProperty(key)) {
              const element = errorList[key]
              this.$message.error(this.$t(element[0].message))
              break
            }
          }
          return false
        }
      })
    },
    handleError(error) {
      this.loading = false
      if (error.response) {
        let errorData = error.response.data
        if (typeof errorData === 'string') {
          errorData = JSON.parse(errorData)
        }
        if (errorData.violations.length > 0) {
          this.$message.error(errorData.violations[0].field + ' ' + errorData.violations[0].message)
        } else {
          this.$message.error(this.$t(`resetPwd.${errorData.message}`))
          this.rsPwdForm.email = ''
          this.isLoading = false
        }
      } else {
        this.$message.error(this.$t('api.generalError'))
      }
    },
    showSuccessfulMessage() {
      this.loading = false
      this.$message({
        message: this.$t('register.regSuccessful'),
        type: 'success'
      })
      this.$refs.registerForm.resetFields()
      this.$store.dispatch('UpdateResultForm', {
        title: 'activation.msgSuccessTitle',
        content: 'activation.msgSuccessContent',
        buttonText: 'activation.btnBackToSignUp',
        actionBtn: () => {
          this.$router.push({ path: '/login' })
        }
      })
      this.$router.push({ path: '/result' })
    },
    openAddressSearchDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    getPostalCodeAndAddress(postalAddress) {
      this.registerForm.code = postalAddress.zip_no
      this.registerForm.adr1 = postalAddress.road_addr
      this.dialogVisible = false
      this.$refs.registerForm.validateField('searchAdr')
    },
    chooseAll() {
      for (let index = 1; index <= 3; index++) {
        this.registerForm[`term${index}`] = this.registerForm.term
      }
      this.isReadTermErr = !this.registerForm.term1 || !this.registerForm.term2
    },
    checkAllTerm() {
      this.registerForm.term = true
      for (let index = 1; index <= 3; index++) {
        if (!this.registerForm[`term${index}`]) {
          this.registerForm.term = false
          break
        }
      }
    },
    openTerm(type) {
      this.termContent = type
      this.openTermPopup = true
    },
    handleCloseTerm(done) {
      this.openTermPopup = false
    },
    getFormatText(text) {
      return text.replace('\n', '<br>')
    }
  }
}
