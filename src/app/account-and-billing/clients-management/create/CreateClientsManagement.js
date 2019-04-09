import { BillingAndAccessUser } from '@/app/account-and-billing/clients-management/billing-and-access-user'
import { AccountAndBillings, Common } from '@/common/constants'
import { countdownTimer } from '@/utils'
import { mapGetters } from 'vuex'
import clientServices from '@/app/account-and-billing/services/clientServices.js'
import { validFormEmail, validFormWebUrl } from '@/utils/validate'

// TODO: skip validation for business location
// TODO: skip validation for phone number

export default {
  name: 'RegisterForm',
  components: {
    BillingAndAccessUser
  },
  data() {
    const validateEmail = validFormEmail.bind(this)
    const validWebUrl = validFormWebUrl.bind(this)
    return {
      AccountAndBillings,
      isReadTermErr: false,
      isSentCode: false,
      timeExpired: '',
      expiredLeft: '',
      confirmTelCode: '',
      interValid: '',
      initialDataForm: [
        'currency',
        'email'
      ],
      clientForm: {
        currency: '',
        email: '',
        tel: {}
      },
      requiredRules: [
        { clientName: 'Client Name' },
        { webUrl: 'Website URL' },
        { industry: 'Industry' },
        { currency: 'Currency' }
      ],
      clientRules: {
        webUrl: [
          { validator: validWebUrl, trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', message: this.$t('client.errEmail1') },
          { trigger: 'blur', validator: validateEmail }
        ]
      },
      listIns: []
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
    clientServices.getListIndustry().then((response) => {
      if (response) {
        this.listIns = response.data
      }
    })
    this.fetchInitialData()
    this.setNormalRules()
    this.getTimeExpired()
  },
  beforeDestroy() {
    clearInterval(this.interValid)
  },
  methods: {
    setNormalRules() {
      this.requiredRules.forEach(element => {
        for (const key in element) {
          const tmp = { required: true, trigger: 'blur', message: this.$t('memberAccount.errMsg1', { fieldName: element[key] }) }
          this.clientRules.hasOwnProperty(key) ? this.clientRules[key].unshift(tmp) : this.clientRules[key] = [tmp]
        }
      })
    },
    fetchInitialData() {
      this.initialDataForm.forEach(element => {
        this.clientForm[element] = this.user[element]
      })
    },
    getTimeExpired() {
      this.interValid = setInterval(() => {
        if (this.timeExpired === '') { return }
        this.changes = countdownTimer(AccountAndBillings.LIFE_TIME_OF_CODE - (new Date().getTime() - new Date(this.timeExpired).getTime()))
      }, Common.ONE_SECOND)
    },
    onChangePhone() {
      this.isSentCode = true
      this.timeExpired = new Date()
    },
    checkPermission() {
      return this.user.roles.indexOf(Common.SUPER_ADMIN_ROLE) !== -1
    },
    onSubmit() {
      this.$refs.clientForm.validate((valid) => {
        if (valid) {
          this.loading = true
          clientServices.createClients(this.clientForm)
            .then(() => {
              this.$message({
                // TODO: BA did not define the text when creating successfully.
                message: 'Congrats, this is a success message.',
                type: 'success'
              })
              this.$router.push({ path: '/account-and-billing/clients-management' })
            })
            .catch(() => {
              // TODO: BA did not define the text when creating error.
              this.$message.error('Oops, this is a error message.')
              this.loading = false
            })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/account-and-billing/clients-management' })
    },
    onChangeTest() {
      this.$refs.clientForm.validateField('industry')
    }
  }
}
