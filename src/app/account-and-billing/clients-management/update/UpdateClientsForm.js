import { AccountAndBillings, Common } from '@/common/constants'
import { mapGetters } from 'vuex'
import ValidTime from './material/ValidTime'
import SettableItem from './material/Settable'
import { updateClientModel } from '../ModelCreateClient'
import { getRoleClient } from '../permission'
import { ListLoader } from 'vue-content-loader'

export default {
  name: 'UpdateClientForm',
  components: {
    ListLoader,
    ValidTime,
    SettableItem
  },
  props: {
    clientDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const validateAllIPAddress = (rule, value, callback, dataField) => {
      if (this.ipBlocking.trim() === '') {
        callback()
        return
      }
      const arrIpList = this.ipBlocking.split(',')
      const isNotAvailableIpList = arrIpList.filter((item) => {
        return !this.validateIPAddress(item)
      })
      if (isNotAvailableIpList.length > 0) {
        callback(new Error(this.$t('client.ipAddressIncorrect')))
      }
      callback()
    }
    const validateSettable = (rule, value, callback, dataField) => {
      if (!this.isClickSubmit) {
        callback()
        return false
      }
      Object.values(AccountAndBillings.LIST_SETTABLE_OBJECT).forEach((item) => {
        if (Object.keys(dataField).indexOf(`${item}_${AccountAndBillings.LIST_DEVICE.PC}`) > -1) {
          if (this.validateMinMaxSettable(item, AccountAndBillings.LIST_DEVICE.PC)) {
            callback(new Error(this.$t('client.validateFormClientSettable')))
            return false
          }
          callback()
          return false
        }
        if (Object.keys(dataField).indexOf(`${item}_${AccountAndBillings.LIST_DEVICE.MOBILE}`) > -1) {
          if (this.validateMinMaxSettable(item, AccountAndBillings.LIST_DEVICE.MOBILE)) {
            callback(new Error(this.$t('client.validateFormClientSettable')))
            return false
          }
          callback()
          return false
        }
      })
    }
    return {
      Common,
      accountAndBillings: AccountAndBillings,
      updateClientForm: updateClientModel(),
      conversionUserSelect: 0,
      ipBlocking: '',
      isLoading: true,
      getRoleClient,
      isClickSubmit: false,
      updateClientFormOrigin: null,
      isChanged: false,
      updateClientRules: {
        ip_blocking: [
          { validator: validateAllIPAddress, trigger: 'blur' }
        ],
        cpc_pc: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpc_mobile: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpm_pc: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpm_mobile: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpvc_pc: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpvc_mobile: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpmg_pc: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpmg_mobile: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpi_pc: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpi_mobile: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpa_pc: [
          { validator: validateSettable, trigger: 'blur' }
        ],
        cpa_mobile: [
          { validator: validateSettable, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.getAdvertiserTerm()
  },
  watch: {
    clientDetail: function(val) {
      this.updateValueChildObjectFromParent()
      if (this.updateClientForm.conversion_user_control !== 0) {
        this.conversionUserSelect = 1
      }
      if (this.updateClientForm.ip_blocking && this.updateClientForm.ip_blocking.length > 0) {
        this.ipBlocking = this.updateClientForm.ip_blocking.join(',')
      }
      this.updateOriginValue(this.updateClientForm)
    },
    conversionUserSelect: function(val) {
      if (val === 0) {
        this.updateClientForm.conversion_user_control = 0
      }
    },
    ipBlocking: function(val) {
      if (val) {
        if (this.ipBlocking) {
          this.updateClientForm.ip_blocking = this.ipBlocking.split(',')
        }
      } else {
        this.updateClientForm.ip_blocking = null
      }
    },
    'updateClientForm': {
      deep: true,
      handler(val) {
        if (val && JSON.stringify(val) !== this.updateClientFormOrigin) {
          this.isChanged = true
        }
      }
    },
    isChanged: function(val) {
      window.formIsChanged = !!val
    }
  },
  methods: {
    onSubmit() {
      this.isClickSubmit = true
      return new Promise((resolve, reject) => {
        this.$refs.updateClientForm.validate((valid) => {
          this.isClickSubmit = false
          if (valid) {
            return resolve({
              status: valid
            })
          } else {
            return reject({
              status: valid,
              type: 'update'
            })
          }
        })
      })
    },
    updateValueChildObjectFromParent() {
      Object.keys(this.updateClientForm).forEach((key, index, array) => {
        if (this.clientDetail.hasOwnProperty(key)) {
          this.updateClientForm[key] = this.clientDetail[key]
          if (key === 'cell_phone') {
            this.cellPhoneOriginValue = this.clientDetail[key]
          }
        }
        if (index === (array.length - 1)) {
          this.isLoading = false
        }
      })
    },
    updateValidType(validType, data) {
      switch (validType) {
        case AccountAndBillings.VALID_IMPRESSION_PERIOD:
          this.updateClientForm.valid_impression_period = data.totalSecond
          this.updateClientForm.valid_impression_in_session = data.session
          break
        case AccountAndBillings.VALID_CLICK_PERIOD:
          this.updateClientForm.valid_click_period = data.totalSecond
          this.updateClientForm.valid_click_in_session = data.session
          break
        case AccountAndBillings.VALID_PLAY_PERIOD:
          this.updateClientForm.valid_play_period = data.totalSecond
          this.updateClientForm.valid_play_in_session = data.session
          break
      }
    },
    getAdvertiserTerm() {
      this.$store.dispatch('user/getAdvertiserTerm')
        .then((response) => {
          this.updateClientForm.privacy = response.advertiser_terms
          this.updateOriginValue(this.updateClientForm)
        })
        .catch((error) => {
          this.showErrorApi(error)
        })
    },
    validateIPAddress(ipAddress) {
      return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)
    },
    validateMinMaxSettable(bid_type, device_type) {
      let minMaxObject = null
      this.updateClientForm.settable.forEach((item, index) => {
        if (item.bid_type === bid_type && item.revenue_range[0].device_type === device_type) {
          minMaxObject = item.revenue_range[0]
        }
        if (item.bid_type === bid_type && item.revenue_range[1].device_type === device_type) {
          minMaxObject = item.revenue_range[1]
        }
      })
      if (minMaxObject.min > minMaxObject.max) {
        return true
      } else {
        return false
      }
    },
    updateOriginValue(val) {
      if (val) this.updateClientFormOrigin = JSON.stringify(val)
    }
  }
}
