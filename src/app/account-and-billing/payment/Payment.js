import { AccountAndBillings } from '@/common/constants'
export default {
  name: 'PaymentController',
  data() {
    return {
      formData: {
        selectAccount: '',
        balance: 'W1,000',
        checkoutTotal: 'W33,000',
        checkoutTotalValue: 3000,
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '82',
        paymentType: AccountAndBillings.PAYMENT.WIRE_TRANSFER,
        orderTotal: '',
        phoneCodes: '81',
        agreementRegardingRules: '',
        isAgree: false,
        dedicatedAccountBank: ''
      },
      AccountAndBillings
    }
  },
  computed: {
    rules() {
      const formRules = {
        firstName: [
          { required: true, message: this.genI18n('nameOfDepositorRequiredMsg'), trigger: 'blur' }
        ],
        phoneCodes: [
          { required: true, message: this.genI18n('cellPhoneNoRequiredMsg'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.genI18n('emailRequiredMsg'), trigger: 'blur' }
        ],
        dedicatedAccountBank: [
          { required: true, message: this.genI18n('dedicatedAccountRequiredMsg'), trigger: 'blur' }
        ]
      }
      return formRules
    }
  },
  mounted() {
  },
  methods: {
    genI18n(params) {
      return this.$t(`payment.${params}`)
    }
  }
}
