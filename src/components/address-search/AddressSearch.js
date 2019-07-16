import {
  Common,
  ADDRESS_SEARCH_ROAD_BASE_TYPE,
  ADDRESS_SEARCH_COUNT_PER_PAGE,
  ADDRESS_SEARCH_PAGE_NUMBER
} from '@/common/constants'
import { listProvinces } from '@/common/addressSearchCity'

export default {
  name: 'addressSearchController',
  props: {
    type: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      provinces: listProvinces,
      province: '',
      city: '',
      road: '',
      nameOfEupyeongDong: '',
      detail: '',
      lotNumber: '',
      jpPostalCode: '',
      loading: false
    }
  },
  watch: {
    resetAddressesDialog: function(val) {
      if (val) {
        this.province = ''
        this.city = ''
        this.road = ''
        this.nameOfEupyeongDong = ''
        this.detail = ''
        this.lotNumber = ''
        this.jpPostalCode = ''
      }
    },
    postalAddressesError: function(val) {
      if (val) {
        this.$message({
          type: 'error',
          message: this.genI18n('errMsgGetAddressesFailed')
        })
        this.loading = false
      }
    },
    postalAddressesRoadBase: function() {
      if (this.loading) {
        this.loading = false
      }
    },
    postalAddressesHouseBase: function() {
      if (this.loading) {
        this.loading = false
      }
    }
  },
  computed: {
    resetAddressesDialog() {
      return this.$store.state.auth.resetAddressesDialog
    },
    postalAddressesError() {
      return this.$store.state.auth.postalAddressesError
    },
    provinceOptions() {
      return this.provinces.map(province => ({ value: province.value, label: province.value }))
    },
    cities() {
      const currentProvince = this.provinces.find(pro => pro.value === this.province)
      if (currentProvince) {
        return currentProvince.listCities
      }
      return []
    },
    cityOptions() {
      return this.cities.map(city => ({ value: city.property.value, label: city.property.name }))
    },
    postalAddressesRoadBase() {
      if (this.isJapaneseSearch(this.country)) {
        return this.$store.state.auth.postalAddressesRoadBase.map(address => {
          return {
            ...address,
            zip_no: parseInt(this.jpPostalCode),
            road_addr: `${address.state || ''}-${address.city || ''}-${address.address || ''}`,
            jibun_addr: address.address
          }
        })
      }
      return this.$store.state.auth.postalAddressesRoadBase
    },
    postalAddressesHouseBase() {
      if (this.isJapaneseSearch(this.country)) {
        return this.$store.state.auth.postalAddressesHouseBase.map(address => {
          return {
            ...address,
            zip_no: parseInt(this.jpPostalCode),
            road_addr: `${address.state || ''}-${address.city || ''}-${address.address || ''}`,
            jibun_addr: address.address
          }
        })
      }
      return this.$store.state.auth.postalAddressesHouseBase
    },
    payload() {
      const isRoadBase = this.isRoadBase()
      const {
        isJapaneseSearch,
        country,
        province,
        city,
        road,
        nameOfEupyeongDong,
        detail,
        jpPostalCode
      } = this
      const config = {
        isRoadBase,
        country
      }
      if (isJapaneseSearch(country)) {
        return {
          ...config,
          postal_code: jpPostalCode
        }
      }
      return {
        ...config,
        count_per_page: ADDRESS_SEARCH_COUNT_PER_PAGE,
        current_page: ADDRESS_SEARCH_PAGE_NUMBER,
        keyword: `${province} ${city} ${isRoadBase ? road : nameOfEupyeongDong} ${detail}`.trim()
      }
    }
  },
  methods: {
    isJapaneseSearch: (country) => {
      return country === Common.JAPAN_COUNTRY_CODE
    },
    handleAddressSelect: () => {},
    genI18n(params) {
      return this.$t(
        `register.postalAddressSearch.${params}`
      )
    },
    isRoadBase() {
      return this.type === ADDRESS_SEARCH_ROAD_BASE_TYPE
    },
    onSearchAddress() {
      const {
        isJapaneseSearch,
        country,
        payload,
        jpPostalCode,
        genI18n
      } = this
      const doPostCondition = isJapaneseSearch(country) ? jpPostalCode !== '' : payload.keyword.split(' ').length > 1
      if (doPostCondition) {
        this.loading = true
        this.$store.dispatch('GetPostalAddresses', payload)
      } else {
        this.$message({
          type: 'error',
          message: genI18n('errMsgAllFieldsRequired')
        })
      }
    },
    onAddressSelect(address) {
      this.$emit('get-postal-code-and-address', address)
    },
    onChangeProvince() {
      const input = document.querySelector('.province-select-box input')
      input.setAttribute('readonly', 'readonly')
    },
    onChangeCity() {
      const input = document.querySelector('.city-select-box input')
      input.setAttribute('readonly', 'readonly')
    }
  }
}
