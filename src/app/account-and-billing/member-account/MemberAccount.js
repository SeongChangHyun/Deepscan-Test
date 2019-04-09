import memberAccountServices from '@/app/account-and-billing/services/memberAccount.js'
import { Auth, AccountAndBillings, Common } from '@/common/constants'
import registerServices from '@/app/auth/services/register'
import { validPassword } from '@/utils/validate'
import { countdownTimer } from '@/utils'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { validTypeFile } from '@/utils/validate'

export default {
  name: 'MemberAccount',
  data() {
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
      if (value !== this.memberAccountForm.password) {
        callback(new Error(this.$t('register.errMsgRepeatPwd')))
      }
      callback()
    }
    const validatePhoneGroup = (rule, value, callback) => {
      if (!this.isConfirmTelCode) {
        callback(new Error(this.$t('memberAccount.errMsgConfirmFieldName', { fieldName: 'Phone Number' })))
      }
      callback()
    }
    const validatePostalCode = (rule, value, callback) => {
      if (!this.isConfirmPostalCode) {
        callback(new Error(this.$t('memberAccount.errMsgConfirmFieldName', { fieldName: 'Postal Code' })))
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
    return {
      currentUser: {},
      AccountAndBillings,
      Auth,
      isChanged: false,
      isLoading: false,
      isSuperAdmin: false,
      memberAccountForm: {},
      isSentCode: false,
      isConfirmTelCode: false,
      isConfirmPostalCode: false,
      timeExpired: '',
      confirmTelCode: '',
      expiredLeft: '',
      interValid: '',
      listBank: [],
      initialMemberAccountForm: {
        item23: '',
        item29: '',
        password: '',
        passwordRpt: ''
      },
      memberAccountRules: {},
      materialRules: {
        firstName: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgFirstName') }
        ],
        lastName: [
          { required: true, trigger: 'blur', message: this.$t('register.errMsgLastName') }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        passwordRpt: [
          { required: true, trigger: 'blur', validator: validateRepeatPassword }
        ],
        phoneGroup: [
          { trigger: 'change', validator: validatePhoneGroup }
        ],
        postalCode: [
          { required: true, trigger: 'blur', validator: validatePostalCode }
        ],
        commissionFee: [
          { required: true, trigger: 'blur', validator: validateCommissionFee }
        ],
        licenseNumber: [
          { required: true, trigger: 'blur', validator: validateLicense }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
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
    }
  },
  created() {
    this.currentUser = this.user
    this.memberAccountForm = Object.assign({}, this.initialMemberAccountForm, this.user)
    this.memberAccountForm.lang = this.memberAccountForm.lang ? this.memberAccountForm.lang : AccountAndBillings.KOREA_CODE
    this.memberAccountForm.currency = this.memberAccountForm.currency ? this.memberAccountForm.currency : AccountAndBillings.KOREA_CURRENCY
    this.memberAccountForm.commissionFee = this.memberAccountForm.commissionFee ? this.memberAccountForm.commissionFee : 0
    this.getTimeExpired()
    this.isSuperAdmin = this.user.roles.indexOf('superAdmin') === 1
    if (this.isSuperAdmin) {
      this.onChangeField(['commissionFee'])
    }
    registerServices.getListBank().then((response) => {
      this.listBank = response.data
    })
  },
  beforeDestroy() {
    clearInterval(this.interValid)
  },
  methods: {
    uploadFile(e, type) {
      if (e.target.files[0].size > Auth.MAX_SIZE_FILE) {
        Message.error(this.$t('register.errMsgFileSize'))
        this.resetFileInput(type)
      } else if (validTypeFile(e.target.files[0])) {
        this.memberAccountForm[type] = e.target.files[0]
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
    getTimeExpired() {
      this.interValid = setInterval(() => {
        if (this.timeExpired === '') { return }
        this.changes = countdownTimer(AccountAndBillings.LIFE_TIME_OF_CODE - (new Date().getTime() - new Date(this.timeExpired).getTime()))
      }, Common.ONE_SECOND)
    },
    getInstructions(text) {
      return `<div class="mb-1">${text.replace('\n', '</div><div>')}</div>`
    },
    onChangeType() {
      this.isChanged = this.memberAccountForm.typeMemberAccount !== this.user.typeMemberAccount
      if (this.memberAccountForm.typeMemberAccount === Auth.BUSINESS_TYPE) {
        this.onChangeField([''])
      }
    },
    onSelectAdr(item) {
      this.isConfirmPostalCode = true
      this.memberAccountForm.postalCode = item.postal_code
      this.memberAccountForm.adr1 = item.adr_name
      this.$refs.memberAccountForm.validateField('postalCode')
    },
    onSearchAdr(queryString, cb) {
      this.onChangeField(['postalCode'])
      this.isChanged = true
      this.isConfirmPostalCode = false
      this.memberAccountForm.postalCode = queryString
      memberAccountServices.checkAddress(queryString).then((response) => {
        cb(response.data)
      })
    },
    onChangeField(listField = []) {
      this.isChanged = true
      if (listField.length === 0) {
        return
      }
      listField.forEach((fieldName) => {
        this.memberAccountRules[fieldName] = this.materialRules[fieldName]
      })
    },
    onConfirmTelCode() {
      memberAccountServices.verifyTelCode(this.confirmTelCode).then((response) => {
        if (response.data) {
          this.isConfirmTelCode = response.data
          this.isSentCode = false
        }
      })
    },
    onChangePhone() {
      this.isSentCode = true
      this.timeExpired = new Date()
    },
    formatCommissionFee(value) {
      if ((value >= 0 && value <= 100)) {
        this.memberAccountForm.commissionFee = Math.round(value * 10) / 10
      }
      this.$refs.memberAccountForm.validateField('commissionFee')
    },
    onSubmit() {
      this.formatCommissionFee(this.memberAccountForm.commissionFee)
      this.$refs.memberAccountForm.validate((valid) => {
        if (valid) {
          // TODO: remove - send update data', this.memberAccountForm
        }
      })
    },
    onCancel() {
      // TODO: remove - cancel
      this.isChanged = false
      this.memberAccountForm = Object.assign({}, this.initialMemberAccountForm, this.user)
    }
  }
}
