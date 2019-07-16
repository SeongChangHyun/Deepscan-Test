import { clientManagement, AccountAndBillings } from '@/common/constants'
import { convertToCamel } from '@/utils/creative'
import { ClientsManagementMixin } from './ClientsManagementMixin'
import { getRoleClient } from './permission'

export default {
  name: 'ClientsList',
  mixins: [ClientsManagementMixin],
  data() {
    const tableHeaders = clientManagement.tableHeaders
    for (let i = 0; i < tableHeaders.length; i++) {
      tableHeaders[i].label = this.$t('client.' + convertToCamel(tableHeaders[i].prop))
    }
    return {
      clientManagement,
      getRoleClient,
      dataPost: {
        offset: 0,
        limit: 20,
        total: 0,
        status: clientManagement.ENABLE_CLIENT,
        role: this.$store.getters.getRoutersInfo.key ? this.$store.getters.getRoutersInfo.key : 'CLA'
      },
      pageSizes: [20, 50, 100],
      selectedItems: [],
      tableData: [],
      tableHeaders: tableHeaders,
      clientNo: clientManagement.CLIENT_NO,
      paymentType: clientManagement.PAYMENT_TYPE,
      statusCode: clientManagement.STATUS_CODE,
      clientHiddenNumber: 0
    }
  },
  mounted() {
    this.updateList()
  },
  created() {
    document.body.className = document.body.className.replace('dg-open', '')
  },
  methods: {
    getWidthCol(col) {
      switch (col) {
        case 'client_name': return 150
        case 'email': return 240
        case 'approval_status': return 150
        case 'daily_budget': return 150
        default: return 100
      }
    },
    goto(link) {
      this.$router.push({ path: link })
    },
    updateList(page = 1) {
      this.getListClient(page)
    },
    updateStatusClients(status) {
      this.showLoading()
      const listClientId = this.selectedItems.map((item) => {
        return item.client_id
      })
      this.$store.dispatch('user/updateStatusOfClientInClientManage', { block_status: status, client_ids: listClientId })
        .then((response) => {
          this.getListClient(1)
          this.showMessage(status === clientManagement.ENABLE_CLIENT ? 'generalBNA.msg16' : 'generalBNA.msg17')
        })
        .catch((error) => {
          this.hideLoading()
          this.showErrorApi(error)
        })
    },
    handleSizePageChange() {
      this.updateList()
    },
    handleCurrentChange(val) {
      this.updateList(val)
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    getListClient(page) {
      this.dataPost.offset = (page - 1) * this.dataPost.limit
      this.showLoading()
      this.$store.dispatch('user/getListClientsInClientManage', this.dataPost)
        .then((response) => {
          this.hideLoading()
          this.dataPost.page = page
          this.dataPost.total = response.total_count
          const convertData = []
          if (response.data && response.data.length > 0) {
            for (let i = 0; i <= response.data.length; i++) {
              const convertItem = response.data[i]
              if (convertItem) {
                const currencySymbol = AccountAndBillings.LIST_CURRENCY.find((item) => item.value === convertItem.currency).symbol
                convertItem.balance = currencySymbol + ' ' + convertItem.balance.toString()
                convertItem.daily_budget = currencySymbol + ' ' + convertItem.daily_budget.toString()
                convertData.push(convertItem)
              }
            }
          }
          this.tableData = convertData
          this.clientHiddenNumber = response.total_hidden_count
        })
        .catch((error) => {
          this.hideLoading()
          this.showErrorApi(error)
        })
    },
    showAllClientStatus() {
      if (this.dataPost.status !== clientManagement.ENABLE_CLIENT || (this.dataPost.total + this.clientHiddenNumber) === 0) {
        return
      }
      this.dataPost.status = null
      this.getListClient(1)
    },
    showEnableClientStatus() {
      if (this.dataPost.status === clientManagement.ENABLE_CLIENT || (this.dataPost.total + this.clientHiddenNumber) === 0) {
        return
      }
      this.dataPost.status = clientManagement.ENABLE_CLIENT
      this.getListClient(1)
    },
    showPaymentType(paymentCode) {
      let paymentName = ''
      const resultFilter = AccountAndBillings.LIST_PAYMENT_SETTING.filter((item) => {
        return item.value === paymentCode
      })
      if (resultFilter.length > 0) {
        paymentName = resultFilter[0].label
      }
      return paymentName
    },
    showClientStatus(statusCode) {
      let status = ''
      const resultFilter = AccountAndBillings.LIST_CLIENT_STATUS.filter((item) => {
        return item.value === statusCode
      })
      if (resultFilter.length > 0) {
        status = this.$t(resultFilter[0].label)
      }
      return status
    },
    selectable() {
      return getRoleClient(`is_admin_and_client_admin_role.list`)
    }
  }
}
