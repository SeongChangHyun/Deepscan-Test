import { mapGetters } from 'vuex'
import { AccountAndBillings } from '@/common/constants'

export default {
  name: 'BillingAndAccessForm',
  data() {
    return {
      listBNA: AccountAndBillings.LIST_BNA,
      showContent: false,
      AccountAndBillings,
      userRules: {},
      userForm: {}
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    getIconCurrency(currency) {
      return currency ? AccountAndBillings.LIST_CURRENCY.find((item) => item.value === currency).symbol : ''
    },
    getRoles(roles) {
      let result = ''
      const len = roles.length
      roles.forEach((element, index) => {
        result += element
        if (index !== len - 1) {
          result += ', '
        }
      })
      return result
    }
  }
}
