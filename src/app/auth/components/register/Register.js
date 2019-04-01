import { validPassword, validEmail, validTypeFile } from '@/utils/validate'
import { Auth } from '@/common/constants'
import registerServices from '@/app/auth/services/register'
import { Message } from 'element-ui'

/*
  Version: v0.5
  Documentation: WP_TG3.0_Functional Requirement Specification_Authentication_v0.5
*/

export default {
  name: 'RegisterForm',
  data() {
    // customize validator
    const validateEmail = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t('register.errMsgEmailRequired')))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('register.errMsgEmailFormat')))
      }
      if (!this.isMailChecked) {
        callback(new Error(this.$t('register.errMsgEmailChecked')))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.MAX_LENGTH_PASSWORD) {
        callback(new Error(this.$t('register.errMsgPwdLength')))
      }
      if (!validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      } else {
        callback()
      }
    }
    const validateRepeatPassword = (rule, value, callback) => {
      if (value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.MAX_LENGTH_PASSWORD) {
        callback(new Error(this.$t('register.errMsgPwdLength')))
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
      if (this.registerForm.licenseNumber.length === 0) {
        callback(new Error(this.$t('register.errMsgLicense')))
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
    return {
      LIST_COUNTRY: Auth.LIST_COUNTRY,
      typeRegister: Auth.PERSONAL_TYPE,
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
        term: '',
        country: '',
        password: '',
        passwordRpt: '',
        bank: '',
        bankNumber: '',
        owner: ''
      },
      registerRules: {},
      personRules: {
        firstName: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFristName') }
        ],
        lastName: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgLastName') }
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        passwordRpt: [
          { required: true, trigger: 'blur', validator: validateRepeatPassword }
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
          { required: true, trigger: 'blur', message: this.$t('register.errMsgBusinessName') }
        ],
        licenseNumber: [
          { required: true, trigger: 'blur', validator: validateLicense }
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
      listBank: [],
      isCheckBankbook: false,
      isValidBankbook: false,
      isBusinessLicenseChecked: false,
      isBusinessLicenseValid: false,
      isValidAdr: false,
      isMailChecked: false,
      allowRegister: true,
      isShowReceiveBtn: false,
      isSentReactive: false,
      passwordType: Auth.TYPE_PASSWORD_FIELD,
      loading: false,
      isReadTermErr: false
    }
  },
  created() {
    this.registerRules = this.typeRegister === Auth.PERSONAL_TYPE ? this.personRules : {
      ...this.personRules,
      ...this.businessRules
    }
    registerServices.getListBank().then((response) => {
      this.listBank = response.data
    })
  },
  methods: {
    onEmailChange() {
      this.isShowReceiveBtn = false
    },
    onChangeType(type) {
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
        this.$refs.registerForm.resetFields()
      }, 0)
    },
    goToLogin() {
      this.$router.push({ path: '/login' })
    },
    onCheckEmail() {
      if (this.isShowReceiveBtn) {
        // Send reactivation email ET 1 Activation Email again.
        registerServices.sendReactivationEmail(this.registerForm.mail).then((response) => {
          this.isSentReactive = true
          Message.success(this.$t('register.msgEmailReactivated'))
        })
        return
      } else if (validEmail(this.registerForm.email)) {
        registerServices.checkEmail(this.registerForm.email).then((response) => {
          this.isMailChecked = true
          this.allowRegister = false
          this.$refs.registerForm.validateField('email')
          if (response.data && response.data.activated) {
            // the email was already activated
            Message.error(this.$t('register.msgEmailActivated'))
            return
          }
          if (response.data && !response.data.activated && ((new Date().getTime() - new Date(response.data.date).getTime()) > Auth.MILISECONDS_OF_DAY)) {
            // the email was registered, but not yet activated after 24 hours from registration/re-activation time
            this.isShowReceiveBtn = true
            Message.error(this.$t('register.msgEmailActivatedAfter24'))
            return
          }
          if (response.data && !response.data.activated && ((new Date().getTime() - new Date(response.data.date).getTime()) <= Auth.MILISECONDS_OF_DAY)) {
            // the email was registered, but not yet activated within 24 hours from registration/re-activation time
            Message.error(this.$t('register.msgEmailActivatedWithin24'))
            return
          }
          this.allowRegister = true
          Message.success(this.$t('register.msgEmailUnactivated'))
        })
      } else {
        this.$refs.registerForm.validateField('email')
      }
    },
    onSearchAdr(queryString, cb) {
      registerServices.checkAddress(queryString).then((response) => {
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
      if (this.registerForm.licenseNumber.length === 0) {
        this.$refs.registerForm.validateField('licenseNumber')
        return
      }
      registerServices.checkBusinessLicense(this.registerForm.licenseNumber).then((response) => {
        this.isBusinessLicenseValid = response.data
        this.$refs.registerForm.validateField('licenseNumber')
      })
    },
    uploadFile(e, type) {
      if (e.target.files[0].size > Auth.MAX_SIZE_FILE) {
        Message.error(this.$t('register.errMsgFileSize'))
        this.resetFileInput(type)
      } else if (validTypeFile(e.target.files[0])) {
        this.registerForm[type] = e.target.files[0]
        this.$refs.registerForm.validateField(type)
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
    onSearchBankBook() {
      if (this.registerForm.bank === '' || this.registerForm.bankNumber === '' || this.registerForm.owner === '') {
        this.$refs.registerForm.validateField('bankGroup')
        return
      }
      this.isCheckBankbook = true
      registerServices.checkBankbook({
        bank: this.registerForm.bank,
        bankNumber: this.registerForm.bankNumber,
        owner: this.registerForm.owner
      })
        .then((response) => {
          this.isValidBankbook = response.data
          this.$refs.registerForm.validateField('bankGroup')
        })
    },
    onSelectCountry() {
      this.$refs.registerForm.validateField('country')
    },
    onChangeBankbook() {
      this.isValidBankbook = false
      this.isCheckBankbook = false
      if (this.registerForm.bank === '' && this.registerForm.bankNumber === '' && this.registerForm.owner === '') {
        this.$refs.registerForm.validateField('bankGroup')
      }
    },
    onRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (!this.registerForm.term) {
          this.isReadTermErr = true
          return
        }
        if (valid) {
          let dataPost = {
            account_type: this.typeRegister,
            last_name: this.registerForm.lastName,
            first_name: this.registerForm.firstName,
            email: this.registerForm.email,
            password: this.registerForm.password,
            country: this.registerForm.country,
            postal_code: this.registerForm.code,
            address1: this.registerForm.adr1,
            address2: this.registerForm.adr2
          }
          if (this.typeRegister === Auth.BUSINESS_TYPE) {
            dataPost = Object.assign(dataPost, {
              business_name: this.registerForm.businessName,
              license_number: this.registerForm.licenseNumber,
              bank_name: this.registerForm.bank,
              bank_account_number: this.registerForm.bankNumber,
              owner: this.registerForm.owner
            })
          }
          registerServices.registerAccount(dataPost).then((response) => {
            if (response.data) {
              this.goToLogin()
            }
          })
        }
      })
    }
  }
}
