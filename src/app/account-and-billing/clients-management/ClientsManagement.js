import listClients from '@/mock/data/listClients'
import { clientManagement } from '@/common/constants'
import clientServices from '@/app/account-and-billing/services/clientServices.js'

export default {
  name: 'ClientsList',
  data() {
    return {
      dataPost: {
        page: 1,
        itemPerPage: 20,
        total: 0
      },
      pageSizes: [10, 20, 30, 40],
      selectedItems: [],
      tableData: listClients,
      tableHeaders: clientManagement.tableHeaders
    }
  },
  mounted() {
    this.updateList()
  },
  methods: {
    goto(link) {
      this.$router.push({ path: link })
    },
    updateList() {
      clientServices.getListClients(this.dataPost).then((response) => {
        this.dataPost.page = response.data.page
        this.dataPost.itemPerPage = response.data.itemPerPage
        this.dataPost.total = response.data.totals
        this.tableData = response.data.list
      })
    },
    onDeleteItems() {
      clientServices.deleteClients(this.selectedItems).then((response) => {
        if (response.status) {
          this.updateList()
        }
      })
    },
    handleSizeChange(val) {
      this.updateList()
    },
    handleCurrentChange(val) {
      this.updateList()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    }
  }
}
